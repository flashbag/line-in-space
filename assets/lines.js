var lines = {
	vector: {},
	build: function() {
		processor.calculateLineVector();
		processor.calculateTraces();

		lines._createMainLine();
		lines._createTraces();
		lines._createDotsPlanesProjections();
		lines._createLinePlanesProjections();
		lines._createTraces2AxesProjections();
		lines._createLineWithTracesProjections();
	},
	_createMainLine: function(){
		var geometry = new THREE.Geometry();

		var material = new THREE.LineBasicMaterial({
			color: 0x19718A,
			linewidth: 4
		});

		geometry.vertices.push(
			new THREE.Vector3( dots.a.x, dots.a.y, dots.a.z ),
			new THREE.Vector3( dots.b.x, dots.b.y, dots.b.z )
			);

		lines._obj_Line = lines._obj_Line || new THREE.Line( geometry, material );

		lines._obj_Line.geometry.vertices[0].x = dots.a.x;
		lines._obj_Line.geometry.vertices[0].y = dots.a.y;
		lines._obj_Line.geometry.vertices[0].z = dots.a.z;

		lines._obj_Line.geometry.vertices[1].x = dots.b.x;
		lines._obj_Line.geometry.vertices[1].y = dots.b.y;
		lines._obj_Line.geometry.vertices[1].z = dots.b.z;

		lines._obj_Line.geometry.verticesNeedUpdate = true;
	},
	
	_createTraces: function() {

		lines._obj_lFpIntersection = lines._obj_lFpIntersection || lines.__createPlaneIntersection();
		lines._obj_lHpIntersection = lines._obj_lHpIntersection || lines.__createPlaneIntersection();
		lines._obj_lPpIntersection = lines._obj_lPpIntersection || lines.__createPlaneIntersection();

		lines._setTracePosition(lines._obj_lFpIntersection,dots.a,dots.Ft);
		lines._setTracePosition(lines._obj_lHpIntersection,dots.a,dots.Ht);
		lines._setTracePosition(lines._obj_lPpIntersection,dots.a,dots.Pt);
	},
	_setTracePosition: function(obj, dot, dotTrace) {
		obj.geometry.vertices[0].x = dot.x;
		obj.geometry.vertices[0].y = dot.y;
		obj.geometry.vertices[0].z = dot.z;

		obj.geometry.vertices[1].x = dotTrace.x;
		obj.geometry.vertices[1].y = dotTrace.y;
		obj.geometry.vertices[1].z = dotTrace.z;

		obj.geometry.verticesNeedUpdate = true;
	},
	_createLinePlanesProjections: function() {

		lines._obj_lAdF = lines._obj_lAdF || lines.__createLine2PlaneProjectioHelper();
		lines._obj_lAdH = lines._obj_lAdH || lines.__createLine2PlaneProjectioHelper();
		lines._obj_lAdP = lines._obj_lAdP || lines.__createLine2PlaneProjectioHelper();

		lines._obj_lBdF = lines._obj_lBdF || lines.__createLine2PlaneProjectioHelper();
		lines._obj_lBdH = lines._obj_lBdH || lines.__createLine2PlaneProjectioHelper();
		lines._obj_lBdP = lines._obj_lBdP || lines.__createLine2PlaneProjectioHelper();

		lines.__setLinePlaneProjections([lines._obj_lAdF, lines._obj_lAdH, lines._obj_lAdP ]);
		lines.__setLinePlaneProjections([lines._obj_lBdF, lines._obj_lBdH, lines._obj_lBdP ]);
	},
	_createDotsPlanesProjections: function() {
		lines._obj_lAdFpHelper = lines._obj_lAdFpHelper || lines.__createDot2PlaneProjectioHelper(4);
		lines._obj_lAdHpHelper = lines._obj_lAdHpHelper || lines.__createDot2PlaneProjectioHelper(4);
		lines._obj_lAdPpHelper = lines._obj_lAdPpHelper || lines.__createDot2PlaneProjectioHelper(4);

		lines._obj_lBdFpHelper = lines._obj_lBdFpHelper || lines.__createDot2PlaneProjectioHelper(4);
		lines._obj_lBdHpHelper = lines._obj_lBdHpHelper || lines.__createDot2PlaneProjectioHelper(4);
		lines._obj_lBdPpHelper = lines._obj_lBdPpHelper || lines.__createDot2PlaneProjectioHelper(4);

		lines.__setDotPlaneProjections(dots.a, [lines._obj_lAdFpHelper, lines._obj_lAdHpHelper, lines._obj_lAdPpHelper ]);
		lines.__setDotPlaneProjections(dots.b, [lines._obj_lBdFpHelper, lines._obj_lBdHpHelper, lines._obj_lBdPpHelper ]);
	},
	_createTraces2AxesProjections: function() {

		lines._obj_hFhelper = lines._obj_hFhelper || lines.__createDot2PlaneProjectioHelper(2);
		lines._obj_pFhelper = lines._obj_pFhelper || lines.__createDot2PlaneProjectioHelper(2);	

		lines._obj_fHhelper = lines._obj_fHhelper || lines.__createDot2PlaneProjectioHelper(2);
		lines._obj_pHhelper = lines._obj_pHhelper || lines.__createDot2PlaneProjectioHelper(2);

		lines._obj_fPhelper = lines._obj_fPhelper || lines.__createDot2PlaneProjectioHelper(2);
		lines._obj_hPhelper = lines._obj_hPhelper || lines.__createDot2PlaneProjectioHelper(2);
		
		lines.__initTrace2AxePosition(dots.Ft, [lines._obj_hFhelper, lines._obj_pFhelper]);
		lines.__initTrace2AxePosition(dots.Ht, [lines._obj_fHhelper, lines._obj_pHhelper]);
		lines.__initTrace2AxePosition(dots.Pt, [lines._obj_fPhelper, lines._obj_hPhelper]);

		lines._obj_pFhelper.geometry.vertices[0].set( dots.pF.x, dots.pF.y, dots.pF.z );
		lines._obj_hFhelper.geometry.vertices[0].set( dots.hF.x, dots.hF.y, dots.hF.z );
		
		lines._obj_pHhelper.geometry.vertices[0].set( dots.pH.x, dots.pH.y, dots.pH.z );
		lines._obj_fHhelper.geometry.vertices[0].set( dots.fH.x, dots.fH.y, dots.fH.z );
		
		lines._obj_hPhelper.geometry.vertices[0].set( dots.hP.x, dots.hP.y, dots.hP.z );
		lines._obj_fPhelper.geometry.vertices[0].set( dots.fP.x, dots.fP.y, dots.fP.z );
		
	},
	__createPlaneIntersection: function() {

		var geometry = new THREE.Geometry();
		
		var material = new THREE.LineBasicMaterial({ color: 0x19718A, linewidth: 1.5 });

		geometry.vertices.push(
			new THREE.Vector3( dots.a.x, dots.a.y, dots.a.z ),
			new THREE.Vector3( 0, 0, 0 )
		);

		return new THREE.Line( geometry, material );
	},
	__createLine2PlaneProjectioHelper: function(dot) {

		var geometry = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial({ color: 0x19718A, linewidth: 2 });

		geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ) );

		return new THREE.Line( geometry, material);
	},
	__createDot2PlaneProjectioHelper: function(vectors) {

		var geometry = new THREE.Geometry();
		var material = new THREE.LineDashedMaterial({ vertexColors: true, color: 0xff0000, dashSize: 3, gapSize: 1, scale: 0.1 });

		if (vectors == 4)
			geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ),new THREE.Vector3( 0, 0, 0 ) );
		else if (vectors == 3)
			geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ) );
		else if (vectors == 2)
			geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ) );

		return new THREE.Line( geometry, material);
	},
	__setDotPlaneProjections: function(dot,objects) {
		for (var obj in objects) {
			for(i=0;i<objects[obj].geometry.vertices.length;i++) {
				objects[obj].geometry.vertices[i].x = dot.x;
				objects[obj].geometry.vertices[i].y = dot.y;
				objects[obj].geometry.vertices[i].z = dot.z;
				if (i == 1) {
					if (obj == 0) {
						objects[obj].geometry.vertices[i].x = 0;
					} else if (obj == 1) {
						objects[obj].geometry.vertices[i].y = 0;
					} else if (obj == 2) {
						objects[obj].geometry.vertices[i].z = 0;
					}	
				}
				if (i == 2) {
					if (obj == 0) {
						objects[obj].geometry.vertices[i].x = 0;
						objects[obj].geometry.vertices[i].y = 0;
					} else if (obj == 1) {
						objects[obj].geometry.vertices[i].y = 0;
						objects[obj].geometry.vertices[i].z = 0;
					} else if (obj == 2) {
						objects[obj].geometry.vertices[i].z = 0;
						objects[obj].geometry.vertices[i].x = 0;
					}
				}
				if (i == 3) {
					if (obj == 0) {
						objects[obj].geometry.vertices[i].y = 0;
					} else if (obj == 1) {
						objects[obj].geometry.vertices[i].z = 0;
					} else if (obj == 2) {
						objects[obj].geometry.vertices[i].x = 0;
					}
				}
				objects[obj].geometry.verticesNeedUpdate = true;
			}
		}
	},
	__setLinePlaneProjections: function(objects) {

		for (var obj in objects) {
			for(i=0;i<objects[obj].geometry.vertices.length;i++) {

				if (i == 0) {
					objects[obj].geometry.vertices[i].x = dots.a.x;
					objects[obj].geometry.vertices[i].y = dots.a.y;
					objects[obj].geometry.vertices[i].z = dots.a.z;
				}	
				if (i == 1) {
					objects[obj].geometry.vertices[i].x = dots.b.x;
					objects[obj].geometry.vertices[i].y = dots.b.y;
					objects[obj].geometry.vertices[i].z = dots.b.z;
				}

				if (obj == 0) {
					objects[obj].geometry.vertices[0].x = 0;
					objects[obj].geometry.vertices[1].x = 0;
				}

				if (obj == 1) {
					objects[obj].geometry.vertices[0].y = 0;
					objects[obj].geometry.vertices[1].y = 0;
				}

				if (obj == 2) {
					objects[obj].geometry.vertices[0].z = 0;
					objects[obj].geometry.vertices[1].z = 0;
				}

				objects[obj].geometry.verticesNeedUpdate = true;
			}
		}
	},
	__initTrace2AxePosition: function(dot, objects) {
		for (var obj in objects) {
			for(i=0;i<objects[obj].geometry.vertices.length;i++) {
				objects[obj].geometry.vertices[i].x = dot.x;
				objects[obj].geometry.vertices[i].y = dot.y;
				objects[obj].geometry.vertices[i].z = dot.z;

				objects[obj].geometry.verticesNeedUpdate = true;
			}
		}
	},
	_createLineWithTracesProjections: function() {

		lines._obj_lLH = lines._obj_lLH || lines.__createLine2PlaneProjectioHelper();
		lines._obj_lLF = lines._obj_lLF || lines.__createLine2PlaneProjectioHelper();
		lines._obj_lLP = lines._obj_lLP || lines.__createLine2PlaneProjectioHelper();

		lines._obj_lLH.geometry.vertices[0].set(dots.Pt.x,0,0);
		lines._obj_lLH.geometry.vertices[1].set(dots.Ht.x,dots.Ht.y,dots.Ht.z);

		lines._obj_lLF.geometry.vertices[0].set(0,dots.Pt.y,dots.Pt.z);
		lines._obj_lLF.geometry.vertices[1].set(0,dots.Ht.y,dots.Ht.z);

		lines._obj_lLP.geometry.vertices[0].set(dots.Pt.x,dots.Pt.y,0);
		lines._obj_lLP.geometry.vertices[1].set(dots.Ht.x,dots.Ht.y,0);

		lines._obj_lLH.geometry.verticesNeedUpdate = true;
		lines._obj_lLF.geometry.verticesNeedUpdate = true;
		lines._obj_lLP.geometry.verticesNeedUpdate = true;		
	}
}
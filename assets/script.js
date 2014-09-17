var scene, camera, controls, renderer;

var init = function() {
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.5, 1000 );
	camera.position.set(100,60,100);

	controls = new THREE.OrbitControls( camera );
	// controls.addEventListener( 'change', render );
};

var render = function() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xd9d9d9 );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	var r = function() {
		requestAnimationFrame(r);
		// 	cube.rotation.x += 0.1;
		// 	cube.rotation.y += 0.1;
		renderer.render(scene, camera);
	}
	r();
};

var draw = function(objectName) {
	var object = eval(objectName);
	for (var property in object) {
	    if (object.hasOwnProperty(property) && !property.indexOf('__instance__')) {
    		var instance = eval(objectName + '.' + property);
        	scene.add(instance);
	    }
	}
};

var dots = { 
	a: {
		x: 90,
		y: 75,
		z: 10
	},
	b: {
		x: 30,
		y: 50,
		z: 45
	},
	Ft: {},
	Ht: {},
	Pt: {},
	build: function() {
		dots._createMainDots();
		dots._createLineTraces();
		dots._createDotsPlanesProjections();
		dots._createTraces2AxesProjectionsDots();
	},
	_createMainDots: function() {

		var geometry = new THREE.SphereGeometry( 0.75, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0x19718A } );

		dots.__instance__Ad = dots.__instance__Ad || new THREE.Mesh( geometry, material );
		dots.__instance__Bd = dots.__instance__Bd || new THREE.Mesh( geometry, material );

		dots.__instance__Ad.position.set( dots.a.x, dots.a.y, dots.a.z);
		dots.__instance__Bd.position.set( dots.b.x, dots.b.y, dots.b.z);
	},
	_createLineTraces: function() {

		var geometry = new THREE.SphereGeometry( 1.5, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots.__instance__dFt = dots.__instance__dFt || new THREE.Mesh( geometry, material );
		dots.__instance__dHy = dots.__instance__dHy || new THREE.Mesh( geometry, material );
		dots.__instance__dPy = dots.__instance__dPy || new THREE.Mesh( geometry, material );

		dots.__instance__dFt.position.set( dots.Ft.x, dots.Ft.y, dots.Ft.z);
		dots.__instance__dHy.position.set( dots.Ht.x, dots.Ht.y, dots.Ht.z);
		dots.__instance__dPy.position.set( dots.Pt.x, dots.Pt.y, dots.Pt.z);
	},
	_createDotsPlanesProjections: function(){

		var geometry = new THREE.SphereGeometry( 0.5, 20, 20 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots.__instance__dAdFp = dots.__instance__dAdFp || new THREE.Mesh( geometry, material );
		dots.__instance__dAdHp = dots.__instance__dAdHp || new THREE.Mesh( geometry, material );
		dots.__instance__dAdPp = dots.__instance__dAdPp || new THREE.Mesh( geometry, material );
		dots.__instance__dBdFp = dots.__instance__dBdFp || new THREE.Mesh( geometry, material );
		dots.__instance__dBdHp = dots.__instance__dBdHp || new THREE.Mesh( geometry, material );
		dots.__instance__dBdPp = dots.__instance__dBdPp || new THREE.Mesh( geometry, material );

		dots.__instance__dAdX = dots.__instance__dAdX || new THREE.Mesh( geometry, material );
		dots.__instance__dAdY = dots.__instance__dAdY || new THREE.Mesh( geometry, material );
		dots.__instance__dAdZ = dots.__instance__dAdZ || new THREE.Mesh( geometry, material );
		dots.__instance__dBdX = dots.__instance__dBdX || new THREE.Mesh( geometry, material );
		dots.__instance__dBdY = dots.__instance__dBdY || new THREE.Mesh( geometry, material );
		dots.__instance__dBdZ = dots.__instance__dBdZ || new THREE.Mesh( geometry, material );

		dots.__instance__dAdFp.position.set( 0, dots.a.y, dots.a.z);
		dots.__instance__dAdHp.position.set( dots.a.x, 0, dots.a.z);
		dots.__instance__dAdPp.position.set( dots.a.x, dots.a.y, 0);

		dots.__instance__dBdFp.position.set( 0, dots.b.y, dots.b.z);
		dots.__instance__dBdHp.position.set( dots.b.x, 0, dots.b.z);
		dots.__instance__dBdPp.position.set( dots.b.x, dots.b.y, 0);

		dots.__instance__dAdX.position.set(dots.a.x, 0, 0);
		dots.__instance__dAdY.position.set(0, dots.a.y, 0);
		dots.__instance__dAdZ.position.set(0, 0, dots.a.z);
		dots.__instance__dBdX.position.set(dots.b.x, 0, 0);
		dots.__instance__dBdY.position.set(0, dots.b.y, 0);
		dots.__instance__dBdZ.position.set(0, 0, dots.b.z);
	},
	_createTraces2AxesProjectionsDots: function(){

		var geometry = new THREE.SphereGeometry( 1, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots.__instance__FtY = dots.__instance__FtY || new THREE.Mesh( geometry, material );
		dots.__instance__FtZ = dots.__instance__FtZ || new THREE.Mesh( geometry, material );

		dots.__instance__HtX = dots.__instance__HtX || new THREE.Mesh( geometry, material );
		dots.__instance__HtZ = dots.__instance__HtZ || new THREE.Mesh( geometry, material );

		dots.__instance__PtY = dots.__instance__PtY || new THREE.Mesh( geometry, material );
		dots.__instance__PtZ = dots.__instance__PtZ || new THREE.Mesh( geometry, material );

		dots.__instance__FtY.position.set( 0, dots.Ft.y, 0);
		dots.__instance__FtZ.position.set( 0, 0, dots.Ft.z);

		dots.__instance__HtX.position.set( dots.Ht.x, 0, 0);
		dots.__instance__HtZ.position.set( 0, 0, dots.Ht.z);

		dots.__instance__PtY.position.set( dots.Pt.x, 0, 0);
		dots.__instance__PtZ.position.set( 0, dots.Pt.y, 0);
	}
};

var line = {
	vector: {},
	build: function() {
		line._createMainLine();
		line._calculateLineVector();
		line._createFTrace();
		line._createHTrace();
		line._createPTrace();
		line._createDotsPlanesProjections();
		line._createLinePlanesProjections();
		line._createTraces2AxesProjectionsLines();
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

		line.__instance__Line = line.__instance__Line || new THREE.Line( geometry, material );

		line.__instance__Line.geometry.vertices[0].x = dots.a.x;
		line.__instance__Line.geometry.vertices[0].y = dots.a.y;
		line.__instance__Line.geometry.vertices[0].z = dots.a.z;

		line.__instance__Line.geometry.vertices[1].x = dots.b.x;
		line.__instance__Line.geometry.vertices[1].y = dots.b.y;
		line.__instance__Line.geometry.vertices[1].z = dots.b.z;

		line.__instance__Line.geometry.verticesNeedUpdate = true;
	},
	_calculateLineVector: function() {
		line.vector.x = dots.b.x - dots.a.x;
		line.vector.y = dots.b.y - dots.a.y;
		line.vector.z = dots.b.z - dots.a.z;

		line.vector.hamma = (dots.a.x - dots.b.x) / line.vector.x;
	},
	_createFTrace: function() {

		var hammaX = (dots.a.x * -1) / line.vector.x;

		dots.Ft.x = 0;
		dots.Ft.y = dots.a.y + line.vector.y * hammaX;
		dots.Ft.z = dots.a.z + line.vector.z * hammaX;

		line.__instance__lFpIntersection = line.__instance__lFpIntersection || line.__createPlaneIntersection();

		console.log()
		line.__instance__lFpIntersection.geometry.vertices[0].x = dots.a.x;
		line.__instance__lFpIntersection.geometry.vertices[0].y = dots.a.y;
		line.__instance__lFpIntersection.geometry.vertices[0].z = dots.a.z;

		line.__instance__lFpIntersection.geometry.vertices[1].x = dots.Ft.x;
		line.__instance__lFpIntersection.geometry.vertices[1].y = dots.Ft.y;
		line.__instance__lFpIntersection.geometry.vertices[1].z = dots.Ft.z;

		line.__instance__lFpIntersection.geometry.verticesNeedUpdate = true;
	},
	_createHTrace: function() {

		var hammaY = (dots.a.y * -1) / line.vector.y;

		dots.Ht.y = 0;
		dots.Ht.x = dots.a.x + line.vector.x * hammaY;
		dots.Ht.z = dots.a.z + line.vector.z * hammaY;

		line.__instance__lHpIntersection = line.__instance__lHpIntersection || line.__createPlaneIntersection();

		line.__instance__lHpIntersection.geometry.vertices[0].x = dots.a.x;
		line.__instance__lHpIntersection.geometry.vertices[0].y = dots.a.y;
		line.__instance__lHpIntersection.geometry.vertices[0].z = dots.a.z;

		line.__instance__lHpIntersection.geometry.vertices[1].x = dots.Ht.x;
		line.__instance__lHpIntersection.geometry.vertices[1].y = dots.Ht.y;
		line.__instance__lHpIntersection.geometry.vertices[1].z = dots.Ht.z;

		line.__instance__lHpIntersection.geometry.verticesNeedUpdate = true;
	},
	_createPTrace: function() {

		var hammaZ = (dots.a.z * -1) / line.vector.z;

		dots.Pt.z = 0;
		dots.Pt.x = dots.a.x + line.vector.x * hammaZ;
		dots.Pt.y = dots.a.y + line.vector.y * hammaZ;
			
		line.__instance__lPpIntersection = line.__instance__lPpIntersection || line.__createPlaneIntersection();

		line.__instance__lPpIntersection.geometry.vertices[0].x = dots.a.x;
		line.__instance__lPpIntersection.geometry.vertices[0].y = dots.a.y;
		line.__instance__lPpIntersection.geometry.vertices[0].z = dots.a.z;

		line.__instance__lPpIntersection.geometry.vertices[1].x = dots.Pt.x;
		line.__instance__lPpIntersection.geometry.vertices[1].y = dots.Pt.y;
		line.__instance__lPpIntersection.geometry.vertices[1].z = dots.Pt.z;

		line.__instance__lPpIntersection.geometry.verticesNeedUpdate = true;
	},
	_createLinePlanesProjections: function() {

		line.__instance__lAdF = line.__instance__lAdF || line.__createLine2PlaneProjectioHelper();
		line.__instance__lAdH = line.__instance__lAdH || line.__createLine2PlaneProjectioHelper();
		line.__instance__lAdP = line.__instance__lAdP || line.__createLine2PlaneProjectioHelper();

		line.__instance__lBdF = line.__instance__lBdF || line.__createLine2PlaneProjectioHelper();
		line.__instance__lBdH = line.__instance__lBdH || line.__createLine2PlaneProjectioHelper();
		line.__instance__lBdP = line.__instance__lBdP || line.__createLine2PlaneProjectioHelper();

		line.__setLinePlaneProjections([line.__instance__lAdF, line.__instance__lAdH, line.__instance__lAdP ]);
		line.__setLinePlaneProjections([line.__instance__lBdF, line.__instance__lBdH, line.__instance__lBdP ]);
	},
	_createDotsPlanesProjections: function() {
		line.__instance__lAdFpHelper = line.__instance__lAdFpHelper || line.__createDot2PlaneProjectioHelper(4);
		line.__instance__lAdHpHelper = line.__instance__lAdHpHelper || line.__createDot2PlaneProjectioHelper(4);
		line.__instance__lAdPpHelper = line.__instance__lAdPpHelper || line.__createDot2PlaneProjectioHelper(4);

		line.__instance__lBdFpHelper = line.__instance__lBdFpHelper || line.__createDot2PlaneProjectioHelper(4);
		line.__instance__lBdHpHelper = line.__instance__lBdHpHelper || line.__createDot2PlaneProjectioHelper(4);
		line.__instance__lBdPpHelper = line.__instance__lBdPpHelper || line.__createDot2PlaneProjectioHelper(4);

		line.__setDotPlaneProjections(dots.a, [line.__instance__lAdFpHelper, line.__instance__lAdHpHelper, line.__instance__lAdPpHelper ]);
		line.__setDotPlaneProjections(dots.b, [line.__instance__lBdFpHelper, line.__instance__lBdHpHelper, line.__instance__lBdPpHelper ]);
	},
	_createTraces2AxesProjectionsLines: function() {

		line.__instance__lFtHpHelper = line.__instance__lFtHpHelper || line.__createDot2PlaneProjectioHelper(2);
		line.__instance__lFtPpHelper = line.__instance__lFtPpHelper || line.__createDot2PlaneProjectioHelper(2);	

		line.__instance__lHtFpHelper = line.__instance__lHtFpHelper || line.__createDot2PlaneProjectioHelper(2);
		line.__instance__lHtPpHelper = line.__instance__lHtPpHelper || line.__createDot2PlaneProjectioHelper(2);

		line.__instance__lPtFpHelper = line.__instance__lPtFpHelper || line.__createDot2PlaneProjectioHelper(2);
		line.__instance__lPtHpHelper = line.__instance__lPtHpHelper || line.__createDot2PlaneProjectioHelper(2);
		
		line.__setTrace2PlaneProjections(dots.Ft, [line.__instance__lFtHpHelper, line.__instance__lFtPpHelper]);
		line.__setTrace2PlaneProjections(dots.Ht, [line.__instance__lHtFpHelper, line.__instance__lHtPpHelper]);
		line.__setTrace2PlaneProjections(dots.Pt, [line.__instance__lPtFpHelper, line.__instance__lPtHpHelper]);

		line.__setTraces2PlaneProjections();
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
	__setTrace2PlaneProjections: function(dot, objects) {
		for (var obj in objects) {
			for(i=0;i<objects[obj].geometry.vertices.length;i++) {
				objects[obj].geometry.vertices[i].x = dot.x;
				objects[obj].geometry.vertices[i].y = dot.y;
				objects[obj].geometry.vertices[i].z = dot.z;

				objects[obj].geometry.verticesNeedUpdate = true;
			}
		}
	},
	__setTraces2PlaneProjections: function() {
		console.log(line.__instance__lFtHpHelper.geometry.vertices);
		line.__instance__lFtHpHelper.geometry.vertices[0].y = 0;
		// line.__instance__lFtHpHelper.y = 0;

		// line.__instance__lPpIntersection.geometry.vertices[0].x = dots.a.x;
		// line.__instance__lPpIntersection.geometry.vertices[0].y = dots.a.y;
		// line.__instance__lPpIntersection.geometry.vertices[0].z = dots.a.z;

		// line.__instance__lPpIntersection.geometry.vertices[1].x = dots.Pt.x;
		// line.__instance__lPpIntersection.geometry.vertices[1].y = dots.Pt.y;
		// line.__instance__lPpIntersection.geometry.vertices[1].z = dots.Pt.z;

	}
}

var axes = {
	x: {
		color: 0xBB0000
	},
	y: {
		color: 0x0000BB
	},
	z: {
		color: 0x00BB00
	},
	build: function() {
		axes._createMainAxes();
		axes._createHelperAxes();
	},
	_createSingleAxe: function( src, dst, colorHex, sub) {
		var geometry = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial({ linewidth: (sub ? 1 : 2), color: colorHex });

		geometry.vertices.push( src.clone(), dst.clone() );
	    // geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines
	    return new THREE.Line( geometry, material, THREE.LinePieces );
	},
	_createMainAxes: function() {

		var length = 1000,
			nullPoint = new THREE.Vector3( 0, 0, 0 );

		axes.__instance__mainAxes = new THREE.Object3D();
		axes.__instance__mainAxes.name = 'axes';

	    axes.__instance__mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( length, 0, 0 ), axes.x.color ) ); // +X
	    axes.__instance__mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( -length, 0, 0 ), axes.x.color ) ); // -X

	    axes.__instance__mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, length, 0 ), axes.y.color ) ); // +Y
	    axes.__instance__mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, -length, 0 ), axes.y.color ) ); // -Y

	    axes.__instance__mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, 0, length ), axes.z.color ) ); // +Z
	    axes.__instance__mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, 0, -length ), axes.z.color ) ); // -Z

	},
	_createHelperAxes: function(length, step) {
		
		var step =  25,
			length = 200,
			color = 0x868686;

		axes.__instance__helperAxes =  new THREE.Object3D();
		axes.__instance__helperAxes.name = 'axes';

		for (var i = -length; i <= length; i = i + step) {
			if (i !== 0) {
				// plane P, Z and X change
				axes.__instance__helperAxes.add( axes._createSingleAxe( new THREE.Vector3( -length, i, 0 ), new THREE.Vector3( length, i, 0 ), color, 1 ) );
				axes.__instance__helperAxes.add( axes._createSingleAxe( new THREE.Vector3( i, -length, 0 ), new THREE.Vector3( i, length, 0 ), color, 1 ) );
				// plane F - Z and Y change
				axes.__instance__helperAxes.add( axes._createSingleAxe( new THREE.Vector3( 0, i, -length ), new THREE.Vector3( 0, i, length ), color, 1) );
				axes.__instance__helperAxes.add( axes._createSingleAxe( new THREE.Vector3( 0, -length, i ), new THREE.Vector3( 0, length, i), color, 1) );
				// plane H - X and Y change
				axes.__instance__helperAxes.add( axes._createSingleAxe( new THREE.Vector3( i, 0, -length ), new THREE.Vector3( i, 0, length ), color, 1) );
				axes.__instance__helperAxes.add( axes._createSingleAxe( new THREE.Vector3( -length, 0, i ), new THREE.Vector3( length, 0, i), color, 1) );
			}
		}
	},	
};



$(function() {

	init();

	axes.build();
	line.build();
	dots.build();

	draw('axes');
	draw('dots');
	draw('line');

	render();

	$('#controls')
		.mouseenter(function() {
			controls.enabled = false;
			controls.rotate = false;
		})
		.mouseleave(function() {
			controls.enabled = true;
			controls.rotate = true;

			$('.dot-name').removeClass('active');
			$('.dot-controls').hide();		
		});

	$('.dots .dot-name').click(function(){

		$('.dot-name').removeClass('active');
		$('.dot-controls').hide();		
		
		$(this).addClass('active');
		$('.' + $(this).data('class')).show();
	});

	$.each(dots, function(dotName, coords){
		$.each(coords, function(coordName, coordValue){
			var id = '#' + dotName + coordName;
			var $el = $(id);
			if ($el.length) {
				$el.noUiSlider({
					start: [ coordValue ],
					step: 1,
					range: {
						'min': [  0 ],
						'max': [ 100 ]
					}
				})
				.Link('lower').to($(id + '-value'), null, wNumb( { decimals: 0 } ) )
				.on('slide',function(){
					var id = $(this).attr('id');
					eval('dots.' + id.substr(0,1) + '.' + id.substr(1,1) + ' = ' + $(this).val() + ';');
					line.build();
					dots.build();
				});
			}
		});		
	});

});
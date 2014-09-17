// ga.s_trackEvent(category, action, opt_label, opt_value, opt_noninteraction)

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

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
	    if (object.hasOwnProperty(property) && !property.indexOf('_obj_')) {
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

		dots._obj_Ad = dots._obj_Ad || new THREE.Mesh( geometry, material );
		dots._obj_Bd = dots._obj_Bd || new THREE.Mesh( geometry, material );

		dots._obj_Ad.position.set( dots.a.x, dots.a.y, dots.a.z);
		dots._obj_Bd.position.set( dots.b.x, dots.b.y, dots.b.z);
	},
	_createLineTraces: function() {

		var geometry = new THREE.SphereGeometry( 1.5, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots._obj_dFt = dots._obj_dFt || new THREE.Mesh( geometry, material );
		dots._obj_dHy = dots._obj_dHy || new THREE.Mesh( geometry, material );
		dots._obj_dPy = dots._obj_dPy || new THREE.Mesh( geometry, material );

		dots._obj_dFt.position.set( dots.Ft.x, dots.Ft.y, dots.Ft.z);
		dots._obj_dHy.position.set( dots.Ht.x, dots.Ht.y, dots.Ht.z);
		dots._obj_dPy.position.set( dots.Pt.x, dots.Pt.y, dots.Pt.z);
	},
	_createDotsPlanesProjections: function(){

		var geometry = new THREE.SphereGeometry( 0.5, 20, 20 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots._obj_dAdFp = dots._obj_dAdFp || new THREE.Mesh( geometry, material );
		dots._obj_dAdHp = dots._obj_dAdHp || new THREE.Mesh( geometry, material );
		dots._obj_dAdPp = dots._obj_dAdPp || new THREE.Mesh( geometry, material );
		dots._obj_dBdFp = dots._obj_dBdFp || new THREE.Mesh( geometry, material );
		dots._obj_dBdHp = dots._obj_dBdHp || new THREE.Mesh( geometry, material );
		dots._obj_dBdPp = dots._obj_dBdPp || new THREE.Mesh( geometry, material );

		dots._obj_dAdX = dots._obj_dAdX || new THREE.Mesh( geometry, material );
		dots._obj_dAdY = dots._obj_dAdY || new THREE.Mesh( geometry, material );
		dots._obj_dAdZ = dots._obj_dAdZ || new THREE.Mesh( geometry, material );
		dots._obj_dBdX = dots._obj_dBdX || new THREE.Mesh( geometry, material );
		dots._obj_dBdY = dots._obj_dBdY || new THREE.Mesh( geometry, material );
		dots._obj_dBdZ = dots._obj_dBdZ || new THREE.Mesh( geometry, material );

		dots._obj_dAdFp.position.set( 0, dots.a.y, dots.a.z);
		dots._obj_dAdHp.position.set( dots.a.x, 0, dots.a.z);
		dots._obj_dAdPp.position.set( dots.a.x, dots.a.y, 0);

		dots._obj_dBdFp.position.set( 0, dots.b.y, dots.b.z);
		dots._obj_dBdHp.position.set( dots.b.x, 0, dots.b.z);
		dots._obj_dBdPp.position.set( dots.b.x, dots.b.y, 0);

		dots._obj_dAdX.position.set(dots.a.x, 0, 0);
		dots._obj_dAdY.position.set(0, dots.a.y, 0);
		dots._obj_dAdZ.position.set(0, 0, dots.a.z);
		dots._obj_dBdX.position.set(dots.b.x, 0, 0);
		dots._obj_dBdY.position.set(0, dots.b.y, 0);
		dots._obj_dBdZ.position.set(0, 0, dots.b.z);
	},
	_createTraces2AxesProjectionsDots: function(){

		var geometry = new THREE.SphereGeometry( 1, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots._obj_FtY = dots._obj_FtY || new THREE.Mesh( geometry, material );
		dots._obj_FtZ = dots._obj_FtZ || new THREE.Mesh( geometry, material );

		dots._obj_HtX = dots._obj_HtX || new THREE.Mesh( geometry, material );
		dots._obj_HtZ = dots._obj_HtZ || new THREE.Mesh( geometry, material );

		dots._obj_PtY = dots._obj_PtY || new THREE.Mesh( geometry, material );
		dots._obj_PtZ = dots._obj_PtZ || new THREE.Mesh( geometry, material );

		dots._obj_FtY.position.set( 0, dots.Ft.y, 0);
		dots._obj_FtZ.position.set( 0, 0, dots.Ft.z);

		dots._obj_HtX.position.set( dots.Ht.x, 0, 0);
		dots._obj_HtZ.position.set( 0, 0, dots.Ht.z);

		dots._obj_PtY.position.set( dots.Pt.x, 0, 0);
		dots._obj_PtZ.position.set( 0, dots.Pt.y, 0);
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
		line._createTraces2AxesProjections();
		line._createLineWithTracesProjections();
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

		line._obj_Line = line._obj_Line || new THREE.Line( geometry, material );

		line._obj_Line.geometry.vertices[0].x = dots.a.x;
		line._obj_Line.geometry.vertices[0].y = dots.a.y;
		line._obj_Line.geometry.vertices[0].z = dots.a.z;

		line._obj_Line.geometry.vertices[1].x = dots.b.x;
		line._obj_Line.geometry.vertices[1].y = dots.b.y;
		line._obj_Line.geometry.vertices[1].z = dots.b.z;

		line._obj_Line.geometry.verticesNeedUpdate = true;
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

		line._obj_lFpIntersection = line._obj_lFpIntersection || line.__createPlaneIntersection();

		console.log()
		line._obj_lFpIntersection.geometry.vertices[0].x = dots.a.x;
		line._obj_lFpIntersection.geometry.vertices[0].y = dots.a.y;
		line._obj_lFpIntersection.geometry.vertices[0].z = dots.a.z;

		line._obj_lFpIntersection.geometry.vertices[1].x = dots.Ft.x;
		line._obj_lFpIntersection.geometry.vertices[1].y = dots.Ft.y;
		line._obj_lFpIntersection.geometry.vertices[1].z = dots.Ft.z;

		line._obj_lFpIntersection.geometry.verticesNeedUpdate = true;
	},
	_createHTrace: function() {

		var hammaY = (dots.a.y * -1) / line.vector.y;

		dots.Ht.y = 0;
		dots.Ht.x = dots.a.x + line.vector.x * hammaY;
		dots.Ht.z = dots.a.z + line.vector.z * hammaY;

		line._obj_lHpIntersection = line._obj_lHpIntersection || line.__createPlaneIntersection();

		line._obj_lHpIntersection.geometry.vertices[0].x = dots.a.x;
		line._obj_lHpIntersection.geometry.vertices[0].y = dots.a.y;
		line._obj_lHpIntersection.geometry.vertices[0].z = dots.a.z;

		line._obj_lHpIntersection.geometry.vertices[1].x = dots.Ht.x;
		line._obj_lHpIntersection.geometry.vertices[1].y = dots.Ht.y;
		line._obj_lHpIntersection.geometry.vertices[1].z = dots.Ht.z;

		line._obj_lHpIntersection.geometry.verticesNeedUpdate = true;
	},
	_createPTrace: function() {

		var hammaZ = (dots.a.z * -1) / line.vector.z;

		dots.Pt.z = 0;
		dots.Pt.x = dots.a.x + line.vector.x * hammaZ;
		dots.Pt.y = dots.a.y + line.vector.y * hammaZ;
			
		line._obj_lPpIntersection = line._obj_lPpIntersection || line.__createPlaneIntersection();

		line._obj_lPpIntersection.geometry.vertices[0].x = dots.a.x;
		line._obj_lPpIntersection.geometry.vertices[0].y = dots.a.y;
		line._obj_lPpIntersection.geometry.vertices[0].z = dots.a.z;

		line._obj_lPpIntersection.geometry.vertices[1].x = dots.Pt.x;
		line._obj_lPpIntersection.geometry.vertices[1].y = dots.Pt.y;
		line._obj_lPpIntersection.geometry.vertices[1].z = dots.Pt.z;

		line._obj_lPpIntersection.geometry.verticesNeedUpdate = true;
	},
	_createLinePlanesProjections: function() {

		line._obj_lAdF = line._obj_lAdF || line.__createLine2PlaneProjectioHelper();
		line._obj_lAdH = line._obj_lAdH || line.__createLine2PlaneProjectioHelper();
		line._obj_lAdP = line._obj_lAdP || line.__createLine2PlaneProjectioHelper();

		line._obj_lBdF = line._obj_lBdF || line.__createLine2PlaneProjectioHelper();
		line._obj_lBdH = line._obj_lBdH || line.__createLine2PlaneProjectioHelper();
		line._obj_lBdP = line._obj_lBdP || line.__createLine2PlaneProjectioHelper();

		line.__setLinePlaneProjections([line._obj_lAdF, line._obj_lAdH, line._obj_lAdP ]);
		line.__setLinePlaneProjections([line._obj_lBdF, line._obj_lBdH, line._obj_lBdP ]);
	},
	_createDotsPlanesProjections: function() {
		line._obj_lAdFpHelper = line._obj_lAdFpHelper || line.__createDot2PlaneProjectioHelper(4);
		line._obj_lAdHpHelper = line._obj_lAdHpHelper || line.__createDot2PlaneProjectioHelper(4);
		line._obj_lAdPpHelper = line._obj_lAdPpHelper || line.__createDot2PlaneProjectioHelper(4);

		line._obj_lBdFpHelper = line._obj_lBdFpHelper || line.__createDot2PlaneProjectioHelper(4);
		line._obj_lBdHpHelper = line._obj_lBdHpHelper || line.__createDot2PlaneProjectioHelper(4);
		line._obj_lBdPpHelper = line._obj_lBdPpHelper || line.__createDot2PlaneProjectioHelper(4);

		line.__setDotPlaneProjections(dots.a, [line._obj_lAdFpHelper, line._obj_lAdHpHelper, line._obj_lAdPpHelper ]);
		line.__setDotPlaneProjections(dots.b, [line._obj_lBdFpHelper, line._obj_lBdHpHelper, line._obj_lBdPpHelper ]);
	},
	_createTraces2AxesProjections: function() {

		line._obj_lFtHpHelper = line._obj_lFtHpHelper || line.__createDot2PlaneProjectioHelper(2);
		line._obj_lFtPpHelper = line._obj_lFtPpHelper || line.__createDot2PlaneProjectioHelper(2);	

		line._obj_lHtFpHelper = line._obj_lHtFpHelper || line.__createDot2PlaneProjectioHelper(2);
		line._obj_lHtPpHelper = line._obj_lHtPpHelper || line.__createDot2PlaneProjectioHelper(2);

		line._obj_lPtFpHelper = line._obj_lPtFpHelper || line.__createDot2PlaneProjectioHelper(2);
		line._obj_lPtHpHelper = line._obj_lPtHpHelper || line.__createDot2PlaneProjectioHelper(2);
		
		line.__setTrace2PlaneProjections(dots.Ft, [line._obj_lFtHpHelper, line._obj_lFtPpHelper]);
		line.__setTrace2PlaneProjections(dots.Ht, [line._obj_lHtFpHelper, line._obj_lHtPpHelper]);
		line.__setTrace2PlaneProjections(dots.Pt, [line._obj_lPtFpHelper, line._obj_lPtHpHelper]);

		line._obj_lFtHpHelper.geometry.vertices[0].set(0,0,dots.Ft.z);
		line._obj_lFtPpHelper.geometry.vertices[0].set(0,dots.Ft.y,0);

		line._obj_lHtFpHelper.geometry.vertices[0].set(dots.Ht.x,0,0);
		line._obj_lHtPpHelper.geometry.vertices[0].set(0,0,dots.Ht.z);
		
		line._obj_lPtFpHelper.geometry.vertices[0].set(dots.Pt.x,0,0);
		line._obj_lPtHpHelper.geometry.vertices[0].set(0,dots.Pt.y,0);
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
	_createLineWithTracesProjections: function() {

		line._obj_lLH = line._obj_lLH || line.__createLine2PlaneProjectioHelper();
		line._obj_lLF = line._obj_lLF || line.__createLine2PlaneProjectioHelper();
		line._obj_lLP = line._obj_lLP || line.__createLine2PlaneProjectioHelper();

		line._obj_lLH.geometry.vertices[0].set(dots.Pt.x,0,0);
		line._obj_lLH.geometry.vertices[1].set(dots.Ht.x,dots.Ht.y,dots.Ht.z);

		line._obj_lLF.geometry.vertices[0].set(0,dots.Pt.y,dots.Pt.z);
		line._obj_lLF.geometry.vertices[1].set(0,dots.Ht.y,dots.Ht.z);

		line._obj_lLP.geometry.vertices[0].set(dots.Pt.x,dots.Pt.y,0);
		line._obj_lLP.geometry.vertices[1].set(dots.Ht.x,dots.Ht.y,0);

		line._obj_lLH.geometry.verticesNeedUpdate = true;
		line._obj_lLF.geometry.verticesNeedUpdate = true;
		line._obj_lLP.geometry.verticesNeedUpdate = true;		
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

		axes._obj_mainAxes = new THREE.Object3D();
		axes._obj_mainAxes.name = 'axes';

	    axes._obj_mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( length, 0, 0 ), axes.x.color ) ); // +X
	    axes._obj_mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( -length, 0, 0 ), axes.x.color ) ); // -X

	    axes._obj_mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, length, 0 ), axes.y.color ) ); // +Y
	    axes._obj_mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, -length, 0 ), axes.y.color ) ); // -Y

	    axes._obj_mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, 0, length ), axes.z.color ) ); // +Z
	    axes._obj_mainAxes.add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, 0, -length ), axes.z.color ) ); // -Z

	},
	_createHelperAxes: function(length, step) {
		
		var step =  25,
			length = 200,
			color = 0x868686;

		axes._obj_helperAxes =  new THREE.Object3D();
		axes._obj_helperAxes.name = 'axes';

		for (var i = -length; i <= length; i = i + step) {
			if (i !== 0) {
				// plane P, Z and X change
				axes._obj_helperAxes.add( axes._createSingleAxe( new THREE.Vector3( -length, i, 0 ), new THREE.Vector3( length, i, 0 ), color, 1 ) );
				axes._obj_helperAxes.add( axes._createSingleAxe( new THREE.Vector3( i, -length, 0 ), new THREE.Vector3( i, length, 0 ), color, 1 ) );
				// plane F - Z and Y change
				axes._obj_helperAxes.add( axes._createSingleAxe( new THREE.Vector3( 0, i, -length ), new THREE.Vector3( 0, i, length ), color, 1) );
				axes._obj_helperAxes.add( axes._createSingleAxe( new THREE.Vector3( 0, -length, i ), new THREE.Vector3( 0, length, i), color, 1) );
				// plane H - X and Y change
				axes._obj_helperAxes.add( axes._createSingleAxe( new THREE.Vector3( i, 0, -length ), new THREE.Vector3( i, 0, length ), color, 1) );
				axes._obj_helperAxes.add( axes._createSingleAxe( new THREE.Vector3( -length, 0, i ), new THREE.Vector3( length, 0, i), color, 1) );
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
			var id = dotName + coordName;
			var $el = $('#' + id);

			if ($el.length) {
				
				$('#' + id + '-value').text(parseInt(eval('dots.' + dotName + '.' + coordName)));

				$el.noUiSlider({
					start: [ coordValue ],
					step: 1,
					range: {
						'min': [  0 ],
						'max': [ 100 ]
					}
				})
				// .Link().to($(id + '-value'), null, wNumb( { decimals: 0 } ) )
				.on('slide',function(){
					var id = $(this).attr('id');
					eval('dots.' + id.substr(0,1) + '.' + id.substr(1,1) + ' = ' + $(this).val() + ';');

					$('#' + id + '-value').text(parseInt($(this).val()));

					line.build();
					dots.build();
				});
			}
		});		
	});

});
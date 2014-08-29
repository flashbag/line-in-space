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
        	scene.remove(instance);
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
	FpIntersection: {},
	HpIntersection: {},
	PpIntersection: {},
	build: function() {
		dots._createMainDots();
		dots._createMainDotsPlanesIntersections();
		dots._createMainDotsPlanesProjections();
		draw('dots');
	},
	_createMainDots: function() {

		var geometry = new THREE.SphereGeometry( 0.75, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0x19718A } );

		dots.__instance__Ad = new THREE.Mesh( geometry, material );
		dots.__instance__Bd = dots.__instance__Ad.clone();
		dots.__instance__Ad.position.set( dots.a.x, dots.a.y, dots.a.z);
		dots.__instance__Bd.position.set( dots.b.x, dots.b.y, dots.b.z);
	},
	_createMainDotsPlanesIntersections: function() {

		var geometry = new THREE.SphereGeometry( 1, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots.__instance__FpIntersection = new THREE.Mesh( geometry, material );
		dots.__instance__HpIntersection = dots.__instance__FpIntersection.clone();
		dots.__instance__PpIntersection = dots.__instance__FpIntersection.clone();

		dots.__instance__FpIntersection.position.set( dots.FpIntersection.x, dots.FpIntersection.y, dots.FpIntersection.z);
		dots.__instance__HpIntersection.position.set( dots.HpIntersection.x, dots.HpIntersection.y, dots.HpIntersection.z);
		dots.__instance__PpIntersection.position.set( dots.PpIntersection.x, dots.PpIntersection.y, dots.PpIntersection.z);
	},
	_createMainDotsPlanesProjections: function(){

		var geometry = new THREE.SphereGeometry( 0.5, 20, 20 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots.__instance__AdFpProjection = new THREE.Mesh( geometry, material );
		dots.__instance__BdFpProjection = dots.__instance__AdFpProjection.clone();
		dots.__instance__BdHpProjection = dots.__instance__AdFpProjection.clone();
		dots.__instance__BdPpProjection = dots.__instance__AdFpProjection.clone();
		dots.__instance__AdHpProjection = dots.__instance__AdFpProjection.clone();
		dots.__instance__AdPpProjection = dots.__instance__AdFpProjection.clone();

		dots.__instance__AdFpProjection.position.set( 0, dots.a.y, dots.a.z);
		dots.__instance__AdHpProjection.position.set( dots.a.x, 0, dots.a.z);
		dots.__instance__AdPpProjection.position.set( dots.a.x, dots.a.y, 0);

		dots.__instance__BdFpProjection.position.set( 0, dots.b.y, dots.b.z);
		dots.__instance__BdHpProjection.position.set( dots.b.x, 0, dots.b.z);
		dots.__instance__BdPpProjection.position.set( dots.b.x, dots.b.y, 0);
	}
};

var line = {
	vector: {},
	build: function() {
		line._createMainLine();
		line._calculateLineVector();
		line._createFpIntersection();
		line._createHpIntersection();
		line._createPpIntersection();
		draw('line');		
	},
	_createMainLine: function(){
		var geometry = new THREE.Geometry();

		var material = new THREE.LineBasicMaterial({
			color: 0x19718A,
			linewidth: 3
		});

		geometry.vertices.push(
			new THREE.Vector3( dots.a.x, dots.a.y, dots.a.z ),
			new THREE.Vector3( dots.b.x, dots.b.y, dots.b.z )
			);

		line.__instance__Line = new THREE.Line( geometry, material );
	},
	_calculateLineVector: function() {
		line.vector.x = dots.b.x - dots.a.x;
		line.vector.y = dots.b.y - dots.a.y;
		line.vector.z = dots.b.z - dots.a.z;

		line.vector.hamma = (dots.a.x - dots.b.x) / line.vector.x;
	},
	_createFpIntersection: function() {

		var hammaX = (dots.a.x * -1) / line.vector.x;

		dots.FpIntersection.x = 0;
		dots.FpIntersection.y = dots.a.y + line.vector.y * hammaX;
		dots.FpIntersection.z = dots.a.z + line.vector.z * hammaX;

		line.__instance__lFpIntersection = line.__createPlaneIntersection(
			dots.FpIntersection.x, 
			dots.FpIntersection.y, 
			dots.FpIntersection.z
		);
	},
	_createHpIntersection: function() {

		var hammaY = (dots.a.y * -1) / line.vector.y;

		dots.HpIntersection.y = 0;
		dots.HpIntersection.x = dots.a.x + line.vector.x * hammaY;
		dots.HpIntersection.z = dots.a.z + line.vector.z * hammaY;

		line.__instance__lHpIntersection = line.__createPlaneIntersection(
			dots.HpIntersection.x, 
			dots.HpIntersection.y, 
			dots.HpIntersection.z
		);
	},
	_createPpIntersection: function() {

		var hammaZ = (dots.a.z * -1) / line.vector.z;

		dots.PpIntersection.z = 0;
		dots.PpIntersection.x = dots.a.x + line.vector.x * hammaZ;
		dots.PpIntersection.y = dots.a.y + line.vector.y * hammaZ;
			
		line.__instance__lPpIntersection = line.__createPlaneIntersection(
			dots.PpIntersection.x, 
			dots.PpIntersection.y, 
			dots.PpIntersection.z
		);
	},
	__createPlaneIntersection: function(x, y, z) {

		var geometry = new THREE.Geometry();

		var material = new THREE.LineBasicMaterial({
			color: 0x19718A,
			linewidth: 1.5
		});

		geometry.vertices.push(
			new THREE.Vector3( dots.a.x, dots.a.y, dots.a.z ),
			new THREE.Vector3( x, y, z )
		);

		return new THREE.Line( geometry, material );
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
		draw('axes');
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

		axes.__instance__helperAxes = new THREE.Object3D();

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
			$(id).noUiSlider({
				start: [ coordValue ],
				step: 1,
				range: {
					'min': [  0 ],
					'max': [ 100 ]
				}
			});

			$(id).Link('lower').to($(id + '-value'), null, wNumb( { decimals: 0 } ) );

			$(id).on('slide',function(){
				var id = $(this).attr('id');
				eval('dots.' + id.substr(0,1) + '.' + id.substr(1,1) + ' = ' + $(this).val() + ';');
				line.build();
				dots.build();
			});
		});		
	});

});
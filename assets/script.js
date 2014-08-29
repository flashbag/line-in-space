// А(90;75;10) and B(30;50;45).

THREE.Object3D.prototype.clear = function(){
    var children = this.children;
    for(var i = children.length-1;i>=0;i--){
        var child = children[i];
        child.clear();
        this.removeChild(child);
    };
};


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
}

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
	planeFIntersection: {},
	planeHIntersection: {},
	planePIntersection: {},
	build: function() {
		dots._buildMainDots();
		dots._buildMainDotsPlanesIntersections();
	},
	_buildMainDots: function() {
		var geometry = new THREE.SphereGeometry( 0.75, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0x19718A } );

		scene.remove( dots.instanceA );
		scene.remove( dots.instanceB );

		dots.instanceA = new THREE.Mesh( geometry, material );
		dots.instanceA.position.set( dots.a.x, dots.a.y, dots.a.z);
		dots.instanceB = dots.instanceA.clone();
		dots.instanceA.position.set( dots.b.x, dots.b.y, dots.b.z);

		scene.add( dots.instanceA );
		scene.add( dots.instanceB );
	},
	_buildMainDotsPlanesIntersections: function() {
		scene.remove(dots.instancePlaneFIntersection);
		scene.remove(dots.instancePlaneHIntersection);
		scene.remove(dots.instancePlanePIntersection);

		var geometry = new THREE.SphereGeometry( 1, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots.instancePlaneFIntersection = new THREE.Mesh( geometry, material );
		dots.instancePlaneFIntersection.position.set( dots.planeFIntersection.x, dots.planeFIntersection.y, dots.planeFIntersection.z);
		dots.instancePlaneHIntersection = dots.instancePlaneFIntersection.clone();
		dots.instancePlaneHIntersection.position.set( dots.planeHIntersection.x, dots.planeHIntersection.y, dots.planeHIntersection.z);
		dots.instancePlanePIntersection = dots.instancePlaneFIntersection.clone();
		dots.instancePlanePIntersection.position.set( dots.planePIntersection.x, dots.planePIntersection.y, dots.planePIntersection.z);

		scene.add( dots.instancePlaneFIntersection );
		scene.add( dots.instancePlaneHIntersection );
		scene.add( dots.instancePlanePIntersection );
	},
	_buildMainDotsPlanesProjections: function(){

		scene.remove(dots.dotAPlaneFProjection);
		scene.remove(dots.dotAPlaneHProjection);
		scene.remove(dots.dotAPlanePProjection);

		scene.remove(dots.dotBPlaneFProjection);
		scene.remove(dots.dotBPlaneHProjection);
		scene.remove(dots.dotBPlanePProjection);

		var geometry = new THREE.SphereGeometry( 0.5, 20, 20 );
		var material = new THREE.MeshBasicMaterial( { color: 0xEE0000 } );

		dots.dotAPlaneFProjection = new THREE.Mesh( geometry, material );
		dots.dotAPlaneFProjection.position.set( 0, dots.a.y, dots.a.z);
		dots.dotBPlaneFProjection = dots.dotAPlaneFProjection.clone();
		dots.dotBPlaneFProjection.position.set( dots.a.x, 0, dots.a.z);
		dots.instanceZNull = dots.dotAPlaneFProjection.clone();
		dots.instanceZNull.position.set( dots.planePIntersection.x, dots.planePIntersection.y, dots.planePIntersection.z);

		scene.add( dots.instanceXNull );
		scene.add( dots.instanceYNull );
		scene.add( dots.instanceZNull );
	}
};

var line = {
	vector: {},
	build: function() {
		if (line.lineInstance)
			scene.remove(line.lineInstance);

		line._calculateLineVector();
		line._buildPlaneFIntersection();
		line._buildPlaneHIntersection();
		line._buildPlanePIntersection();

		var geometry = new THREE.Geometry();

		var material = new THREE.LineBasicMaterial({
			color: 0x19718A,
			linewidth: 3
		});

		geometry.vertices.push(
			new THREE.Vector3( dots.a.x, dots.a.y, dots.a.z ),
			new THREE.Vector3( dots.b.x, dots.b.y, dots.b.z )
			);
		line.lineInstance = new THREE.Line( geometry, material );
		scene.add(line.lineInstance);
	},
	_calculateLineVector: function() {

		line.vector.x = dots.b.x - dots.a.x;
		line.vector.y = dots.b.y - dots.a.y;
		line.vector.z = dots.b.z - dots.a.z;

		line.vector.hamma = (dots.a.x - dots.b.x) / line.vector.x;
	},
	_buildPlaneFIntersection: function() {

		var hammaX = (dots.a.x * -1) / line.vector.x;

		dots.planeFIntersection.x = 0;
		dots.planeFIntersection.y = dots.a.y + line.vector.y * hammaX;
		dots.planeFIntersection.z = dots.a.z + line.vector.z * hammaX;

		if (line.lineInstanceNullX)
			scene.remove(line.lineInstanceNullX);

		line.lineInstanceNullX = line._buildPlaneIntersection(dots.planeFIntersection.x, dots.planeFIntersection.y, dots.planeFIntersection.z);
		scene.add(line.lineInstanceNullX);
	},
	_buildPlaneHIntersection: function() {

		var hammaY = (dots.a.y * -1) / line.vector.y;

		dots.planeHIntersection.y = 0;
		dots.planeHIntersection.x = dots.a.x + line.vector.x * hammaY;
		dots.planeHIntersection.z = dots.a.z + line.vector.z * hammaY;

		if (line.lineInstanceNullY)
			scene.remove(line.lineInstanceNullY);

		line.lineInstanceNullY = line._buildPlaneIntersection(dots.planeHIntersection.x, dots.planeHIntersection.y, dots.planeHIntersection.z);
		scene.add(line.lineInstanceNullY);
	},
	_buildPlanePIntersection: function() {

		var hammaZ = (dots.a.z * -1) / line.vector.z;

		dots.planePIntersection.z = 0;
		dots.planePIntersection.x = dots.a.x + line.vector.x * hammaZ;
		dots.planePIntersection.y = dots.a.y + line.vector.y * hammaZ;
			
		if (line.lineInstanceNullZ)
			scene.remove(line.lineInstanceNullZ);

		line.lineInstanceNullZ = line._buildPlaneIntersection(dots.planePIntersection.x, dots.planePIntersection.y, dots.planePIntersection.z);
		scene.add(line.lineInstanceNullZ);
	},
	_buildPlaneIntersection: function(x, y, z) {

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
		axes._buildMainAxes();
		axes._buildHelperAxes();
	},
	_buildOneAxe: function( src, dst, colorHex, sub) {
		var geom = new THREE.Geometry();
		var mat = new THREE.LineBasicMaterial({ linewidth: (sub ? 1 : 2), color: colorHex });

		geom.vertices.push( src.clone() );
		geom.vertices.push( dst.clone() );
	    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

	    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

	    return axis;
	},
	_buildMainAxes: function( length) {

		if (axes.mainAxesInstance) 
			scene.remove(axes.mainAxesInstance);

		axes.mainAxesInstance = new THREE.Object3D();

		length = length ? length : 1000;

		var nullPoint = new THREE.Vector3( 0, 0, 0 );

	    axes.mainAxesInstance.add( axes._buildOneAxe( nullPoint, new THREE.Vector3( length, 0, 0 ), axes.x.color ) ); // +X
	    axes.mainAxesInstance.add( axes._buildOneAxe( nullPoint, new THREE.Vector3( -length, 0, 0 ), axes.x.color ) ); // -X

	    axes.mainAxesInstance.add( axes._buildOneAxe( nullPoint, new THREE.Vector3( 0, length, 0 ), axes.y.color ) ); // +Y
	    axes.mainAxesInstance.add( axes._buildOneAxe( nullPoint, new THREE.Vector3( 0, -length, 0 ), axes.y.color ) ); // -Y

	    axes.mainAxesInstance.add( axes._buildOneAxe( nullPoint, new THREE.Vector3( 0, 0, length ), axes.z.color ) ); // +Z
	    axes.mainAxesInstance.add( axes._buildOneAxe( nullPoint, new THREE.Vector3( 0, 0, -length ), axes.z.color ) ); // -Z

	    scene.add( axes.mainAxesInstance );
	},
	_buildHelperAxes: function(length, step) {
		
		if (axes.subAxesInstance) 
			scene.remove(axes.subAxesInstance);

		axes.subAxesInstance = new THREE.Object3D();

		length = length ? length : 200;
		step = step ? step : 25;

		var color = 0x868686;

		for (var i = -length; i <= length; i = i + step) {
			if (i !== 0) {
				// plane P, Z and X change
				axes.subAxesInstance.add( axes._buildOneAxe( new THREE.Vector3( -length, i, 0 ), new THREE.Vector3( length, i, 0 ), color, 1 ) );
				axes.subAxesInstance.add( axes._buildOneAxe( new THREE.Vector3( i, -length, 0 ), new THREE.Vector3( i, length, 0 ), color, 1 ) );

				// plane F - Z and Y change
				axes.subAxesInstance.add( axes._buildOneAxe( new THREE.Vector3( 0, i, -length ), new THREE.Vector3( 0, i, length ), color, 1) );
				axes.subAxesInstance.add( axes._buildOneAxe( new THREE.Vector3( 0, -length, i ), new THREE.Vector3( 0, length, i), color, 1) );

				// plane H - X and Y change
				axes.subAxesInstance.add( axes._buildOneAxe( new THREE.Vector3( i, 0, -length ), new THREE.Vector3( i, 0, length ), color, 1) );
				axes.subAxesInstance.add( axes._buildOneAxe( new THREE.Vector3( -length, 0, i ), new THREE.Vector3( length, 0, i), color, 1) );
			}
		}
		scene.add( axes.subAxesInstance );
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

	// $('#ax, #bx').next().

	// $.each(inputs,function(key, input){

	// });
	// var d = document.getElementById( 'ax' );
	// var init = new Powerange(d, { 
	// 	min: 1, 
	// 	max: 256, 
	// 	hideRange : true,
	// });

	// console.log(inputs);

});
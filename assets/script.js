// А(90;75;10) and B(30;50;45).

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
		z: 10,
		y: 75
	},
	b: {
		x: 30,
		z: 45,
		y: 50
	},
	instanceA: false,
	instanceB: false,
	build: function() {
		if (dots.instanceA) scene.remove(dots.instanceA);
		if (dots.instanceB) scene.remove(dots.instanceB);

		var geometry = new THREE.SphereGeometry( 0.75, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0x19718A } );

		dots.instanceA = new THREE.Mesh( geometry, material );
		dots.instanceA.position.set( dots.a.x, dots.a.y, dots.a.z);
		dots.instanceB = dots.instanceA.clone();
		dots.instanceA.position.set( dots.b.x, dots.b.y, dots.b.z);

		scene.add( dots.instanceA );
		scene.add( dots.instanceB );
	},
};

var line = {
	lineInstance: false,
	vectorInstance: false,
	build: function() {
		if (line.lineInstance)
			scene.remove(line.lineInstance);
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
	mainAxesInstance: false,
	subAxesInstance: false,
	build: function() {
		axes._buildMain();
		axes._buildSub();
	},
	_getOne: function( src, dst, colorHex, sub) {
		var geom = new THREE.Geometry();
		var mat = new THREE.LineBasicMaterial({ linewidth: (sub ? 1 : 2), color: colorHex });

		geom.vertices.push( src.clone() );
		geom.vertices.push( dst.clone() );
	    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

	    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

	    return axis;
	},
	_buildMain: function( length) {

		if (axes.mainAxesInstance) 
			scene.remove(axes.mainAxesInstance);

		axes.mainAxesInstance = new THREE.Object3D();

		length = length ? length : 1000;

		var nullPoint = new THREE.Vector3( 0, 0, 0 );

	    axes.mainAxesInstance.add( axes._getOne( nullPoint, new THREE.Vector3( length, 0, 0 ), axes.x.color ) ); // +X
	    axes.mainAxesInstance.add( axes._getOne( nullPoint, new THREE.Vector3( -length, 0, 0 ), axes.x.color ) ); // -X

	    axes.mainAxesInstance.add( axes._getOne( nullPoint, new THREE.Vector3( 0, length, 0 ), axes.y.color ) ); // +Y
	    axes.mainAxesInstance.add( axes._getOne( nullPoint, new THREE.Vector3( 0, -length, 0 ), axes.y.color ) ); // -Y

	    axes.mainAxesInstance.add( axes._getOne( nullPoint, new THREE.Vector3( 0, 0, length ), axes.z.color ) ); // +Z
	    axes.mainAxesInstance.add( axes._getOne( nullPoint, new THREE.Vector3( 0, 0, -length ), axes.z.color ) ); // -Z

	    scene.add( axes.mainAxesInstance );
	},
	_buildSub: function(length, step) {
		
		if (axes.subAxesInstance) 
			scene.remove(axes.subAxesInstance);

		axes.subAxesInstance = new THREE.Object3D();

		length = length ? length : 140;
		step = step ? step : 20;

		var color = 0x868686;

		for (var i = -length; i <= length; i = i + step) {
			if (i !== 0) {
				// plane P, Z and X change
				axes.subAxesInstance.add( axes._getOne( new THREE.Vector3( -length, i, 0 ), new THREE.Vector3( length, i, 0 ), color, 1 ) );
				axes.subAxesInstance.add( axes._getOne( new THREE.Vector3( i, -length, 0 ), new THREE.Vector3( i, length, 0 ), color, 1 ) );

				// plane F - Z and Y change
				axes.subAxesInstance.add( axes._getOne( new THREE.Vector3( 0, i, -length ), new THREE.Vector3( 0, i, length ), color, 1) );
				axes.subAxesInstance.add( axes._getOne( new THREE.Vector3( 0, -length, i ), new THREE.Vector3( 0, length, i), color, 1) );

				// plane H - X and Y change
				axes.subAxesInstance.add( axes._getOne( new THREE.Vector3( i, 0, -length ), new THREE.Vector3( i, 0, length ), color, 1) );
				axes.subAxesInstance.add( axes._getOne( new THREE.Vector3( -length, 0, i ), new THREE.Vector3( length, 0, i), color, 1) );
			}
		}
		scene.add( axes.subAxesInstance );
	},
	
};



$(function() {

	init();

	axes.build();
	line.build()
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
var scene, camera, controls, renderer;
var objects = [];

var init = function() {
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.5, 1000 );
	camera.position.set(175,105,175);

	controls = new THREE.OrbitControls( camera );
	if (window.chrome) {
		controls.addEventListener('change', function(){
			// console.log(camera.rotation.y * 180 / Math.PI );
			// console.log(camera.rotation.y);
			dots.rotateTexts();
		});
	}
};

var render = function() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setSize(window.innerWidth, window.innerHeight);

	THREEx.WindowResize(renderer, camera);

	document.body.appendChild(renderer.domElement);
	var r = function() {
		requestAnimationFrame(r);
		// 	cube.rotation.x += 0.1;
		// 	cube.rotation.y += 0.1;
		renderer.render(scene, camera);
	}
	r();
};

var draw = function() {
	for (var i = 0; i < Object.keys(objects).length; i++) {
		scene.add(objects[Object.keys(objects)[i]]);
	}
};

var calculate = function() {

	lines.vector.x = dots.B.x - dots.A.x;
	lines.vector.y = dots.B.y - dots.A.y;
	lines.vector.z = dots.B.z - dots.A.z;

	lines.vector.hamma = (dots.A.x - dots.B.x) / lines.vector.x;

	var hammaX = (dots.A.x * -1) / lines.vector.x;
	var hammaY = (dots.A.y * -1) / lines.vector.y;
	var hammaZ = (dots.A.z * -1) / lines.vector.z;

	dots.Af = { x: 0, y: dots.A.y, z: dots.A.z };
	dots.Ah = { x: dots.A.x, y: 0, z: dots.A.z };
	dots.Ap = { x: dots.A.x, y: dots.A.y, z: 0 };

	dots.Bf = { x: 0, y: dots.B.y, z: dots.B.z };
	dots.Bh = { x: dots.B.x, y: 0, z: dots.B.z };
	dots.Bp = { x: dots.B.x, y: dots.B.y, z: 0 };

	dots.Ax = { x: dots.A.x, y: 0, z: 0 };
	dots.Ay = { x: 0, y: dots.A.y, z: 0 };
	dots.Az = { x: 0, y: 0, z: dots.A.z };
	dots.Bx = { x: dots.B.x, y: 0, z: 0 };
	dots.By = { x: 0, y: dots.B.y, z: 0 };
	dots.Bz = { x: 0, y: 0, z: dots.B.z };

	dots.F = { x : 0, y : dots.A.y + lines.vector.y * hammaX, z : dots.A.z + lines.vector.z * hammaX };
	dots.H = { x : dots.A.x + lines.vector.x * hammaY, y : 0, z : dots.A.z + lines.vector.z * hammaY };
	dots.P = { x : dots.A.x + lines.vector.x * hammaZ, y : dots.A.y + lines.vector.y * hammaZ, z : 0 };

	dots.pF = { x: 0, y: dots.F.y, z: 0 };
	dots.hF = { x: 0, y: 0, z: dots.F.z };
	dots.pH = { x: dots.H.x, y: 0, z: 0 };
	dots.fH = { x: 0, y: 0, z: dots.H.z };
	dots.hP = { x: dots.P.x, y: 0, z: 0 };
	dots.fP = { x: 0, y: dots.P.y, z: 0 };
};


$(function() {

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	init();

	calculate();

	dots.build();
	axes.build();
	lines.build();
	
	draw();
	render();
	
	$('#controls')
		.mouseenter(function() {
			controls.enabled = false;
			controls.rotate = false;
		})
		.mouseleave(function() {
			controls.enabled = true;
			controls.rotate = true;

			$('.label').removeClass('active');
			$('.controls').hide();		
		});

	$('#controls .controls-inner .label').click(function(){

		$('.label').removeClass('active');
		$('.controls').hide();		
		
		$(this).addClass('active');
		$('.' + $(this).data('class')).show();
	});

	$('ul#visibility li input').click(function(){
		var $self = $(this);
		if ((obj = $self.parent().data('object'))!= '') {
			$.each(obj.split(','),function(kk,vv){
				objects[vv].visible = $self.is(':checked');
			});
		}	
	});

	$('span.label').click(function(){
		console.log('sdf');
		ga('send', 'event', 'User', 'Click', 'Label', $(this).data('class'));
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
				.on('slide',function(){
					var id = $(this).attr('id');
					eval('dots.' + id.substr(0,1) + '.' + id.substr(1,1) + ' = ' + $(this).val() + ';');

					$('#' + id + '-value').text(parseInt($(this).val()));

					calculate();
					
					dots.build();
					lines.build();
				});
			}
		});		
	});

});
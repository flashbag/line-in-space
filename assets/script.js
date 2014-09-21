if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var scene, camera, controls, renderer;

var init = function() {
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.5, 1000 );
	camera.position.set(175,105,175);

	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', function(){
		console.log(camera.rotation.y * 180 / Math.PI );
		console.log(camera.rotation.y);
		dots.rotateDotsTexts();
	});
};

var render = function() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xd9d9d9 );
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

var draw = function(objectName) {
	var object = eval(objectName);
	for (var property in object) {
	    if (object.hasOwnProperty(property) && !property.indexOf('_obj_')) {
    		var instance = eval(objectName + '.' + property);
        	scene.add(instance);
	    }
	}
};

var processor = {
	calculateLineVector: function() {
		lines.vector.x = dots.b.x - dots.a.x;
		lines.vector.y = dots.b.y - dots.a.y;
		lines.vector.z = dots.b.z - dots.a.z;

		lines.vector.hamma = (dots.a.x - dots.b.x) / lines.vector.x;
	},
	calculateTraces: function() {
		var hammaX = (dots.a.x * -1) / lines.vector.x;
		var hammaY = (dots.a.y * -1) / lines.vector.y;
		var hammaZ = (dots.a.z * -1) / lines.vector.z;

		dots.Ft = {
			x : 0,
			y : dots.a.y + lines.vector.y * hammaX,
			z : dots.a.z + lines.vector.z * hammaX
		}

		dots.Ht = {
			x : dots.a.x + lines.vector.x * hammaY,
			y : 0,
			z : dots.a.z + lines.vector.z * hammaY
		}

		dots.Pt = {
			x : dots.a.x + lines.vector.x * hammaZ,
			y : dots.a.y + lines.vector.y * hammaZ,
			z : 0
		}

		dots.pF = { x: 0, y: dots.Ft.y, z: 0 };
		dots.hF = { x: 0, y: 0, z: dots.Ft.z };
		dots.pH = { x: dots.Ht.x, y: 0, z: 0 };
		dots.fH = { x: 0, y: 0, z: dots.Ht.z };
		dots.hP = { x: dots.Pt.x, y: 0, z: 0 };
		dots.fP = { x: 0, y: dots.Pt.y, z: 0 };
	}
}

$(function() {

	init();

	axes.build();
	lines.build();
	dots.build();

	draw('axes');
	draw('dots');
	draw('lines');

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

					lines.build();
					dots.build();
				});
			}
		});		
	});

});
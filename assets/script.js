// А(90;75;10) and B(30;50;45).
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
	}
};

var axes = {
	x: {
		color: "#f00"
	},
	y: {
		color: "#0f0"
	},
	z: {
		color: "#00f"
	}
};

$(function() {

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
					'min': [  1 ],
					'max': [ 100 ]
				}
			}).Link('lower').to($(id + '-value'), null,wNumb({
				// Prefix the value with an Euro symbol
				prefix: '',
				// Write the value without decimals
				decimals: 0,
				postfix: ''
			}));
			// $(id + '-value').html($(id).val());
			console.log($(id + '-value'));
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




var dots = { 
	A: {
		x: 90,
		y: 75,
		z: 10
	},
	B: {
		x: 30,
		y: 50,
		z: 45
	},
	build: function() {
		dots._drawDots( ['A', 'B'], 1.5, 0x19718A);
		dots._drawDots( ['F', 'H', 'P'], 1.2, 0xEE0000);
		
		dots._drawDots( ['Ax','Ay','Az','Bx','By','Bz'], 0.5, 0xEE0000);
		dots._drawDots( ['Af','Ap','Ah','Bf','Bp','Bh'], 0.5, 0xEE0000);

		dots._drawDots( ['pF','hF','pH','fH','hP','fP'], 0.5, 0xEE0000);
		dots._drawDots( ['pF', 'hF', 'pH', 'fH', 'hP', 'fP'], 1, 0x00AA00);

		dots._drawDotsText( ['A', 'B'], 7, 0x000000);
		dots._drawDotsText( ['F', 'H', 'P'], 5, 0x444444);
		dots._drawDotsText( ['pF', 'hF', 'pH', 'fH', 'hP', 'fP'], 4, 0x444444);
	},
	_drawDots: function(array, radius, color) {
		for (var i = 0; i < array.length; i++) {
			var geometry = new THREE.SphereGeometry( radius, 15, 15 );
			var mesh = new THREE.MeshBasicMaterial( { color: color } );

		    objects[array[i]]  = objects[array[i]] || new THREE.Mesh( geometry, mesh);
		    objects[array[i]].position.set( dots[array[i]].x, dots[array[i]].y, dots[array[i]].z ); 
		}
	},
	_drawDotsText: function(array, size, color) {
		var material = new THREE.MeshBasicMaterial( { color: (color ? color: 0x000000) } );
		
		for (var i = 0; i < array.length; i++) {    

			var geometry = new THREE.TextGeometry(array[i], { size : size, height : 0.3 });
			
		    dots[array[i] + 'tg']  = dots[array[i] + 'tg'] || geometry;

			dots[array[i] + 'tg'].computeBoundingBox();	    
	    	dots[array[i] + 'tg'].textWidth = dots[array[i] + 'tg'].boundingBox.max.x - dots[array[i] + 'tg'].boundingBox.min.x;
	    	dots[array[i] + 'tg'].textHeight = dots[array[i] + 'tg'].boundingBox.max.y - dots[array[i] + 'tg'].boundingBox.min.y;

		    objects[array[i] + 'text']  = objects[array[i] + 'text'] || new THREE.Mesh( dots[array[i] + 'tg'], material );
		    objects[array[i] + 'text'].rotation.y = (camera.rotation.y * 180 / Math.PI) * Math.PI / 180;

		    objects[array[i] + 'text'].position.set(
		    	dots[array[i]].x - (dots[array[i] + 'tg'].textWidth / 2),
		    	dots[array[i]].y + (dots[array[i] + 'tg'].textHeight / 3),
		    	dots[array[i]].z
		    )
		    objects[array[i] + 'text'].geometry.verticesNeedUpdate = true;
		}
	},
	rotateTexts: function() {
		var array = [
			'A', 'B',
			'F', 'H', 'P',
			'pF', 'hF', 'pH', 'fH', 'hP', 'fP'
		];

		for (var i = 0; i < array.length; i++)
		    objects[array[i] + 'text'].rotation.y = camera.rotation.y;
	},
	
};
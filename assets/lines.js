var lines = {
	vector: {},
	build: function() {

		lines._drawLine(0x19718A, 4, ['A','B']);
		lines._drawLine(0x19718A, 1.5, [['A','F'], ['A','H'], ['A','P']]);
		lines._drawLine(0x000000, 1.2, [
			['A','Af'], ['A','Ap'], ['A','Ah'], ['B','Bf'], ['B','Bp'], ['B','Bh']
		]);
		lines._drawLine(0x000000, 1, [ 
			['Af','Ay'], ['Af','Az'], ['Ap','Ay'], ['Ap','Ax'], ['Ah','Ax'], ['Ah','Az'],
			['Bf','By'], ['Bf','Bz'], ['Bp','By'], ['Bp','Bx'], ['Bh','Bx'], ['Bh','Bz'],
			['H','pH'], ['H','fH'], ['P','fP'], ['P','hP'], ['F','pF'], ['F','hF']
		]);

		lines._drawLine(0x19718A, 2, [ 
			['Af','Bf'], ['Ap','Bp'], ['Ah','Bh'],
			['H','hP'], ['H','hF'], ['F','fP'], ['F','fH'], ['P','pF'], ['P','pH']
		]);

	},
	_drawLine: function(color, width, array) {
		for (i = 0; i < array.length; i++) {
			if (array[i] instanceof Array && array[i].length == 2) {
				lines._makeLine(array[i],width,color);
			} else {
				lines._makeLine(array,width,color);
			}
		}
	},
	_makeLine: function(dotsArray, width, color) {
		
		var geometry = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial({ color: color, linewidth: width });

		geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ));

		var key = dotsArray.join('');

		objects[key] = objects[key] || new THREE.Line( geometry, material );

		for( j = 0; j < dotsArray.length; j++) {
			objects[key].geometry.vertices[j].x = dots[dotsArray[j]].x;
			objects[key].geometry.vertices[j].y = dots[dotsArray[j]].y;
			objects[key].geometry.vertices[j].z = dots[dotsArray[j]].z;	
		}

		objects[key].geometry.verticesNeedUpdate = true;
	}
}
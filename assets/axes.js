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

		objects['mainAxes'] = new THREE.Object3D();
		
	    objects['mainAxes'].add( axes._createSingleAxe( nullPoint, new THREE.Vector3( length, 0, 0 ), axes.x.color ) ); // +X
	    objects['mainAxes'].add( axes._createSingleAxe( nullPoint, new THREE.Vector3( -length, 0, 0 ), axes.x.color ) ); // -X

	    objects['mainAxes'].add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, length, 0 ), axes.y.color ) ); // +Y
	    objects['mainAxes'].add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, -length, 0 ), axes.y.color ) ); // -Y

	    objects['mainAxes'].add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, 0, length ), axes.z.color ) ); // +Z
	    objects['mainAxes'].add( axes._createSingleAxe( nullPoint, new THREE.Vector3( 0, 0, -length ), axes.z.color ) ); // -Z

	},
	_createHelperAxes: function(length, step) {
		
		var step =  25,
			length = 200,
			color = 0x868686;

		objects['helperAxes'] =  new THREE.Object3D();

		for (var i = -length; i <= length; i = i + step) {
			if (i !== 0) {
				// plane P, Z and X change
				objects['helperAxes'].add( axes._createSingleAxe( new THREE.Vector3( -length, i, 0 ), new THREE.Vector3( length, i, 0 ), color, 1 ) );
				objects['helperAxes'].add( axes._createSingleAxe( new THREE.Vector3( i, -length, 0 ), new THREE.Vector3( i, length, 0 ), color, 1 ) );
				// plane F - Z and Y change
				objects['helperAxes'].add( axes._createSingleAxe( new THREE.Vector3( 0, i, -length ), new THREE.Vector3( 0, i, length ), color, 1) );
				objects['helperAxes'].add( axes._createSingleAxe( new THREE.Vector3( 0, -length, i ), new THREE.Vector3( 0, length, i), color, 1) );
				// plane H - X and Y change
				objects['helperAxes'].add( axes._createSingleAxe( new THREE.Vector3( i, 0, -length ), new THREE.Vector3( i, 0, length ), color, 1) );
				objects['helperAxes'].add( axes._createSingleAxe( new THREE.Vector3( -length, 0, i ), new THREE.Vector3( length, 0, i), color, 1) );
			}
		}
	},	
};
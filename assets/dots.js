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
	build: function() {
		dots._createMainDots();
		dots._createLineTraces();
		dots._createDotsPlanesProjections();
		dots._createTraces2AxesProjectionsDots();
		dots._createDotsTexts();
	},
	_createMainDots: function() {

		var geometry = new THREE.SphereGeometry( 1.5, 15, 15 );
		var material = new THREE.MeshBasicMaterial( { color: 0x19718A } );

		dots._obj_Ad = dots._obj_Ad || new THREE.Mesh( geometry, material );
		dots._obj_Bd = dots._obj_Bd || new THREE.Mesh( geometry, material );

		dots._obj_Ad.position.set( dots.a.x, dots.a.y, dots.a.z);
		dots._obj_Bd.position.set( dots.b.x, dots.b.y, dots.b.z);
	},
	_createLineTraces: function() {

		var geometry = new THREE.SphereGeometry( 1.2, 15, 15 );
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

		var dotsArray = [
			'Af','Ap','Ah',
			'Bf','Bp','Bh',

			'Ax','Ay','Az',
			'Bx','By','Bz',
			];

		for (var i = 0; i < dotsArray.length; i++) {
		    // alert(dotsArray[i]);
		    dots['_obj_' + dotsArray[i]]  = dots['_obj_' + dotsArray[i]] || new THREE.Mesh( geometry, material );
		    //Do something
		    console.log(dots['_obj_' + dotsArray[i]]);

		}
		console.log(dots);

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
		var material = new THREE.MeshBasicMaterial( { color: 0x00AA00 } );

		dots._obj_FtY = dots._obj_FtY || new THREE.Mesh( geometry, material );
		dots._obj_FtZ = dots._obj_FtZ || new THREE.Mesh( geometry, material );

		dots._obj_HtX = dots._obj_HtX || new THREE.Mesh( geometry, material );
		dots._obj_HtZ = dots._obj_HtZ || new THREE.Mesh( geometry, material );

		dots._obj_PtY = dots._obj_PtY || new THREE.Mesh( geometry, material );
		dots._obj_PtZ = dots._obj_PtZ || new THREE.Mesh( geometry, material );

		dots._obj_FtY.position.set( dots.pF.x, dots.pF.y, dots.pF.z );
		dots._obj_FtZ.position.set( dots.hF.x, dots.hF.y, dots.hF.z );
		dots._obj_HtX.position.set( dots.pH.x, dots.pH.y, dots.pH.z );
		dots._obj_HtZ.position.set( dots.fH.x, dots.fH.y, dots.fH.z );
		dots._obj_PtY.position.set( dots.hP.x, dots.hP.y, dots.hP.z );
		dots._obj_PtZ.position.set( dots.fP.x, dots.fP.y, dots.fP.z);
		
	},
	__generateDotTextGeometry: function(text,size) {

		var geometry = new THREE.TextGeometry(text, { size : (size ? size : 5), height : 0.3 });
		
	    // Do some optional calculations. This is only if you need to get the
	    // width of the generated text
	    geometry.computeBoundingBox();
	    
	    geometry.textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
	    geometry.textHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

	    return geometry;
	},
	__generateDotMesh: function(geometry, dot, color) {

		// var material = new THREE.MeshPhongMaterial();
		var material = new THREE.MeshBasicMaterial( { color: (color ? color: 0x000000) } );
		var mesh = new THREE.Mesh( geometry, material );

	    mesh.rotation.y = (camera.rotation.y * 180 / Math.PI) * Math.PI / 180;
	    console.log(mesh.rotation.y);
	    
		return mesh;
	},
	_setDotTextPosition: function(dot,mesh, geometry) {
		mesh.position.set(
				dot.x - (geometry.textWidth /2),
				dot.y + (geometry.textHeight /3),
				dot.z + (geometry.textWidth /2)
			);
		mesh.geometry.verticesNeedUpdate = true;
	},
	_createDotsTexts: function() {

		// Generating dots texts geometries
		dots.Atext_geometry = dots.Atext_geometry || dots.__generateDotTextGeometry('A',7);
		dots.Btext_geometry = dots.Btext_geometry || dots.__generateDotTextGeometry('B',7);
		dots.Fttext_geometry = dots.Fttext_geometry || dots.__generateDotTextGeometry('F');
		dots.Httext_geometry = dots.Httext_geometry || dots.__generateDotTextGeometry('H');
		dots.Pttext_geometry = dots.Pttext_geometry || dots.__generateDotTextGeometry('P');

		dots.pFtext_geometry = dots.pFtext_geometry || dots.__generateDotTextGeometry('pF',4);
		dots.hFtext_geometry = dots.hFtext_geometry || dots.__generateDotTextGeometry('hF',4);
		dots.pHtext_geometry = dots.pHtext_geometry || dots.__generateDotTextGeometry('pH',4);

		dots.fHtext_geometry = dots.fHtext_geometry || dots.__generateDotTextGeometry('fH',4);
		dots.hPtext_geometry = dots.hPtext_geometry || dots.__generateDotTextGeometry('hP',4);
		dots.fPtext_geometry = dots.fPtext_geometry || dots.__generateDotTextGeometry('fP',4);

		// Generating dots texts meshes
		dots._obj_Atext = dots._obj_Atext || dots.__generateDotMesh(dots.Atext_geometry,dots.a);
		dots._obj_Btext = dots._obj_Btext || dots.__generateDotMesh(dots.Btext_geometry,dots.b);
		dots._obj_Fttext = dots._obj_Fttext || dots.__generateDotMesh(dots.Fttext_geometry,dots.Ft, 0x444444);
		dots._obj_Httext = dots._obj_Httext || dots.__generateDotMesh(dots.Httext_geometry,dots.Ht, 0x444444);
		dots._obj_Pttext = dots._obj_Pttext || dots.__generateDotMesh(dots.Pttext_geometry,dots.Pt, 0x444444);

		dots._obj_pFtext = dots._obj_pFtext || dots.__generateDotMesh(dots.pFtext_geometry,dots.pF, 0x444444);
		dots._obj_hFtext = dots._obj_hFtext || dots.__generateDotMesh(dots.hFtext_geometry,dots.hF, 0x444444);
		dots._obj_pHtext = dots._obj_pHtext || dots.__generateDotMesh(dots.pHtext_geometry,dots.pH, 0x444444);
		dots._obj_fHtext = dots._obj_fHtext || dots.__generateDotMesh(dots.fHtext_geometry,dots.fH, 0x444444);
		dots._obj_hPtext = dots._obj_hPtext || dots.__generateDotMesh(dots.hPtext_geometry,dots.hP, 0x444444);
		dots._obj_fPtext = dots._obj_fPtext || dots.__generateDotMesh(dots.fPtext_geometry,dots.fP, 0x444444);

		// Setting dots texts meshes positions
		dots._setDotTextPosition(dots.a,dots._obj_Atext, dots.Atext_geometry);
		dots._setDotTextPosition(dots.b,dots._obj_Btext, dots.Btext_geometry);
		dots._setDotTextPosition(dots.Ft,dots._obj_Fttext, dots.Fttext_geometry);
		dots._setDotTextPosition(dots.Ht,dots._obj_Httext, dots.Httext_geometry);
		dots._setDotTextPosition(dots.Pt,dots._obj_Pttext, dots.Pttext_geometry);

		dots._setDotTextPosition(dots.pF,dots._obj_pFtext, dots.pFtext_geometry);
		dots._setDotTextPosition(dots.pF,dots._obj_pFtext, dots.pFtext_geometry);
		dots._setDotTextPosition(dots.hF,dots._obj_hFtext, dots.hFtext_geometry);
		dots._setDotTextPosition(dots.pH,dots._obj_pHtext, dots.pHtext_geometry);
		dots._setDotTextPosition(dots.fH,dots._obj_fHtext, dots.fHtext_geometry);
		dots._setDotTextPosition(dots.hP,dots._obj_hPtext, dots.hPtext_geometry);
		dots._setDotTextPosition(dots.fP,dots._obj_fPtext, dots.fPtext_geometry);
	}
};
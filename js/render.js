var imageCapt;

function recalcBump() {
	meshTerre.material.bumpScale=bump*3;
	meshTerre.material.needsUpdate=true;
}

function render()
{
	if (anag) {render3DAna();return false;}

	var ratio=hGL/lGL;
	camera.left=taille/-2;
	camera.right=taille/2;
	camera.top=taille/2*ratio;
	camera.bottom=taille/-2*ratio;
	camera.updateProjectionMatrix (true);


	var p1=calcsph(latitude,longitude+90);
	var p2=sphcart(p1);
		
	var x=p2.y*dCamera;
	var y=p2.z*dCamera;
	var z=p2.x*dCamera;
	camera.position.set(x,y,z);
	
	var d=dLampe;
	x=p2.y*d;
	y=p2.z*d;
	z=p2.x*d;
	
	var angle=-(longitude+320)/180*Math.PI;
	var x=-Math.cos (angle);
	var y=Math.sin (angle);
	
	lumiere.position.set (y,0,x);
	
	camera.lookAt(meshTerre.position);
	
	renderer.setViewport( 0, 0, lGL, hGL);
	renderer.setScissor( 0, 0, lGL, hGL);
	renderer.setClearColor( 0x000000, 1);
	renderer.clear();
    renderer.render( scene, camera );
		
	if (modeCoupe==1) {
		if (!bouge) {
			render3D();
		}
		else
		{
			if (coupe3DFaite) {ecranCoupeBougeGlobe("...","...");}
		}
	}
	
	ctGlobe.clearRect (0,0,lGL,hGL);
	if (stadeCoupe>0)
	{
		afficheSurGlobe ("A",lat1c,long1c);
	}
	if (stadeCoupe>1)
	{
		afficheSurGlobe ("B",lat2c,long2c);
	}
}

function render3D(capt) {
	if (!coupe3DFaite) {return false;}
	if (anag) {render3DAna(capt);return false;}
	effaceCoupe3D();
	renderer.setViewport( lGL, 0, lGL, hGL);
	renderer.setScissor( lGL, 0, lGL, hGL);
	renderer.setClearColor( 0xffffff, 1);
	renderer.clear();
    renderer.render( scene3D, camera3D );
	if (capt==true) {imageCapt = renderer.domElement.toDataURL('image/jpeg');}
}

function render3DAna(capt) {
	effaceCoupe3D();
	renderer.setViewport(0, 0, lGL*2, hGL);
	renderer.setScissor( 0, 0, lGL*2, hGL);
	renderer.setClearColor( 0x000000, 1);
	renderer.clear();
	renderer.setScissorTest( true );
	effect.render( scene3D, camera3D );
	if (capt==true) {imageCapt = renderer.domElement.toDataURL('image/jpeg');}
}

function deplaceCube(lecube,latcube,longcube)
{
	//console.log ('deplace cube');
	var angleRotLat=latitude*Math.PI/180;
	var angleRotLong=-longitude*Math.PI/180;
	var p1=calcsph(latcube,longcube+90);
	var p2=sphcart(p1);
	
	var x=p2.y*rTerre;
	var y=p2.z*rTerre;
	var z=p2.x*rTerre;
	lecube.position.set(x,y,z);
}
	
function effaceBoules()
{
	cube1.position.set(0,0,0);
	cube2.position.set(0,0,0);
	sphereMarqueur.position.set(0,0,0);
}

function redimBoules ()
{
	// redim des spheres
	var ech=taille/1000;
	sphereMarqueur.scale.x=ech;
	sphereMarqueur.scale.y=ech;
	sphereMarqueur.scale.z=ech;
	cube1.scale.x=ech;
	cube1.scale.y=ech;
	cube1.scale.z=ech;
	cube2.scale.x=ech;
	cube2.scale.y=ech;
	cube2.scale.z=ech;
}


function bougeLettres () {
	// bouge lettres
	var a1=tricot.rotation.z;
	var a2=tricot.rotation.x;
	var pta={x:-1,y:1,z:0};
	var ptb=rotateZ(pta,a1);
	var ptz=rotateX(ptb,a2);
	var d=lTricot/2*1.05;
	lettreA.position.set (ptz.x*d,ptz.y*d,ptz.z*d);
	
	var pta={x:-1,y:-1,z:0};
	var ptb=rotateZ(pta,a1);
	var ptz=rotateX(ptb,a2);
	lettreB.position.set (ptz.x*d,ptz.y*d,ptz.z*d);
}

function bougeCoupe3D(mousex,mousey)
{
	if (!bouge3D) {return false;}
	
	var dx=(mousex-xMD3D)/lGL;
	var dy=(mousey-yMD3D)/lGL;
	
	// bouge tricot
	tricot.rotation.x+=dy*hGL/200;
	tricot.rotation.z+=dx*hGL/200;
	
	xMD3D=mousex;
	yMD3D=mousey;
	
	bougeLettres();
	
	render();
}

function recalcTricot(modeRecalcTricot)
{
	if (modeRecalcTricot=="coupe")
	{
		tricot.rotation.x=-Math.PI/3;
	}
	//wpBD
	var wptr=new Array();
	var lMaille=lTricot/nbwp;
	var n,x,y,z,icol,ilig,alti;
	var i,j,k,nn;
	var l,pta,ptb,bearing,ptx,pwp;
	var ch,cs,cl;
	for (icol=0;icol<nbwp;icol++) {
		// calcul du grand cercle n°icol
		ptb=wpDC[icol];
		pta=wpgc[nbwp-icol-1];
		l=dgrand_cercle(pta,ptb);
		bearing=cap(pta,ptb);
		ptx={};
		pwp={};
		ptx=pta;
		wptr[0]=ptx;
		wptr[nbwp-1]=ptb;
		for (i=1;i<(nbwp-1);i++)
		{
			bearing=cap(ptx,ptb); // radians			
			pwp=wp (ptx,bearing,l/(nbwp-1));
			ptx=pwp;
			wptr[i]=ptx;
		}
		//fin calcul grand cercle
		
		// relief surface
		for (ilig=0;ilig<nbwp;ilig++) {
			n=icol+ilig*nbwp;
			alti=altitude(wptr[ilig].lati,wptr[ilig].longi);
			z=alti*lTricot/l*zexag;
			tricot.geometry.vertices[n].z=z;
			if ((ilig<(nbwp-1))&&(icol<(nbwp-1))&&(modeRecalcTricot=="coupe")) {
				//coloration des faces
				nn=(ilig+icol*(nbwp-1))*2;
				var ch=0.55;
				var cl=(alti+6000)/10000;
				if (cl<0) {cl=0;}
				if (cl>1) {cl=1;}
				var cs=0.5-cl/2;
				tricot.geometry.faces[nn].vertexColors[0].setHSL( ch, cs, cl );
				tricot.geometry.faces[nn].vertexColors[1].setHSL( ch, cs, cl );
				tricot.geometry.faces[nn].vertexColors[2].setHSL( ch, cs, cl );
				tricot.geometry.faces[nn+1].vertexColors[0].setHSL( ch, cs, cl );
				tricot.geometry.faces[nn+1].vertexColors[1].setHSL( ch, cs, cl );
				tricot.geometry.faces[nn+1].vertexColors[2].setHSL( ch, cs, cl );
			}
		}
				
		// relief racine
		var flou=1;
		for (ilig=0;ilig<nbwp;ilig++) {
			n=icol+ilig*nbwp+nbwp*nbwp;
			lati=wptr[ilig].lati;
			longi=wptr[ilig].longi;
			alti=-profmoho(lati,longi)*1000;
			if (fondPlat) {alti=altiFondPlat;}
			z=alti*lTricot/l*zexag;
			tricot.geometry.vertices[n].z=z;
		}
	}
	tricot.geometry.computeFaceNormals();
	tricot.geometry.computeVertexNormals();  
	tricot.geometry.verticesNeedUpdate = true;
	tricot.geometry.normalsNeedUpdate = true;
	
	if (modeRecalcTricot=="coupe") {tricot.geometry.colorsNeedUpdate = true;}
	tricot.geometry.normalsNeedUpdate=true;
	if (anag) {
		cibleRacine.position.set(tricot.position.x,tricot.position.y-zexag*15000,tricot.position.z);
	}
	else {
		cibleRacine.position.set(tricot.position.x,tricot.position.y-zexag*20000,tricot.position.z);
	}
	camera3D.lookAt(cibleRacine.position);	
	if (modeRecalcTricot=="coupe") {tricot.rotation.z=-bearing-3*Math.PI/2;}
	
	bougeLettres ()
	mode2="coupe3d";
	coupeFaite=true;
	traceBarreMenu (); //pour activer l'exportation
	render();
}

function changeResol (n) {
	nbwp=n;
	scene3D.remove(tricot);
	scene.remove(ligne);
	creeTricot();
	creeLigne();
	stadeCoupe=0;
	coupeFaite=false;
	coupe3DFaite=false;
	effaceBoules();
	mode2="consignes";
	afficheConsignes();
	render();
}
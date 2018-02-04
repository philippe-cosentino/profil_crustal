function init_scene(){
    // on initialise le moteur de rendu
	renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1, antialias:true} );
	
	effect = new THREE.AnaglyphEffect( renderer );
	effect.setSize( lGL*2, hGL);
	
	//renderer.shadowMapEnabled = true;
	renderer.autoClear=false;
	renderer.setScissorTest ( true );

    renderer.setSize( lGL*2, hGL);
    document.getElementById('divgl').appendChild(renderer.domElement);
	
    // on initialise la scène
    scene = new THREE.Scene();
	
	var ratio=hGL/lGL;

    // on initialise la camera que l’on place ensuite sur la scène
	camera = new THREE.OrthographicCamera( taille / - 2, taille / 2, taille / 2*ratio, taille / - 2*ratio, 1, 20000 );
    scene.add(camera);

	
	// on rajoute un cube marqueur
	cube1 = new THREE.Mesh(new THREE.SphereGeometry( 10, 32,32 ), new THREE.MeshPhongMaterial({
        // light
        specular: '#440000',
        // intermediate
        color: '#993333',
        // dark
        emissive: '#220000',
      }));
	//cube1.overdraw = true;
	scene.add(cube1);
	cube1.position.set(0,0,0);
		
	cube2 = new THREE.Mesh(new THREE.SphereGeometry( 10, 32,32 ), new THREE.MeshPhongMaterial({
        specular: '#000044',
        color: '#333399',
        emissive: '#000022',
      }));
	//cube2.overdraw = true;
	scene.add(cube2);
	cube2.position.set(0,0,0);
	
	
	sphereMarqueur = new THREE.Mesh(new THREE.SphereGeometry( 8, 32,32 ), new THREE.MeshPhongMaterial({
        specular: '#004400',
        color: '#339933',
        emissive: '#002200',
      }));
	//sphereMarqueur.overdraw = true;
	scene.add(sphereMarqueur);
	sphereMarqueur.position.set(0,0,0);

	// add subtle ambient lighting
	var ambientLight = new THREE.AmbientLight(0x555555);
	scene.add(ambientLight);

	// directional lighting
	lumiere = new THREE.DirectionalLight(0x666666);
	lumiere.position.set (dLampe,0,0);
		  
	scene.add(lumiere);

	creeLigne();
}

function init_coupe3D(){
    // on initialise la scène
    scene3D = new THREE.Scene();
	
	var ratio=hGL/lGL;

    // on initialise la camera que l’on place ensuite sur la scène
	//camera3D = new THREE.OrthographicCamera( taille / - 2, taille / 2, taille / 2*ratio, taille / - 2*ratio, 1, 20000 );
	
	camera3D = new THREE.PerspectiveCamera( 45, 1, 1, 100000 );
	camera3D.position.set(0,0,dCamera/4);
    scene3D.add(camera3D);
	
	creeTricot();
	creeLettres();
	
	camera3D.lookAt(tricot.position);	
	
	// add subtle ambient lighting
	var ambientLight = new THREE.AmbientLight(0x111111);
	scene3D.add(ambientLight);
	
	// lumiere relief
	var lumiere3D = new THREE.DirectionalLight(0xFFAA88,3,0);
	lumiere3D.position.set (1000,500,0);
	scene3D.add(lumiere3D);
	
	// lumiere racine
	var lumiere3D = new THREE.DirectionalLight(0x88AAFF,1,0);
	lumiere3D.position.set (500,-1000,0);
	scene3D.add(lumiere3D);
	
	cibleRacine = new THREE.Mesh(new THREE.SphereGeometry( 1, 1, 1 ), new THREE.MeshPhongMaterial({
	}));
	scene3D.add(cibleRacine);
	cibleRacine.position.set(0,0,0);
	
}

function creeLigne()
{
	var materialLigne = new THREE.LineBasicMaterial({
        color: 0xff00ff,
    });
	var geometryLigne = new THREE.Geometry();
	for (var i=0;i<nbwp;i++)
	{	
		geometryLigne.vertices.push(new THREE.Vector3(0,0,0));
	}
	ligne = new THREE.Line(geometryLigne, materialLigne);
	scene.add(ligne);
	    
}

function init_planete(){
    
	// on créé la sphère et on lui applique une texture sous forme d’image
	var geometry = new THREE.SphereGeometry( rTerre, 64,64 );
	
	var texture = new THREE.Texture( imageTerre );
	texture.needsUpdate = true;
	texture.minFilter = THREE.LinearFilter;
	
	var textureBump = new THREE.Texture( imageBump );
	textureBump.needsUpdate = true;
	textureBump.minFilter = THREE.LinearFilter;
	
	
	var material2 = new THREE.MeshPhongMaterial({
		//map 
		map: texture,
		emissiveMap:texture,
		bumpMap: textureBump,
		bumpScale : bump*2,
        specular: '#999999',
        color: '#bbbbbb',
        emissive: '#888888',
        shininess: 8,
	});
	
	meshTerre = new THREE.Mesh( geometry, material2 );
	meshTerre.castShadow = false;
	//meshTerre.overdraw = true;
	meshTerre.position.set(0,0,0);
	
	scene.add( meshTerre );	

}

function creeTricot() {
	geomTricot = new THREE.Geometry(); 
		var v=new Array();
		var lMaille=lTricot/nbwp;
		var n,x,y,z,icol,ilig;
		var v1,v2,v3,v4;
		n=0;
		
		// surface
		for (icol=0;icol<nbwp;icol++) {
			for (ilig=0;ilig<nbwp;ilig++) {
				x=icol*lMaille-lTricot/2;
				y=ilig*lMaille-lTricot/2;
				z=0;
				v[n]=new THREE.Vector3(x,y,z);
				n++;
			}
		}
		
		var n0=n;
		// racine
		for (icol=0;icol<nbwp;icol++) {
			for (ilig=0;ilig<nbwp;ilig++) {
				x=icol*lMaille-lTricot/2;
				y=ilig*lMaille-lTricot/2;
				z=0;
				v[n]=new THREE.Vector3(x,y,z);
				n++;
			}
		}

		for (var i=0;i<v.length;i++)		{
			geomTricot.vertices.push(v[i]);
		}
		
		
		// faces surface
		var nbwp2=nbwp-1;
		for (icol=0;icol<nbwp2;icol++) {
			for (ilig=0;ilig<nbwp2;ilig++) {
				v1=icol+ilig*nbwp;
				v2=v1+1;
				v3=v1+nbwp;
				v4=v3+1;
				geomTricot.faces.push( new THREE.Face3( v3, v2, v1) );
				geomTricot.faces.push( new THREE.Face3( v3, v4, v2) );
			}
		}
		
		// faces racine
		for (icol=0;icol<nbwp2;icol++) {
			for (ilig=0;ilig<nbwp2;ilig++) {
				v1=icol+ilig*nbwp+n0;
				v2=v1+1;
				v3=v1+nbwp;
				v4=v3+1;
				geomTricot.faces.push( new THREE.Face3( v1, v2, v3) );
				geomTricot.faces.push( new THREE.Face3( v2, v4, v3) );
			}
		}

		// faces flancs
		ilig=0;
		for (icol=0;icol<nbwp2;icol++) {
			v1=icol;
			v2=v1+1;
			v3=v1+nbwp*nbwp;
			v4=v3+1;
			geomTricot.faces.push( new THREE.Face3( v1, v2, v3) );
			geomTricot.faces.push( new THREE.Face3( v2, v4, v3) );		
		}
		
		ilig=nbwp2;
		for (icol=0;icol<nbwp2;icol++) {
			v1=icol+ilig*nbwp;
			v2=v1+1;
			v3=v1+nbwp*nbwp;
			v4=v3+1;
			geomTricot.faces.push( new THREE.Face3( v3, v2, v1) );
			geomTricot.faces.push( new THREE.Face3( v3, v4, v2) );		
		}
		
		icol=0;
		for (ilig=0;ilig<nbwp2;ilig++) {
			v1=icol+ilig*nbwp;
			v2=v1+nbwp;
			v3=v1+nbwp*nbwp;
			v4=v3+nbwp;
			geomTricot.faces.push( new THREE.Face3( v3, v2, v1) );
			geomTricot.faces.push( new THREE.Face3( v3, v4, v2) );		
		}
		
		icol=nbwp2;
		for (ilig=0;ilig<nbwp2;ilig++) {
			v1=icol+ilig*nbwp;
			v2=v1+nbwp;
			v3=v1+nbwp*nbwp;
			v4=v3+nbwp;
			geomTricot.faces.push( new THREE.Face3( v1, v2, v3) );
			geomTricot.faces.push( new THREE.Face3( v2, v4, v3) );		
		}
		
		var materialTricot = new THREE.MeshPhongMaterial({
			shading : THREE.SmoothShading,
			vertexColors:THREE.VertexColors, 
			//side: THREE.DoubleSide,
			// light
			specular: '#ffbb99',
			// intermediate
			color: '#775544',
			shininess: 2
		});
		
		for (i=0;i<(nbwp2*nbwp2*2);i++) {
			geomTricot.faces[i].vertexColors[0]=new THREE.Color( 0x000000 );
			geomTricot.faces[i].vertexColors[1]= new THREE.Color( 0x000000 );
			geomTricot.faces[i].vertexColors[2] = new THREE.Color( 0x000000 );
		}
		
		geomTricot.computeFaceNormals();
		geomTricot.computeVertexNormals();		
		
		tricot = new THREE.Mesh( geomTricot, materialTricot );
		
		scene3D.add(tricot);
		tricot.rotation.z=-3*Math.PI/4;
		tricot.rotation.x=-Math.PI/3;
}

function creeLettres() {
	var materialLettreNoire = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		color: '#000000'
	});
	
	var v;
	var x,y,z,i;	
	var tL=50;
	
	//lettre A

	var ver=[0.0362563,-1.95237e-08,-0.446649,-0.0327438,-1.95237e-08,-0.446649,-0.325744,1.04624e-08,0.239351,-0.225744,1.04624e-08,0.239351,-0.139744,1.67637e-09,0.0383509,0.150256,1.67637e-09,0.0383509,0.241256,1.04624e-08,0.239351,0.341256,1.04624e-08,0.239351,0.00025624,-1.29669e-08,-0.296649,0.110256,-2.17023e-09,-0.0496491,-0.101744,-2.17023e-09,-0.0496491,0.137923,-9.52832e-09,-0.217983,0.23959,4.6702e-10,0.0106842,-0.13041,-9.52832e-09,-0.217983,-0.228077,4.6702e-10,0.0106842];
	var fac=[34,7,5,12,0,0,0,0,34,6,5,7,0,0,0,0,34,11,12,9,0,1,0,2,34,12,5,9,0,0,0,2,34,11,0,8,0,1,1,1,34,11,8,9,0,1,1,2,34,9,5,10,0,2,0,1,34,4,10,5,0,1,1,0,34,8,0,1,0,1,1,1,34,1,13,8,0,1,1,1,34,8,13,10,0,1,1,1,34,14,10,13,0,1,1,1,34,14,4,10,0,1,1,1,34,4,14,2,0,1,1,1,34,2,3,4,0,1,1,1];
	var geomLettreA = new THREE.Geometry(); 
	var nbVer=Math.round(ver.length/3);
	var nbFac=Math.round(fac.length/8);
	
	for (i=0;i<nbVer;i++) {
		x=ver[i*3]; y=ver[i*3+1]; z=ver[i*3+2];
		v=new THREE.Vector3(x*tL,y*tL,z*tL);
		geomLettreA.vertices.push(v);
	}
	
	for (i=0;i<nbFac;i++) {
		x=fac[i*8+1]; y=fac[i*8+2]; z=fac[i*8+3];
		geomLettreA.faces.push( new THREE.Face3( x, y, z) );
	}
	
	geomLettreA.computeFaceNormals(); 
	geomLettreA.computeVertexNormals();
	lettreA = new THREE.Mesh( geomLettreA, materialLettreNoire );		
	scene3D.add(lettreA);	
	lettreA.rotation.x=Math.PI/2;	
	
		
	//lettre B

	var ver=[-0.188422,1.04521e-08,0.239117,0.0455782,1.04521e-08,0.239117,0.0861043,1.03657e-08,0.23714,0.122287,1.01178e-08,0.231469,0.154281,9.72543e-09,0.222492,0.182245,9.20555e-09,0.210598,0.206333,8.57517e-09,0.196177,0.226703,7.8513e-09,0.179617,0.243511,7.05094e-09,0.161307,0.256912,6.19108e-09,0.141635,0.267063,5.28872e-09,0.120992,0.27412,4.36087e-09,0.0997651,0.27824,3.42451e-09,0.0783438,0.279578,2.49666e-09,0.0571169,0.278299,1.51465e-09,0.0346511,0.274513,5.81655e-10,0.0133067,0.268297,-2.98821e-10,-0.00683622,0.259726,-1.12329e-09,-0.0256979,0.248878,-1.88827e-09,-0.0431985,0.235828,-2.59025e-09,-0.0592581,0.220653,-3.22576e-09,-0.0737969,0.20343,-3.7913e-09,-0.0867349,0.184234,-4.28339e-09,-0.0979925,0.163143,-4.69852e-09,-0.10749,0.140232,-5.03321e-09,-0.115146,0.115578,-5.28397e-09,-0.120883,0.115578,-5.37139e-09,-0.122883,0.132539,-5.70398e-09,-0.130492,0.147935,-6.06875e-09,-0.138837,0.161781,-6.46691e-09,-0.147946,0.174097,-6.89967e-09,-0.157846,0.184898,-7.36825e-09,-0.168566,0.194203,-7.87387e-09,-0.180133,0.202029,-8.41773e-09,-0.192575,0.208393,-9.00105e-09,-0.20592,0.213313,-9.62505e-09,-0.220196,0.216805,-1.02909e-08,-0.235429,0.218888,-1.09999e-08,-0.251649,0.219578,-1.17533e-08,-0.268883,0.218254,-1.26926e-08,-0.290373,0.214231,-1.36219e-08,-0.311633,0.207438,-1.45276e-08,-0.332352,0.1978,-1.53959e-08,-0.352216,0.185247,-1.62132e-08,-0.370914,0.169703,-1.69658e-08,-0.388133,0.151097,-1.76402e-08,-0.40356,0.129356,-1.82225e-08,-0.416883,0.104406,-1.86993e-08,-0.427789,0.0761755,-1.90567e-08,-0.435966,0.0445904,-1.92812e-08,-0.441102,0.00957823,-1.9359e-08,-0.442883,-0.188422,-1.9359e-08,-0.442883,-0.0904218,-1.55124e-08,-0.354883,-0.000421762,-1.55124e-08,-0.354883,0.0208259,-1.54733e-08,-0.353988,0.039643,-1.53596e-08,-0.351388,0.0561408,-1.51771e-08,-0.347211,0.0704301,-1.49312e-08,-0.341587,0.0826222,-1.46277e-08,-0.334643,0.0928282,-1.42721e-08,-0.326508,0.101159,-1.38701e-08,-0.317311,0.107726,-1.34272e-08,-0.307179,0.112641,-1.29492e-08,-0.296242,0.116013,-1.24415e-08,-0.284628,0.117956,-1.19099e-08,-0.272466,0.118578,-1.13599e-08,-0.259883,0.117597,-1.05958e-08,-0.242403,0.114648,-9.89896e-09,-0.226462,0.109719,-9.26922e-09,-0.212055,0.1028,-8.70641e-09,-0.199179,0.0938821,-8.21038e-09,-0.187832,0.0829532,-7.78098e-09,-0.178008,0.0700036,-7.41806e-09,-0.169705,0.0550227,-7.12146e-09,-0.16292,0.0380001,-6.89104e-09,-0.157649,0.0189255,-6.72665e-09,-0.153888,-0.00221169,-6.62812e-09,-0.151634,-0.0254218,-6.59531e-09,-0.150883,-0.0904218,-6.59531e-09,-0.150883,-0.0904218,-2.74871e-09,-0.0628831,0.0275782,-2.74871e-09,-0.0628831,0.0521865,-2.7093e-09,-0.0619815,0.0745273,-2.59369e-09,-0.0593368,0.0946251,-2.40585e-09,-0.0550393,0.112504,-2.1497e-09,-0.0491794,0.128189,-1.8292e-09,-0.0418472,0.141703,-1.44829e-09,-0.0331331,0.153072,-1.01093e-09,-0.0231273,0.162319,-5.21046e-10,-0.0119201,0.169469,1.74033e-11,0.000398144,0.174546,6.00475e-10,0.0137373,0.177574,1.22422e-09,0.0280069,0.178578,1.8847e-09,0.0431169,0.177902,2.44589e-09,0.0559555,0.17575,3.00845e-09,0.0688252,0.171938,3.56281e-09,0.0815075,0.166282,4.09941e-09,0.0937836,0.158598,4.60869e-09,0.105435,0.148703,5.08109e-09,0.116242,0.136412,5.50705e-09,0.125987,0.121541,5.87701e-09,0.13445,0.103906,6.18139e-09,0.141414,0.0833236,6.41065e-09,0.146659,0.0596089,6.55522e-09,0.149966,0.0325782,6.60553e-09,0.151117,-0.0904218,6.60553e-09,0.151117,-0.188422,-4.45345e-09,-0.101883];
	var fac=[34,52,50,51,0,0,1,0,34,52,49,50,0,0,0,1,34,52,48,49,0,0,0,0,34,52,47,48,0,0,0,0,34,52,46,47,0,0,0,0,34,52,45,46,0,0,1,0,34,52,44,45,0,0,0,1,34,52,43,44,0,0,0,0,34,52,53,43,0,0,1,0,34,53,42,43,0,1,0,0,34,54,42,53,0,0,0,1,34,55,42,54,0,0,0,0,34,55,41,42,0,0,0,0,34,56,41,55,0,1,0,0,34,57,41,56,0,0,0,1,34,58,41,57,0,1,0,0,34,59,41,58,0,0,0,1,34,59,40,41,0,0,0,0,34,60,40,59,0,1,0,0,34,61,40,60,0,0,0,1,34,61,39,40,0,0,0,0,34,62,39,61,0,0,0,0,34,63,39,62,0,0,0,0,34,63,38,39,0,0,0,0,34,64,38,63,0,0,0,0,34,65,38,64,0,0,0,0,34,65,37,38,0,0,1,0,34,66,37,65,0,0,1,0,34,66,36,37,0,0,0,1,34,67,36,66,0,0,0,0,34,67,35,36,0,0,1,0,34,68,35,67,0,1,1,0,34,68,34,35,0,1,0,1,34,69,34,68,0,0,0,1,34,69,33,34,0,0,0,0,34,70,33,69,0,1,0,0,34,70,32,33,0,1,1,0,34,71,32,70,0,0,1,1,34,71,31,32,0,0,0,1,34,72,31,71,0,0,0,0,34,73,31,72,0,0,0,0,34,73,30,31,0,0,0,0,34,74,30,73,0,0,0,0,34,74,29,30,0,0,0,0,34,75,29,74,0,1,0,0,34,76,29,75,0,1,0,1,34,77,29,76,0,0,0,1,34,79,77,78,0,0,0,0,34,79,29,77,0,0,0,0,34,79,28,29,0,0,0,0,34,79,27,28,0,0,0,0,34,79,26,27,0,0,0,0,34,79,25,26,0,0,0,0,34,79,24,25,0,0,0,0,34,79,23,24,0,0,0,0,34,79,22,23,0,0,1,0,34,79,21,22,0,0,0,1,34,79,20,21,0,0,0,0,34,79,80,20,0,0,0,0,34,80,19,20,0,0,0,0,34,81,19,80,0,1,0,0,34,82,19,81,0,0,0,1,34,83,19,82,0,0,0,0,34,83,18,19,0,0,0,0,34,84,18,83,0,0,0,0,34,85,18,84,0,1,0,0,34,85,17,18,0,1,0,0,34,86,17,85,0,0,0,1,34,87,17,86,0,1,0,0,34,87,16,17,0,1,1,0,34,88,16,87,0,0,1,1,34,89,16,88,0,0,1,0,34,89,15,16,0,0,0,1,34,90,15,89,0,0,0,0,34,90,14,15,0,0,0,0,34,91,14,90,0,0,0,0,34,92,14,91,0,1,0,0,34,92,13,14,0,1,0,0,34,93,13,92,0,0,0,1,34,94,13,93,0,0,0,0,34,94,12,13,0,0,0,0,34,95,12,94,0,0,0,0,34,95,11,12,0,0,0,0,34,96,11,95,0,0,0,0,34,97,11,96,0,1,0,0,34,97,10,11,0,1,0,0,34,98,10,97,0,1,0,1,34,99,10,98,0,0,0,1,34,99,9,10,0,0,0,0,34,100,9,99,0,0,0,0,34,101,9,100,0,1,0,0,34,102,9,101,0,0,0,1,34,102,8,9,0,0,0,0,34,103,8,102,0,0,0,0,34,104,8,103,0,1,0,0,34,0,104,105,0,0,1,0,34,0,8,104,0,0,0,1,34,0,7,8,0,0,1,0,34,0,6,7,0,0,0,1,34,0,5,6,0,0,0,0,34,0,4,5,0,0,0,0,34,0,3,4,0,0,0,0,34,0,2,3,0,0,0,0,34,0,1,2,0,0,0,0,34,106,52,51,0,0,0,0,34,106,0,105,0,0,0,0,34,52,106,78,0,0,0,0,34,78,106,79,0,0,0,0,34,79,106,105,0,0,0,0];
	var geomLettreB = new THREE.Geometry(); 
	var nbVer=Math.round(ver.length/3);
	var nbFac=Math.round(fac.length/8);

	for (i=0;i<nbVer;i++) {
		x=ver[i*3]; y=ver[i*3+1]; z=ver[i*3+2];
		v=new THREE.Vector3(x*tL,y*tL,z*tL);
		geomLettreB.vertices.push(v);
	}
	
	for (i=0;i<nbFac;i++) {
		x=fac[i*8+1]; y=fac[i*8+2]; z=fac[i*8+3];
		geomLettreB.faces.push( new THREE.Face3( x, y, z) );
	}
	
	geomLettreB.computeFaceNormals(); 
	geomLettreB.computeVertexNormals();
	lettreB = new THREE.Mesh( geomLettreB, materialLettreNoire );
	scene3D.add(lettreB);
	lettreB.rotation.x=Math.PI/2;		
}
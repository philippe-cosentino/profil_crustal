function mouseOutCoupe()
{
	coupeCliquee=false;
	document.body.style.cursor = 'default';
}

function mouseDownCoupe(event)
{
	effaceDeroul();
	
	if(window.event)
	event = window.event; //grrr IE

	var offsets = canvSurCoupe.getBoundingClientRect();
	var top = offsets.top;
	var left = offsets.left;

	var mousex = event.clientX - left;
	var mousey = event.clientY - top;
	
	// on vérifie si un clic sur lien modèle ou NASA
	if (mode2=="infosmodeles") {
		if ((mousey<yLien1)&&(mousey>(yLien1-hGL*0.02))) {
			window.open('http://visibleearth.nasa.gov/', '_blank');
			return false;
		}
		if ((mousey<yLien2)&&(mousey>(yLien2-hGL*0.02))) {
			if (modeleUtil==0) {
				var urlLien="http://www.esa.int/Our_Activities/Observing_the_Earth/GOCE/Mapping_the_Moho_with_GOCE";
			}
			else if (modeleUtil==1) {
				var urlLien="http://www.seismo.helsinki.fi/mohomap/";
			}
			else if (modeleUtil==2) {
				var urlLien="http://igppweb.ucsd.edu/~gabi/crust1.html";
			}
			window.open(urlLien, '_blank');
			return false;
		}
	}
	
	if (!coupeFaite) {
		afficheConsignes();
		return false;
	}
	
	if ((mode2=="contactauteur")||(mode2=="infosmodeles"))
	{
		if (modeCoupe==0) {mode2="coupe2d";} else 
		if (modeCoupe==1) {mode2="coupe3d";}
		redim();
		return false;
	}
	
	// on teste si un clic sur le nom du modèle
	var xTitre=Math.round(lGL*0.02);
	var yTitre=Math.round(hGL-hGL/100);
	var hTitre=Math.round(hGL/50);
	ctCoupe.font="italic "+mFont2;
	var lTitre=ctCoupe.measureText("Modèle utilisé : GEMMA (satellite GOCE)").width;
	if ((mousey<yTitre)&&(mousey>(yTitre-hTitre))&&(mousex<(xTitre+lTitre))) {
		if (modeleUtil==0) {
			window.open('http://gocedata.como.polimi.it/index.php', '_blank');
			return false;
		}
		else if (modeleUtil==1) {
			window.open('http://www.seismo.helsinki.fi/mohomap/', '_blank');
			return false;
		}
		else if (modeleUtil==2) {
			window.open('http://igppweb.ucsd.edu/~gabi/rem.html', '_blank');
			return false;
		}
	}
	
	// coupe 3D ?
	if (modeCoupe==1) {
		bouge3D=true;
		xMD3D=mousex;
		yMD3D=mousey;
		return false;
	}	
	
	// on teste si un clic a été fait sur le modèle 2D
	if (!coupeFaite) {return false;}
	coupeCliquee=true;
	
	// bords
	var x0=canvCoupe.width*0.1;
	var margehaut=canvCoupe.height/8;
	var largeur=canvCoupe.width*0.8;
	var hauteur=canvCoupe.height*0.5-margehaut;
	var y0=margehaut+10000/120000*hauteur; 
	
	var xrel=(mousex-x0)/largeur;
	var yrel=(mousey-y0)/hauteur;
	
	if ((xrel<0)||(xrel>1)||(yrel>0.9)||(yrel<-0.1))
	{
		// clic hors de la coupe
		return false;
	}
	
	 afficheSurCoupe (x0,largeur,xrel,yrel);
}

function survolCoupe(event) {
	//si infosmodeles affiché
	if (mode2=="infosmodeles") {
		document.body.style.cursor = 'pointer';
		return false;
	}
	
	// si contact auteur
	if (mode2=="contactauteur") {
		document.body.style.cursor = 'pointer';
		return false;
	}
	
	if(window.event)
	event = window.event; //grrr IE

	var offsets = canvSurCoupe.getBoundingClientRect();
	var top = offsets.top;
	var left = offsets.left;

	var mousex = event.clientX - left;
	var mousey = event.clientY - top;
	
	// on teste si nom du modèle survolé
	var xTitre=Math.round(lGL*0.02);
	var yTitre=Math.round(hGL-hGL/100);
	var hTitre=Math.round(hGL/50);
	ctCoupe.font="italic "+mFont2;
	var lTitre=ctCoupe.measureText("Modèle utilisé : GEMMA (satellite GOCE)").width;
	if ((mousey<yTitre)&&(mousey>(yTitre-hTitre))&&(mousex<(xTitre+lTitre))) {
		document.body.style.cursor = 'pointer';
	}	
	else
	{
		document.body.style.cursor = 'default';
	}
	
	// coupe 3D ?
	if (modeCoupe==1) {
		bougeCoupe3D (mousex,mousey);
		return false;
	}
	
	// on teste si survol coupe
	if (!coupeFaite) {return false;}
	
	// bords
	var x0=canvCoupe.width*0.1;
	var margehaut=canvCoupe.height/8;
	var largeur=canvCoupe.width*0.8;
	var hauteur=canvCoupe.height*0.5-margehaut;
	var y0=margehaut+10000/120000*hauteur; 
	
	var xrel=(mousex-x0)/largeur;
	var yrel=(mousey-y0)/hauteur;
	
	if ((xrel<0)||(xrel>1)||(yrel>0.9)||(yrel<-0.1))
	{
		// clic hors de la coupe
		return false;
	}
	document.body.style.cursor = 'pointer';
	
	// on est sur la coupe, le bouton est il enfoncé ?
	
	if (!coupeCliquee) {return false;}
	
	document.body.style.cursor = 'move';
	afficheSurCoupe (x0,largeur,xrel,yrel);
	

}

function afficheSurCoupe (x0,largeur,xrel,yrel)
{
	ctSurCoupe.clearRect(0,0,canvSurCoupe.width,canvSurCoupe.height);
	
	var irel=Math.round(xrel*nbwp);
	var x=x0+largeur*irel/(nbwp-1);
	ctSurCoupe.fillStyle="black";
	ctSurCoupe.fillRect (x,yRelief[irel],1,yMoho[irel]-yRelief[irel]);
	ctSurCoupe.font="bold "+mFont2;
	ctSurCoupe.textAlign="center";
	
	var yt=yRelief[irel]-canvSurCoupe.height*0.03;
	texteNB (ctSurCoupe,"Altitude:",x,yt);
	var yt=yRelief[irel]-canvSurCoupe.height*0.01;
	texteNB (ctSurCoupe,Math.round(altiRelief[irel]/10)*10+" m",x,yt);
	
	var yt=yRelief[irel]+(yMoho[irel]-yRelief[irel])/2;
	if (xrel<0.5) {
		ctSurCoupe.textAlign="left";
		texteNB (ctSurCoupe,"Epaisseur="+Math.round(epCroute[irel]*10)/10+" km",x+canvSurCoupe.height*0.01,yt);
	}
	else {
		ctSurCoupe.textAlign="right";
		texteNB (ctSurCoupe,"Epaisseur="+Math.round(epCroute[irel]*10)/10+" km",x-canvSurCoupe.height*0.01,yt);
	}	
	
	//efface tout ce qui dépasse
	ctSurCoupe.clearRect(0,hGL*0.48,lGL,hGL*0.52);
	
	redimBoules();
	deplaceCube (sphereMarqueur,wpgc[irel].lati,wpgc[irel].longi);
	render();	
}

function mouseUpCoupe(event)
{
	if (modeCoupe==1) {
		bouge3D=false;
		render();
		return false;
	}
	
	coupeCliquee=false;
	document.body.style.cursor = 'default';
}

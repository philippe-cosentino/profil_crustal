function survolMenu(event) {
	if(window.event)
	event = window.event; 

	var offsets = canvMenu.getBoundingClientRect();
	var top = offsets.top;
	var left = offsets.left;

	var mousex = event.clientX - left;
	var mousey = event.clientY - top;
	
	var x=Math.floor(mousex/lMenu*10);
	
	if (x!=nMenu) {effaceDeroul();}
	
	if ( (x>4) || ((x==4)&&(anag)) || ((x==3)&&(!coupeFaite)) ){document.body.style.cursor = 'default';effaceDeroul();return false;}
	
	document.body.style.cursor = 'pointer';
}

function effaceDeroul () {
	nMenu=-1;
	canvDeroul.style.display="none";
}

function mouseUpDeroul(event) {
	if (nMenu<0) {effaceDeroul();return false;}
	
	if(window.event)
	event = window.event; 

	var offsets = canvDeroul.getBoundingClientRect();
	var top = offsets.top;
	var left = offsets.left;

	var mousex = event.clientX - left;
	var mousey = event.clientY - top;
	
	var hFont=Math.round(hMenu*0.6*10)/10;
	var hLigne=hFont*2;
	
	var nClicMenu=Math.floor(mousey/hLigne);
	
	if (nMenu==0)
	{
		effaceBoules();
		effaceLigne();
		stadeCoupe=0;
		modeleUtil=nClicMenu;
		if (modeleUtil!=2) {sedim=false;}
		coupeFaite=false;
		coupe3DFaite=false;
		afficheConsignes();
		anag=false;
		redim();
	}
	
	if (nMenu==1)
	{
		effaceBoules();
		effaceLigne();
		stadeCoupe=0;
		coupeFaite=false;
		coupe3DFaite=false;
		modeCoupe=nClicMenu;
		afficheConsignes();
		anag=false;
		redim();
	}
	
	if (nMenu==3)
	{
		if ((nClicMenu==1)&&(modeCoupe==1)&&(coupe3DFaite)) {
			exportSTL();
		}
		else if (nClicMenu==0) {
			saveAsJpeg ();
		}
		
	}
	
	if (nMenu==4) // a propos
	{
		if (anag) {return false;}
		if (nClicMenu==0) {
			afficheInfosModeles();
		}
		else if (nClicMenu==1) {
			contactAuteur ();
		}
		
	}
	
	if (nMenu==2) // clic sur menu affichage
	{
		if ((nClicMenu==0)&&(modeleUtil==2)) {
			sedim=!sedim;
			redim();
		}
		
		if ((nClicMenu==1)&&(modeCoupe==1)) {
			anag=!anag;
			if (coupeFaite) {
				redim();
				recalcTricot("coupe");
			}
		}
		
		if (nClicMenu==2) {
			bump++;
			if (bump>3) {bump=0;}
			recalcBump();
			render();
		}

		if (nClicMenu==3) {
			fondPlat=!fondPlat;
			if ((modeCoupe==0)&&(coupeFaite)) {
				traceCoupe(ctCoupe);
			}
			if ((modeCoupe==1)&&(coupe3DFaite)) {
				recalcTricot();
			}
		}
		
		if (nClicMenu==4) {
			coupeHD=!coupeHD;
			if (coupeHD===true) {
				changeResol(300);
			} else {
				changeResol(150);
			}
		}
	}
		
	effaceDeroul();
}

function mouseUpMenu(event) {
	if(window.event)
	event = window.event; 

	var offsets = canvMenu.getBoundingClientRect();
	var top = offsets.top;
	var left = offsets.left;

	var mousex = event.clientX - left;
	var mousey = event.clientY - top;
	
	var x=Math.floor(mousex/lMenu*10);
	
	if ( (x>4) || ((x==4)&&(anag)) || ((x==3)&&(!coupeFaite)) ){document.body.style.cursor = 'default';effaceDeroul();return false;}
	
	nMenu=x;
	
	canvDeroul.style.left=nMenu/10*lMenu+"px";
	canvDeroul.style.top="0px";
	
	
	var hFont=Math.round(hMenu*0.6*10)/10;
	var hLigne=hFont*2;
		
	if (nMenu==0)
	{
		var marge=lMenu*0.01;
		ctDeroul.font=hFont+"px "+dFont;
		var metrics = ctDeroul.measureText("Univ. Warsaw/Helsinki (Europe/res=0,2°) ");
		var largeurTexte = metrics.width+marge*2;
		canvDeroul.height=hLigne*3;
		canvDeroul.width=largeurTexte;
		ctDeroul.font=hFont+"px "+dFont; // le redim du canv reinit ct.font
		ctDeroul.fillStyle="rgb(150,150,150)";
		ctDeroul.fillRect (0,0,canvDeroul.width,canvDeroul.height);
		var x=0+marge;
		var y=hLigne-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		ctDeroul.clearRect (0,0,canvDeroul.width,1);

		var texte="GEMMA (monde/res=0,5°) ";
		if (modeleUtil==0) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
		y=hLigne*2-hFont*0.7;
		var texte="Univ. Warsaw/Helsinki (Europe/res=0,2°) ";
		if (modeleUtil==1) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
		y=hLigne*3-hFont*0.7;
		var texte="CRUST1 (monde/res=1°) ";
		if (modeleUtil==2) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
		
	}
	
	if (nMenu==1)
	{
		var marge=lMenu*0.01;
		ctDeroul.font=hFont+"px "+dFont;
		var metrics = ctDeroul.measureText("Coupe en 2 dimensions X");
		var largeurTexte = metrics.width+marge*2;
		canvDeroul.height=hLigne*2;
		canvDeroul.width=largeurTexte;
		ctDeroul.font=hFont+"px "+dFont; // le redim du canv reinit ct.font
		ctDeroul.fillStyle="rgb(150,150,150)";
		ctDeroul.fillRect (0,0,canvDeroul.width,canvDeroul.height);
		var x=0+marge;
		var y=hLigne-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		ctDeroul.clearRect (0,0,canvDeroul.width,1);
		var texte="Coupe en 2 dimensions ";
		if (modeCoupe==0) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
		y=hLigne*2-hFont*0.7;
		var texte="Coupe en 3 dimensions ";
		if (modeCoupe==1) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
	}
	
	if (nMenu==3)
	{
		var marge=lMenu*0.01;
		ctDeroul.font=hFont+"px "+dFont;
		var metrics = ctDeroul.measureText("Au format STL (impression 3D)");
		var largeurTexte = metrics.width+marge*2;
		canvDeroul.height=hLigne*2;
		canvDeroul.width=largeurTexte;
		ctDeroul.font=hFont+"px "+dFont; // le redim du canv reinit ct.font
		ctDeroul.fillStyle="rgb(150,150,150)";
		ctDeroul.fillRect (0,0,canvDeroul.width,canvDeroul.height);
		var x=0+marge;
		var y=hLigne-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		ctDeroul.clearRect (0,0,canvDeroul.width,1);
		ctDeroul.fillStyle="rgba(0,0,0,1)";
		if ((!coupeFaite)&&(!coupe3DFaite)) {ctDeroul.fillStyle="rgba(0,0,0,0.5)";}
		var texte="Au format JPEG (image)";
		ctDeroul.fillText (texte,x,y);
		y=hLigne*2-hFont*0.7;
		ctDeroul.fillStyle="rgba(0,0,0,1)";
		if ((modeCoupe==0)||(!coupe3DFaite)) {ctDeroul.fillStyle="rgba(0,0,0,0.5)";}
		var texte="Au format STL (impression 3D)";
		ctDeroul.fillText (texte,x,y);
	}
	
	if (nMenu==2)
	{
		var marge=lMenu*0.01;
		ctDeroul.font=hFont+"px "+dFont;
		var metrics = ctDeroul.measureText("Sédiments & glace (CRUST1) X");
		var largeurTexte = metrics.width+marge*2;
		canvDeroul.height=hLigne*5;
		canvDeroul.width=largeurTexte;
		ctDeroul.font=hFont+"px "+dFont; // le redim du canv reinit ct.font
		ctDeroul.fillStyle="rgb(150,150,150)";
		ctDeroul.fillRect (0,0,canvDeroul.width,canvDeroul.height);
		var x=0+marge;
		
		var y=hLigne-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		ctDeroul.clearRect (0,0,canvDeroul.width,1);
		ctDeroul.fillStyle="rgba(0,0,0,1)";
		if ((modeCoupe!=0)||(modeleUtil!=2)) {ctDeroul.fillStyle="rgba(0,0,0,0.5)";}
		var texte="Sédiments & glace (CRUST1) ";
		if (sedim) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
		
		y=hLigne*2-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		ctDeroul.clearRect (0,0,canvDeroul.width,1);
		ctDeroul.fillStyle="rgba(0,0,0,1)";
		if ((modeCoupe==0)||(!coupe3DFaite)) {ctDeroul.fillStyle="rgba(0,0,0,0.5)";}
		var texte="Anaglyphe (Magenta/Cyan) ";
		if (anag) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
		
		y=hLigne*3-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		var texte="Relief sur le globe ";
		if (bump==1) {texte+="";}
		if (bump==1) {texte+="+";}
		if (bump==2) {texte+="++";}
		if (bump==3) {texte+="+++";}
		ctDeroul.fillText (texte,x,y);
		
		y=hLigne*4-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		ctDeroul.clearRect (0,0,canvDeroul.width,1);
		ctDeroul.fillStyle="rgba(0,0,0,1)";
		//if ((modeCoupe==0)||(!coupe3DFaite)) {ctDeroul.fillStyle="rgba(0,0,0,0.5)";}
		var texte="Fond plat (pas de racine) ";
		if (fondPlat) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
		
		y=hLigne*5-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		ctDeroul.clearRect (0,0,canvDeroul.width,1);
		ctDeroul.fillStyle="rgba(0,0,0,1)";
		//if ((modeCoupe==0)||(!coupe3DFaite)) {ctDeroul.fillStyle="rgba(0,0,0,0.5)";}
		var texte="Coupe haute résolution ";
		if (coupeHD) {texte+="✓";}
		ctDeroul.fillText (texte,x,y);
	}
	
	if (nMenu==4)
	{
		var marge=lMenu*0.01;
		ctDeroul.font=hFont+"px "+dFont;
		var metrics = ctDeroul.measureText("Sources des données");
		var largeurTexte = metrics.width+marge*2;
		canvDeroul.height=hLigne*3;
		canvDeroul.width=largeurTexte;
		ctDeroul.font=hFont+"px "+dFont; // le redim du canv reinit ct.font
		ctDeroul.fillStyle="rgb(150,150,150)";
		ctDeroul.fillRect (0,0,canvDeroul.width,canvDeroul.height);
		var x=0+marge;
		var y=hLigne-hFont*0.7;
		ctDeroul.fillStyle="rgb(0,0,0)";
		ctDeroul.clearRect (0,0,canvDeroul.width,1);
		ctDeroul.fillText ("Sources des données",x,y);
		y=hLigne*2-hFont*0.7;
		ctDeroul.fillText ("Contacter l'auteur",x,y);
		y=hLigne*3-hFont*0.7;
		ctDeroul.fillStyle="rgba(0,0,0,0.5)";
		ctDeroul.fillText ("(maj 22/03/2017)",x,y);
	}
	
	canvDeroul.style.display="block";
	
	document.body.style.cursor = 'pointer';
}

function traceBarreMenu () {
	ctMenu.fillStyle="rgb(150,150,150)";
	ctMenu.fillRect(0,0,lMenu,hMenu);
	var hFont=Math.round(hMenu*0.6*10)/10;
	ctMenu.font=hFont+"px "+dFont;
	ctMenu.fillStyle="rgb(0,0,0)";
	var marge=lMenu*0.01;
	var x=0+marge;
	ctMenu.fillText ("Choix du modèle",x,hMenu*0.7);
	x=lMenu/10+marge;
	ctMenu.fillText ("Type de coupe",x,hMenu*0.7);
	x=2*lMenu/10+marge;
	ctMenu.fillText ("Affichage",x,hMenu*0.7);
	x=3*lMenu/10+marge;
	if (!coupeFaite) {ctMenu.fillStyle="rgba(0,0,0,0.5)";} else {ctMenu.fillStyle="rgb(0,0,0)";}
	ctMenu.fillText ("Exportation",x,hMenu*0.7);
	x=4*lMenu/10+marge;
	if (anag) {ctMenu.fillStyle="rgba(0,0,0,0.5)";} else {ctMenu.fillStyle="rgb(0,0,0)";}
	ctMenu.fillText ("A propos",x,hMenu*0.7);
}
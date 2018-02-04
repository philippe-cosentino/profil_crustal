function traceCoupe(ctx)
{
	mode2="coupe2d";
	coupeFaite=true;
	traceBarreMenu (); //pour activer l'exportation
	effaceCoupe(ctx);
	var lati,longi,alti,x,y;
	// réserver 50% de l'écran pour la coupe de croûte
	var x0=canvCoupe.width*0.1;
	var margehaut=canvCoupe.height/8;
	var largeur=canvCoupe.width*0.8;
	var hauteur=canvCoupe.height*0.5-margehaut;
	ctx.strokeStyle="black";
	ctx.beginPath ();
	ctx.moveTo(0,canvCoupe.height*0.55);
	ctx.lineTo(canvCoupe.width,canvCoupe.height*0.55);
	ctx.stroke();
	
	// tranches de relief pour la répartition bimodale
	var tranches=new Array();
	var nTranche;
	for (var i=-10;i<=10;i++)
	{
		tranches[i]=0;
	}
	
	var y0=margehaut+10000/120000*hauteur; //plus haut relief = 9000; plus épaisse croûte=120000
	
	// profondeurs
	ctx.strokeStyle="rgba(0,0,0,0.5)";
	ctx.fillStyle="black";
	ctx.font=mFont3;
	ctx.textAlign="right";
	var yTitreAxeAlti=margehaut-canvCoupe.height*0.028;
	var pas=10;
	if (exag>1.25) {pas=5;}
	if (exag>3.75) {pas=2;}
	for (var i=10;i>-110;i--)
	{
		if ((i%pas)==0) {
			alti=i*1000;
			y=y0-alti/120000*hauteur*exag;
			if (y>(yTitreAxeAlti+canvCoupe.height*0.01))
			{
				ctx.fillText (i,x0-canvCoupe.height*0.01,y);
				ctx.beginPath();
				ctx.moveTo (x0,y);
				ctx.lineTo (x0+largeur,y);
				ctx.stroke();
			}
		}
	}
	ctx.font="italic "+mFont2;
	ctx.textAlign="center";
	ctx.fillText ("Altitude (km)",x0,yTitreAxeAlti);

	//niveau de la mer
	y=y0;
	ctx.fillStyle="rgb(127,180,220)"
	ctx.beginPath();
	ctx.moveTo(x0,y);
	ctx.lineTo(x0+largeur,y);
	alti=-10000;
	y=y0-alti/120000*hauteur*exag;
	ctx.lineTo(x0+largeur,y);
	ctx.lineTo(x0,y);
	y=y0;
	ctx.lineTo(x0,y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	
	
	ctx.strokeStyle="blue";
	y=y0;
	ctx.beginPath();
	ctx.moveTo(x0,y);
	ctx.lineTo(x0+largeur,y);
	ctx.stroke();
	
	//tracé relief
	var maxTranche=0;
	var maxHaut=0;
	var iMaxHaut=-1;
	var xMaxHaut=0;
	var yMaxHaut=0;
	ctx.fillStyle="rgb(150,50,50)"
	ctx.strokeStyle="black";
	ctx.beginPath();
	for (var i=0;i<nbwp;i++)
	{
		lati=wpgc[i].lati;
		longi=corrigeLong(wpgc[i].longi);
		alti=altitude(lati,longi);
		nTranche=Math.round(alti/1000);
		tranches[nTranche]++;
		if (tranches[nTranche]>maxTranche) {maxTranche=tranches[nTranche];}
		x=x0+largeur*i/(nbwp-1);
		y=y0-alti/120000*hauteur*exag;
		yRelief[i]=y;
		altiRelief[i]=alti;
		
		if (alti>maxHaut) {
			maxHaut=alti;
			iMaxHaut=i;
			xMaxHaut=x;
			yMaxHaut=y;
		}
		
		if (i==0) {
			ctx.moveTo(x,y);
		}
		else {
			ctx.lineTo(x,y);
		}
	}
		
	//tracé du Moho
	for (var i=(nbwp-1);i>=0;i--)
	{
		lati=wpgc[i].lati;
		longi=corrigeLong(wpgc[i].longi);
		alti=-profmoho(lati,longi)*1000;
		if (fondPlat) {alti=altiFondPlat;}
		epCroute[i]=(-alti+altitude(lati,longi))/1000;
		x=x0+largeur*i/(nbwp-1);
		y=y0-alti/120000*hauteur*exag;
		yMoho[i]=y;
		ctx.lineTo(x,y);
	}
	
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	if (sedim) {
		// tracé des sédiments
		//tracé relief
		ctx.fillStyle="rgba(160,160,120,0.5)"
		ctx.strokeStyle="rgba(0,0,0,0.5)";
		ctx.beginPath();
		for (var i=0;i<nbwp;i++)
		{
			lati=wpgc[i].lati;
			longi=corrigeLong(wpgc[i].longi);
			alti=altitude(lati,longi);
			x=x0+largeur*i/(nbwp-1);
			y=y0-alti/120000*hauteur*exag;
		
			if (i==0) {
				ctx.moveTo(x,y);
			}
			else {
				ctx.lineTo(x,y);
			}
		}
		
		//tracé des sédiments
		for (var i=(nbwp-1);i>=0;i--)
		{
			lati=wpgc[i].lati;
			longi=corrigeLong(wpgc[i].longi);
			alti=altitude(lati,longi)-epGlace(lati,longi)*1000-epSediments(lati,longi)*1000;
			x=x0+largeur*i/(nbwp-1);
			y=y0-alti/120000*hauteur*exag;
			ctx.lineTo(x,y);
		}
		
		ctx.closePath();
		//ctx.stroke();
		ctx.fill();
		// fin tracé des sédiments	
		
		// tracé glace
		//tracé relief
		ctx.fillStyle="rgba(210,220,220,1)"
		ctx.strokeStyle="rgba(0,0,0,0.5)";
		ctx.beginPath();
		for (var i=0;i<nbwp;i++)
		{
			lati=wpgc[i].lati;
			longi=corrigeLong(wpgc[i].longi);
			alti=altitude(lati,longi);
			x=x0+largeur*i/(nbwp-1);
			y=y0-alti/120000*hauteur*exag;
		
			if (i==0) {
				ctx.moveTo(x,y);
			}
			else {
				ctx.lineTo(x,y);
			}
		}
		
		//tracé glace
		for (var i=(nbwp-1);i>=0;i--)
		{
			lati=wpgc[i].lati;
			longi=corrigeLong(wpgc[i].longi);
			epg=epGlace(lati,longi)*1000;
			alti=altitude(lati,longi)-epGlace(lati,longi)*1000;
			if (altitude(lati,longi)<0) {alti=altitude(lati,longi);}
			x=x0+largeur*i/(nbwp-1);
			y=y0-alti/120000*hauteur*exag;
			ctx.lineTo(x,y);
		}
		
		ctx.closePath();
		//ctx.stroke();
		ctx.fill();
		// fin tracé des sédiments
	}
	
		
	// affichage A et B
	ctx.textAlign="center";
	ctx.fillStyle="black";
	y=y0-hGL*0.01;
	ctx.font=mFont2;
	ctx.fillText ("A",x0+canvCoupe.height*0.005,y);
	ctx.fillText ("B",x0+largeur-canvCoupe.height*0.005,y);
	
	//efface tout ce qui dépasse
	ctx.fillStyle="white";
	ctx.fillRect(0,hGL*0.48,lGL,hGL*0.52);
	
	//affichage plus haut sommet
	if (false)
	{
	ctx.font=mFont2;
	ctx.fillStyle="black";
	ctx.textAlign="center";
	var texte=Math.round(maxHaut)+" m";
	texteNB(ctx,"sommet",xMaxHaut,yMaxHaut-canvCoupe.height*0.035);
	texteNB(ctx,texte,xMaxHaut,yMaxHaut-canvCoupe.height*0.015);
	ctx.fillRect (xMaxHaut,yMaxHaut-2,1,-canvCoupe.height*0.01);
	}
	
	// tracé de l'histogramme
	var y0=canvCoupe.height*0.85;
	var lBase=largeur/21;
	var hauteur=y0-(canvCoupe.height*0.63);
	var h;
	var tFl=canvCoupe.height*0.01;
	ctx.strokeStyle="black";
	ctx.font=mFont3;
	ctx.textAlign="center";
	var texte,pc;
	for (var i=-10;i<11;i++)
	{
		x=(i+10)*lBase+x0;
		h=tranches[i]/maxTranche*hauteur;
		y=y0-h;
		if (i>=0) 
		{ctx.fillStyle="rgba(200,50,0,0.5)";}
		else {ctx.fillStyle="rgba(50,50,150,0.5)";}
		ctx.fillRect(x,y,lBase,h);
		ctx.strokeRect(x,y,lBase,h);
		if (i>=0) 
		{ctx.fillStyle="rgba(100,30,0,1)";}
		else {ctx.fillStyle="rgba(30,30,100,1)";}
		texte=i;
		ctx.fillText (texte,x+lBase/2,y0+canvCoupe.height*0.02);
		pc=Math.round(tranches[i]/nbwp*100);
		if (pc!=0) {
			ctx.fillText (pc+"%",x+lBase/2,y-canvCoupe.height*0.01);
		}
	}	
	
	// axes  bas
		
	// ordonnées
	ctx.beginPath();
	ctx.moveTo(x0,y0);
	ctx.lineTo(x0,y0-hauteur*1.2);
	ctx.lineTo(x0+tFl,y0-hauteur*1.2+tFl);
	ctx.moveTo(x0,y0-hauteur*1.2);
	ctx.lineTo(x0-tFl,y0-hauteur*1.2+tFl);
	ctx.stroke();
	// abscisses
	ctx.beginPath();
	ctx.moveTo(x0,y0);
	ctx.lineTo(x0+largeur*1.05,y0);
	ctx.lineTo(x0-tFl+largeur*1.05,y0+tFl);
	ctx.moveTo(x0+largeur*1.05,y0);
	ctx.lineTo(x0-tFl+largeur*1.05,y0-tFl);
	ctx.stroke();
	
	ctx.font="italic "+mFont2;
	ctx.fillStyle="black";
	ctx.fillText ("Fréquence (%)",x0,y0-hauteur*1.2-canvCoupe.height*0.01);
	ctx.fillText ("Tranches de",x0+largeur,y0-canvCoupe.height*0.04);
	ctx.fillText ("profondeur (km)",x0+largeur,y0-canvCoupe.height*0.02);
	
	ctx.font="italic "+mFont1;
	ctx.fillText ("Epaisseur de la croûte le long de la coupe AB (L="+Math.round(lcoupe)+" km)",x0+largeur/2,canvCoupe.height*0.51);
	ctx.fillText ("Distribution des altitudes le long de la coupe AB",x0+largeur/2,y0+canvCoupe.height*0.055);
	
	titreEtAuteur(ctCoupe);
}
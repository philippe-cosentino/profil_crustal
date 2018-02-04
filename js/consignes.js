function titreEtAuteur(ctx)
{
	if (anag) {return false;}
	ctx.font="bold "+mFont0;
	ctx.fillStyle="black";
	var yTitre=Math.round(hGL/20);
	var xTitre=Math.round(lGL/2);
	ctx.textAlign="center";
	ctx.fillText ("Profil crustal",xTitre,yTitre);
	
	ctx.fillStyle="rgba(0,0,0,0.6)";
	ctx.font="italic "+mFont2;
	yTitre=Math.round(hGL-hGL/100);
	xTitre=Math.round(lGL-lGL/50);
	ctx.textAlign="right";
	ctx.fillText ("Auteur : P. COSENTINO",xTitre,yTitre);
	ctx.textAlign="left";
	xTitre=Math.round(lGL*0.02);
	if (modeleUtil==0) {
		ctx.fillText ("Modèle utilisé : GEMMA (satellite GOCE)",xTitre,yTitre);
	}
	else if (modeleUtil==1) {
		ctx.fillText ("Modèle utilisé : univ. Warsaw & Helsinki",xTitre,yTitre);
	}
	else if (modeleUtil==2) {
		ctx.fillText ("Modèle utilisé : CRUST1 (REM)",xTitre,yTitre);
	}

	yTitre=Math.round(hGL*0.96);
	ctx.fillText ("Imagerie : NASA (visible earth)",xTitre,yTitre);
	var hautLogo=hGL/15;
	var largeLogo=Math.round(hautLogo*imageLogo.width/imageLogo.height);
	var xLogo=Math.round(lGL-largeLogo);
	var yLogo=hGL-hautLogo-hGL*0.03;
	ctx.globalAlpha=0.6;
	ctx.drawImage (imageLogo,0,0,imageLogo.width,imageLogo.height,xLogo,yLogo,largeLogo,hautLogo);
	ctx.globalAlpha=1;
}

function afficheInfosModeles()
{
	mode2="infosmodeles";
	if (anag) {return false;}
	effaceCoupe(ctCoupe);
	ctCoupe.fillStyle="black";
	ctCoupe.font="italic "+mFont1;
	var context=ctCoupe;
	var y=Math.round(3*hGL/20);
	var x=Math.round(lGL/10);
	var maxWidth=lGL-x*2;
	var lineHeight=hGL/30;
	ctCoupe.textAlign="left";

	
	var texte="Sources des données utilisées dans cette application"; 
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	y+=lineHeight*3;
	texte="Imagerie et topographie : NASA (Visible Earth)"; 
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	y+=lineHeight*1.5;
	ctCoupe.font="italic "+mFont2;
	texte="http://visibleearth.nasa.gov/"; 
	yLien1=y;
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	y+=lineHeight*3;
	
	if (modeleUtil==0) {
		texte="Modèle sélectionné pour le Moho : GEMMA (satellite GOCE)";
	}
	else if (modeleUtil==1) {
		texte="Modèle sélectionné pour le Moho : univ. Warsaw & Helsinki";
	}
	else if (modeleUtil==2) {
		texte="Modèle sélectionné pour le Moho : CRUST1";
	}
	ctCoupe.font="italic "+mFont1;
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	
	y+=lineHeight*1.5;
	if (modeleUtil==0) {
		texte="Ce modèle utilise les données gravimétriques recueillies par le satellite GOCE (ESA). La croûte étant moins dense que le manteau, il est possible de calculer l'épaisseur de croûte à partir des anomalies de gravité. La portée de ce modèle est mondial. Sa résolution est de 0,5°.";
	}
	else if (modeleUtil==1) {
		texte="Ce modèle, ne couvrant que l'Europe, résulte de la compilation de données sismiques (plus de 250 profils) et gravimétriques. Sa résolution est de 0,5°. ";
	}
	else if (modeleUtil==2) {
		texte="Ce modèle repose sur des données sismiques (temps d'arrivée, essentiellement des ondes de surface). Sa portée est mondiale et sa résolution est de 1°.";
	}
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	
	y+=lineHeight*1.5;
	if (modeleUtil==0) {
		texte="http://www.esa.int/Our_Activities/Observing_the_Earth/GOCE/Mapping_the_Moho_with_GOCE";
	}
	else if (modeleUtil==1) {
		texte="http://www.seismo.helsinki.fi/mohomap/";
	}
	else if (modeleUtil==2) {
		texte="http://igppweb.ucsd.edu/~gabi/crust1.html";
	}
	ctCoupe.font="italic "+mFont2;
	yLien2=y;
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	
	
	if (sedim) {
		y+=lineHeight*3;
		texte="Modèle utilisé pour l'épaisseur sédimentaire : CRUST1"; 
		ctCoupe.font="italic "+mFont1;
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	
		y+=lineHeight*1.5;
		texte="http://igppweb.ucsd.edu/~gabi/crust1.html";
		ctCoupe.font="italic "+mFont2;
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);	
	}

}

function contactAuteur()
{
	mode2="contactauteur";
	if (anag) {return false;}
	effaceCoupe(ctCoupe);
	ctCoupe.fillStyle="black";
	ctCoupe.font="italic "+mFont1;
	var context=ctCoupe;
	var y=Math.round(3*hGL/20);
	var x=Math.round(lGL/10);
	var maxWidth=lGL-x*2;
	var lineHeight=hGL/30;
	ctCoupe.textAlign="left";

	
	var texte="Auteur de l'application : Philippe Cosentino"; 
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	y+=lineHeight*1.5;
	var texte="Professeur agrégé de SVT (académie de Nice)"; 
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	y+=lineHeight*3;
	var texte="Mail : philippe.cosentino@ac-nice.fr"; 
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	y+=lineHeight*3;
	var texte="Pour connaître les auteurs des modèles scientifiques, aller dans le menu 'A propos/Sources des données'";
	y=wrapText(context, texte, x, y, maxWidth, lineHeight);

}


function afficheConsignes()
{
	if (anag) {return false;}
	mode2="consignes";
	effaceCoupe(ctCoupe);
	ctCoupe.fillStyle="black";
	ctCoupe.font="italic "+mFont1;
	var context=ctCoupe;
	var y=Math.round(3*hGL/20);
	var x=Math.round(lGL/10);
	var maxWidth=lGL-x*2;
	var lineHeight=hGL/30;
	ctCoupe.textAlign="left";

	
	if (modeCoupe==0) {
		var texte="Cet outil vous permettra de comparer l'épaisseur des croûtes continentales et océaniques, ainsi que la répartition statistique des reliefs, le long d'une coupe."; 
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
		y+=lineHeight*3;
		var texte="Mode d'emploi (pour une coupe plane) :"; 
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
		y+=lineHeight*1.5;
		var texte="Délimitez un plan de coupe en cliquant à deux endroits différents sur le globe."; 
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
		y+=lineHeight*1.5;
		var texte="Vous pouvez faire pivoter ce dernier en maintenant le bouton gauche de la souris enfoncé tout en la déplaçant, et zoomer avec la molette de la souris.";
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
		y+=lineHeight*1.5;
		var texte="Une fois la coupe affichée, vous pourrez cliquer dessus pour afficher la valeur numérique de l'épaisseur crustale, et zoomer avec la molette pour modifier l'échelle verticale.";
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	}
	else 	if (modeCoupe==1) {
		var texte="Mode d'emploi (pour une coupe en 3 dimensions) :"; 
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
		y+=lineHeight*1.5;
		var texte="Délimitez un segment [AB] en cliquant à deux endroits différents sur le globe. "; 
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
		y+=lineHeight*1.5;
		var texte='Une portion "carrée" de croûte (dont l\'un des côtés correspondra au segment AB) sera alors modélisée et affichée dans la moitié droite de l\'écran. '; 
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
		y+=lineHeight*1.5;
		var texte="Vous pouvez faire pivoter cette portion en maintenant le bouton gauche de la souris enfoncé tout en la déplaçant, et augmenter l'échelle verticale à l'aide de la molette de la souris.";
		y=wrapText(context, texte, x, y, maxWidth, lineHeight);
	}
}

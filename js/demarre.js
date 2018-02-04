var etape=0;

var tScript=new Array();
tScript[0]="three.min";
tScript[1]="menu";
tScript[2]="consignes";
tScript[3]="elevation5400";
tScript[4]="varglob";
tScript[5]="encdec64";
tScript[6]="bathy5400";
tScript[7]="valmoho";
tScript[8]="valmohoeuropelr";
tScript[9]="valmohocrust1";
tScript[10]="valsediments";
tScript[11]="valglace";
tScript[12]="reliefs";
tScript[13]="coupe";
tScript[14]="coupe3D";
tScript[15]="export";
tScript[16]="wraptext";
tScript[17]="init";
tScript[18]="render";
tScript[19]="spheriques";
tScript[20]="grand_cercle";
tScript[21]="canvas";
tScript[22]="events";
tScript[23]="clic_coupe";
tScript[24]="AnaglyphEffect";
tScript[25]="terre_4096";
tScript[26]="terreBump";
var nScript=0;

function chargeScripts ()
{
	var nomf=tScript[nScript];
	if ((nomf=="terre_4096")&&(reliefHD)) {nomf="terre_8192";}
	if ((nomf=="bathy5400")&&(reliefHD)) {nomf="bathy10800";}
	if ((nomf=="elevation5400")&&(reliefHD)) {nomf="elevation10800";}
	nScript++;
	if (nScript<=tScript.length) {
		charge(nomf);	
	}
}

function charge(nomf)
{
	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.async = true;
	fileref.setAttribute("src", "js/"+nomf+".js");
	var js=document.getElementsByTagName("head")[0].appendChild(fileref);
    js.onload = function () {
		setTimeout(function() { 
			//console.log (nomf+" chargé.");
			avanceCharge();
			chargeScripts();
		}, 1);      
	}
	

}



function avanceCharge()
{
	if (!browserOK) {return false;}
	var nbEtapes=31;
	etape++;
	var texte='<p>Veuillez patienter, chargement en cours</p><p>Etape '+etape+'/'+nbEtapes+'</p>';
	texte+="<p>";
	for (var i=1;i<etape;i++) {
		texte+='&#9632;';
	}
	for (var i=etape;i<nbEtapes;i++) {
		texte+='&#9633;';
	}
	texte+="</p>";
	document.getElementById('image_chargement').style.opacity=Math.round(etape/nbEtapes*90)/100+0.1;
	document.getElementById('div_chargement').innerHTML=texte;
	if (etape>=nbEtapes)
	{
		document.getElementById('div_chargement').innerHTML="Redimension";
		setTimeout(demarre,20);
	}
}


function bloqueZoom() {
		if ((typeof window !== 'undefined' && window.process && window.process.type === "renderer")) {
			// on est dans electron
			require('electron').webFrame.setZoomLevelLimits(1, 1);
		}
		// empecher le ctrl+molette zoom
		window.addEventListener('mousewheel', function(e) {
		  if (e.ctrlKey) {
			e.preventDefault();
		  }
		});
		
		document.onkeydown = function (e) {
			e = e || window.event;//Get event
			if (e.ctrlKey==true && (e.which == '107' || e.which == '109'|| e.which == '187')) {
						e.preventDefault();     
						e.stopPropagation();
			}
		};
}

function go() {
	// détection de NWJS
	if (is_nwjs()===true) {
		var gui = require('nw.gui'); 
		var win = gui.Window.get();
		win.maximize();
		win.show();
		//alert (process.versions['node-webkit']);
	}


	// détection du webgl
	if (!supports_canvas()) {
		document.getElementById('div_chargement').innerHTML="<p>Votre navigateur ne supporte pas l\'objet Canvas.</p><p>Utilisez un navigateur mis &agrave; jour ...</p>";
		throw new Error("Canvas non supporté !");
	}
	else if (!window.WebGLRenderingContext) {
		document.getElementById('div_chargement').innerHTML="<p>Votre système ou votre navigateur ne reconnait pas le WebGL.</p>";
		throw new Error("WebGL non supporté");
	} else {
		var canvas =document.createElement("canvas");
		var context = canvas.getContext("webgl");
		if (!context) {
			document.getElementById('div_chargement').innerHTML="<p>Erreur lors de l'initialisation de WebGL.</p>";
			throw new Error("Erreur avec l'initialisation du WebGL");
		} else {
			go2();
		}
	}
}

function go2() {
	bloqueZoom();
	chargeScripts ();	
}

function demarre()
{
	window.addEventListener("resize", redim);
	window.addEventListener("keydown",clavier);
	redim();
	initMolette();
	initMoletteCoupe ();
	document.getElementById('div_chargement').innerHTML="Initialisation de la scène 3D";
	setTimeout(demarre2,20);
}

function demarre2() {
	init_scene();
	init_coupe3D();
	document.getElementById('div_chargement').innerHTML="Initialisation de la Terre";
	setTimeout(demarre3,20);
}

function demarre3() {
	init_planete();
	document.getElementById("divchargement").style.display="none";
	divgl.style.display = "block";
	divcoupe.style.display = "block";
	divmenu.style.display="block";
	redim();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function is_nwjs(){
try{
		return (typeof require('nw.gui') !== "undefined");
	} catch (e){
		return false;
	}
}


var reliefHD=(getParameterByName('reliefhd')=="1");
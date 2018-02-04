var mode2="consignes";
var yLien1,yLien2;
var nMenu=-1;
var modeCoupe=0;
var modeleUtil=2;
var flou=1;
var coupeCliquee=false;
var sedim=false;
var anag=false;
var fondPlat=false;
var altiFondPlat=-15000;
var bump=2;
var latitude=0;
var longitude=0;
var exag=1;
var lcoupe;
var lTricot=1300;
var zexag=0.01;
var wpgc=new Array();
var wpBD=new Array();
var wpDC=new Array();
var wpCA=new Array();
var yRelief=new Array();
var yMoho=new Array ();
var altiRelief=new Array ();
var epCroute=new Array ();
var nbwp=150;
var coupeHD=false;
for (var i=0;i<nbwp;i++)
{
	wpgc[i]={};
	wpBD[i]={};
	wpDC[i]={};
	wpCA[i]={};
}

var sphereLigne=new Array();

var lat1c,long1c;
var stadeCoupe=0;

var bouton=false;
var bouge=false;
var bouge3D=false;
var coupeFaite=false;
var coupe3DFaite=false;
var batOnly=false;

var xMD,yMD;
var xMD3D,yMD3D;

var ele,bath;

var taille=2000;
var tailleMin=400;
var rTerre=1000;
var dLampe=15000;
var dCamera=10000;

var mFont0,mFont1,mFont2,mFont3;
var dFont="\"Trebuchet MS\", Helvetica, sans-serif";
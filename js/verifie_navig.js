var browserOK=true;
if (!supports_canvas()) {
	browserOK=false;
	document.getElementById('divchargement').innerHTML="<p>Votre navigateur ne supporte pas l\'objet Canvas.</p><p>Utilisez un navigateur mis &agrave; jour ...</p>";
	throw new Error("Canvas non supporté !");
}

if (!window.WebGLRenderingContext) {
	browserOK=false;
	document.getElementById('divchargement').innerHTML="<p>WebGL n'\est pas disponible. Il se peut soit que votre navigateur ne le supporte pas (mettez ce dernier à jour), soit que votre configuration graphique (pilote ...) ne soit pas à jour ...</p>";
	throw new Error("WebGL non supporté !");
}



function supports_canvas() {
	var test=!!document.createElement('canvas').getContext;
	return test;
}
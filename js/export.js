var imgTemp=new Image();

function saveAsJpeg () {
	if ((!coupeFaite)&&(!coupe3DFaite)) {return false;}
	
	if ((coupe3DFaite)&&(modeCoupe==1)) { // coupe en 3D
		render3D(true);
		render();
		imgTemp.src=imageCapt;
		imgTemp.onload = function () {
			saveAsJpeg2();
		}
		
	}
	else { // coupe en 2D
		canvTemp.width=lGL;
		canvTemp.height=hGL;
		traceCoupe (ctTemp);
		traceCoupe (ctCoupe);
		titreEtAuteur (ctTemp);
		downloadJpeg ();
	}
}

function saveAsJpeg2 () {
		imgTemp.onload = function () {return false;}
		if (anag) {
			canvTemp.width=lGL*2*pixelRatio();
			canvTemp.height=hGL*pixelRatio();
			ctTemp.drawImage(imgTemp,0,0);
		}
		else {
			canvTemp.width=lGL;
			canvTemp.height=hGL;
			ctTemp.drawImage(imgTemp,lGL*pixelRatio(),0,lGL*pixelRatio(),hGL*pixelRatio(),0,0,lGL,hGL);
		}
		titreEtAuteur (ctTemp);
	
	downloadJpeg ();
}



function downloadJpeg () {

	imgTemp.src=canvTemp.toDataURL('image/jpeg');
	
	// atob to base64_decode the data-URI
	var image_data = atob(imgTemp.src.split(',')[1]);
	// Use typed arrays to convert the binary data to a Blob
	var arraybuffer = new ArrayBuffer(image_data.length);
	var view = new Uint8Array(arraybuffer);
	for (var i=0; i<image_data.length; i++) {
		view[i] = image_data.charCodeAt(i) & 0xff;
	}
	try {
		// This is the recommended method:
		var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
	} catch (e) {
		// Old Browsers
		var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
		bb.append(arraybuffer);
		var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
	}

	var fileNameToSaveAs = "croute.jpg";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(blob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(blob);
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

		downloadLink.click();

	//Canvas2Image.saveAsPNG(canvTemp);
	//window.location.href=imgData; 
	//var texte="<html><body><p>Pour enregistrer cette image, essayez le clic droit de la souris</p></html><img src='"+imgData+"'></body></html>";
	//window.open("data:text/html,"+texte,'_blank');
}

function saveTextAsFile(textToWrite)
{
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain;charset=utf-8'});
	var fileNameToSaveAs = "croute.stl";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		//downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}


function exportSTL()
{
	tricot.geometry.computeFaceNormals ();
	tricot.geometry.computeVertexNormals ();
	
	var cRet=String.fromCharCode(13)+String.fromCharCode(10);
	var cTab=" ";
	var filename="croute3d.stl";
	var URItexte="solid croute"+cRet;
	var texte;
	
	var nbf=tricot.geometry.faces.length;
		
	var v=new Array();
	
	var x,y,z;
	var face;
	
	for (var i=0;i<nbf;i++)
	{
		face=tricot.geometry.faces[i];
		texte="";
		x=Math.round(face.normal.x*100)/100;
		y=Math.round(face.normal.y*100)/100;
		z=Math.round(face.normal.z*100)/100;
		texte+=cTab+"facet normal "+x+" "+y+" "+z+cRet;
		texte+=cTab+cTab+"outer loop"+cRet;
		v[0]=face.a;
		v[1]=face.b;
		v[2]=face.c;
		
		for (var j=0;j<3;j++) {
			var vert=tricot.geometry.vertices[v[j]];
			texte+=cTab+cTab+cTab+"vertex ";
			x=Math.round(vert.x)/100;
			y=Math.round(vert.y)/100;
			z=Math.round(vert.z)/100;
			texte+=x+" "+y+" "+z;
			texte+=cRet;					
		}
		URItexte+=texte;
		URItexte+=cTab+cTab+"endloop"+cRet;
		URItexte+=cTab+"endfacet"+cRet;
		
	}
		
	URItexte+="endsolid croute";
	
	saveTextAsFile (URItexte);
	
	//var pom = document.createElement('a');
	//pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + URItexte);
	
	//pom.setAttribute('download', filename);
	//pom.click();
}
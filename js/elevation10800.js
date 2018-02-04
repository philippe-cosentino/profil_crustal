﻿var imgelev=new Image();

imgelev.onload = function() {
		var mycanvase = document.createElement("canvas");
		mycanvase.width=10800;
		mycanvase.height=5400;
		var ctxe=mycanvase.getContext("2d");
		ctxe.clearRect(0,0,mycanvase.width,mycanvase.height);
		ctxe.drawImage(imgelev, 0, 0);
		
		var dataE=ctxe.getImageData(0,0,mycanvase.width,mycanvase.height);
		ele=new Uint8Array(mycanvase.width*mycanvase.height);
		// 4 octets par pixel, on n'en prend qu'un sur 4
		var l=dataE.data.length;
		for (var i=0;i<l;i+=4) {
			ele[i>>2]=dataE.data[i];
		}
		
		imgelev.src="";
		mycanvase.width=0;
		mycanvase.height=0;
        avanceCharge();
      };
	  


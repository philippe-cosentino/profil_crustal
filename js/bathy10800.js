﻿var imgbathy=new Image();
imgbathy.onload = function() {
		var mycanvasb = document.createElement("canvas");
		mycanvasb.width=10800;
		mycanvasb.height=5400;
		var ctxb=mycanvasb.getContext("2d");
		ctxb.clearRect(0,0,mycanvasb.width,mycanvasb.height);

		ctxb.drawImage(imgbathy, 0, 0);
		var dataE=ctxb.getImageData(0,0,mycanvasb.width,mycanvasb.height);
		bath=new Uint8Array(10800*5400);
		// 4 octets par pixel, on n'en prend qu'un sur 4
		var l=dataE.data.length;
		for (var i=0;i<l;i+=4) {
			bath[i>>2]=dataE.data[i];
		}
		imgbathy.src="";
		mycanvasb.width=0;
		mycanvasb.height=0;
        avanceCharge();
      };
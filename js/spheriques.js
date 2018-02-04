function calcAngleDroit(angle) {
	var surface=(1-Math.cos(angle));
	var coef=0.6;
	var angleD=Math.PI/2+coef*surface;
	return angleD;
}

function carreC(pta,ptb) {
	var angle=dgrand_cercle(pta,ptb)/6371;
	var angleDroit=calcAngleDroit(angle);
	
	var ptc={};
	var angleRotLat=pta.lati*Math.PI/180;
	var angleRotLong=-pta.longi*Math.PI/180;
	
	var b=calcsph(ptb.lati,ptb.longi);
	var b2=sphcart (b);
	var b3=rotateZ (b2,angleRotLong); // b4 est l'image du point b si le point a est ramené en 0,0
	var b4=rotateY (b3,angleRotLat); 
	
	var b5=rotateX (b4,angleDroit); // rotation de PI/2
	
	var b6=rotateY (b5,-angleRotLat);  // on remet b7 par rapport à a
	var b7=rotateZ (b6,-angleRotLong);
	var b8=cartsph (b7);
	
	var c=b8;
	
	//var b=calcsph (ptb.lati,ptb.longi);
	//console.log ("b : phi="+Math.round(b.phi*180/Math.PI)+",theta="+Math.round(b.theta*180/Math.PI));
	//var b2=sphcart (b);
	//var b3=rotate
	//var c2=rotateZ (b3,Math.PI/2);
	//var c=cartsph (c2);
	
	ptc.lati=90-c.theta*180/Math.PI;
	ptc.longi=corrigeLong(c.phi*180/Math.PI);
	return ptc;
}

function carreD(ptb,pta) {
	var angle=dgrand_cercle(pta,ptb)/6371;
	var angleDroit=calcAngleDroit(angle);

	var ptc={};
	var angleRotLat=pta.lati*Math.PI/180;
	var angleRotLong=-pta.longi*Math.PI/180;
	
	var b=calcsph(ptb.lati,ptb.longi);
	var b2=sphcart (b);
	var b3=rotateZ (b2,angleRotLong);
	var b4=rotateY (b3,angleRotLat); 
	 // b4 est l'image du point b si le point a est ramené en 0,0
	var b5=rotateX (b4,-angleDroit); // rotation de PI/2
	var b6=rotateY (b5,-angleRotLat);  // on remet b7 par rapport à a
	var b7=rotateZ (b6,-angleRotLong);
	var b8=cartsph (b7);
	
	var c=b8;
	
	//var b=calcsph (ptb.lati,ptb.longi);
	//console.log ("b : phi="+Math.round(b.phi*180/Math.PI)+",theta="+Math.round(b.theta*180/Math.PI));
	//var b2=sphcart (b);
	//var b3=rotate
	//var c2=rotateZ (b3,Math.PI/2);
	//var c=cartsph (c2);
	
	ptc.lati=90-c.theta*180/Math.PI;
	ptc.longi=corrigeLong(c.phi*180/Math.PI);
	return ptc;
}

function sphcart (p)
{
	var qs={};

	qs.x=Math.sin(p.theta)*Math.cos(p.phi);
	qs.y=Math.sin(p.theta)*Math.sin(p.phi);
	qs.z=Math.cos(p.theta);

	return qs;
}

function cartsph (p)
{
	var q={};
	
	q.theta=Math.acos(p.z);
	//q.phi=Math.acos(p.x/Math.sin(q.theta));
	if (p.x==0) {
		if (p.y>0) {q.phi=Math.PI/2;} else {q.phi=-Math.PI/2;}
	}
	else {
		q.phi=Math.atan(p.y/p.x);
		if ((p.x<0)&&(p.y>0)) 
		{q.phi=Math.PI+q.phi;}
		else if ((p.x<0)&&(p.y<0)) 
		{q.phi=-Math.PI+q.phi;}
	}
	
	return q;
}

function calcsph (laticalc,longicalc)
{
	var q={};
	q.theta=(90-laticalc)*Math.PI/180;
	q.phi=longicalc/180*Math.PI;
	
	return q;
}

function rotateX (p,angle)
{
	var qs={};

	qs.x=p.x;
	qs.y=p.y*Math.cos(angle)-p.z*Math.sin(angle);
	qs.z=p.y*Math.sin(angle)+p.z*Math.cos(angle);

	return qs;	
}

function rotateY (p,angle)
{
	var qs={};

	qs.x=p.x*Math.cos(angle)+p.z*Math.sin(angle);
	qs.y=p.y;
	qs.z=-p.x*Math.sin(angle)+p.z*Math.cos(angle);

	return qs;	
}

function rotateZ (p,angle)
{
	var qs={};

	qs.x=p.x*Math.cos(angle)-p.y*Math.sin(angle);
	qs.y=p.x*Math.sin(angle)+p.y*Math.cos(angle);
	qs.z=p.z;

	return qs;	
}
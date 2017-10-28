const webgllib={
getg:function (id){
	return document.getElementById(id).getContext("webgl",{preserveDrawingBuffer:true})
},
getp:function (g, src){
	const FS=WebGLRenderingContext.FRAGMENT_SHADER, VS=FS+1;
	var p=g.createProgram();
	g.attachShader(p, cs(VS, src[0]));	g.attachShader(p, cs(FS+0, src[1]));
	g.linkProgram(p);	console.log("link:"+g.getProgramInfoLog(p));
	if(g.getProgramParameter(p, 0x8B82)){return p;}else{g.deleteProgram(p);}
	function cs(t, src){
		console.log(src);
		var s=g.createShader(t);	g.shaderSource(s, src);
		g.compileShader(s);console.log("compile("+t+"):"+g.getShaderInfoLog(s));
		if(g.getShaderParameter(s, 0x8B81)){return s}else{g.deleteShader(s);}
	}
},
sett:function (g, p, id, data, unit, size=0){
	const TD=g.TEXTURE_2D, TW=g.TEXTURE_WRAP_S, TEDGE=g.CLAMP_TO_EDGE;
	const TU=g.TEXTURE0, TF=g.TEXTURE_MAG_FILTER, TN=g.NEAREST;
	var loc=g.getUniformLocation(p, id);
	g.uniform1i(loc, unit);	g.activeTexture(TU+unit);
	g.bindTexture(TD, g.createTexture());
	g.texParameteri(TD, TF+0, TN+0);	g.texParameteri(TD, TF+1, TN+0);
	g.texParameteri(TD, TW+0, TEDGE+0);	g.texParameteri(TD, TW+1, TEDGE+0);
	if(size==0){
		g.texImage2D(TD, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, data);
	}else{
		g.texImage2D(TD,0,g.ALPHA,size,size,0,g.ALPHA, g.UNSIGNED_BYTE,data);
	}
},
setv:function (g, p, id, data){
	g.uniform2iv(g.getUniformLocation(p, id),data);
},
seti:function (g, p, id, data){
	g.uniform1iv(g.getUniformLocation(p, id),data);
},
setf:function (g, p, id, data){
	g.uniform1f(g.getUniformLocation(p, id),data);
},
}
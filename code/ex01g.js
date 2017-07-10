
/* generic functions */
function getGl(canvas){
	var gl;
	try{
		gl=canvas.getContext("webgl");
	}catch(e){
		if(!gl){
			console.log(e);
			gl=null;
		}
	}
	return gl;
}
function getProgram(gl, VSid, FSid){
	function getShaderSource(id){
		var src=document.getElementById(id);
		if(src instanceof HTMLElement){
			return src.textContent;
		}else{
			return "";		
		}
	}
	function getShader(shaderSource, shaderType){
		shader=gl.createShader(shaderType);
//		console.log(shaderSource);
		gl.shaderSource(shader, shaderSource);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS)){
			console.log("compile error!");
			return null;
		}else{
			console.log("compiled!");
			return shader;
		}		
	}
	var vShader, fShader;
	var vSource=getShaderSource(VSid);
	vShader=	getShader(vSource, WebGLRenderingContext.VERTEX_SHADER);
	var fSource=getShaderSource(FSid);
	fShader=	getShader(fSource, WebGLRenderingContext.FRAGMENT_SHADER);
	var program=gl.createProgram();
	gl.attachShader(program, vShader);
	gl.attachShader(program, fShader);
	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS)){
		console.log("link failed.");
	};
	gl.useProgram(program);
	return program;
}

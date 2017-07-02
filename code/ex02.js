window.onload=function(){
	const COLOR_BUFFER_BIT=WebGLRenderingContext.COLOR_BUFFER_BIT;
	const DEPTH_BUFFER_BIT=WebGLRenderingContext.DEPTH_BUFFER_BIT;
	var gl=getGL("holder");
	gl.clearColor(red=0, green=.2, blue=.5, alpha=1.0);
	gl.clear(COLOR_BUFFER_BIT|DEPTH_BUFFER_BIT);

	var program=getProgram(gl, "vs","fs");
	gl.useProgram(program);
	program.point=gl.getAttribLocation(program, "point");
	gl.enableVertexAttribArray(program.point);

	gl.pointBuf=gl.createBuffer();
	var data=[
//		-1., 1.0, 0.0,					1.0, 1.0, 0.0,
//						0.0, 0.0, 0.0,
//		-1., -1., 0.0,					1.0, -1., 0.0,
						0.0, 0.0, 0.0,
	];
	setBuffer(gl, program.point, gl.pointBuf, data);
	gl.drawArrays(gl.POINTS, 0, data.length/3);
//	gl.drawArrays(gl.TRIANGLES, 0, data.length/3);
}
function setBuffer(gl, dest, destBuf, data){
	gl.bindBuffer(gl.ARRAY_BUFFER, destBuf);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	gl.vertexAttribPointer(dest, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}
function getGL(parent){
	var holder=document.getElementById(parent);
	console.log(holder);
	var canvas=document.createElement("canvas");
	canvas.style="background-color:transparent;";
	canvas.width=512; canvas.height=512;
	holder.appendChild(canvas);
	console.log(canvas);
	return canvas.getContext("webgl");
}
function getProgram(gl, vs, fs){
	var vssrc=document.getElementById(vs);
	var vshader=gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vshader, vssrc.textContent);
	console.log(vssrc.textContent);

	var fssrc=document.getElementById(fs);
	var fshader=gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fshader, fssrc.textContent);
	console.log(fssrc.textContent);

	gl.compileShader(vshader);
	gl.compileShader(fshader);
	console.log(gl.getShaderParameter(vshader, gl.COMPILE_STATUS));
	console.log(gl.getShaderParameter(fshader, gl.COMPILE_STATUS));
	var program=gl.createProgram();
	gl.attachShader(program, vshader);
	gl.attachShader(program, fshader);
	gl.linkProgram(program);
	return program;
}
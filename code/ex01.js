var test=function(){
	var body, canvas, gl;
	body=document.getElementById("body");
	body.style="background-color:#030;";
	canvas=document.createElement("canvas");
	body.appendChild(canvas);
	canvas.width="250";	canvas.height="250";
	canvas.style="background-color:transparent;";
	gl=getGl(canvas);
//	gl.enable(WebGLRenderingContext.DEPTH_TEST);
//	gl.depthFunc(WebGLRenderingContext.LEQUAL);
	console.log(gl);
	var program=getProgram(gl, "vs2", "fs2");
//	console.log(program);
	program.point=gl.getAttribLocation(program, "point");
	gl.enableVertexAttribArray(program.point);
	var length=setScene(gl, program);
	draw();
	function draw(){
		const COLOR_BUFFER_BIT=WebGLRenderingContext.COLOR_BUFFER_BIT;
		const DEPTH_BUFFER_BIT=WebGLRenderingContext.DEPTH_BUFFER_BIT;
		const TRIANGLE_STRIP=WebGLRenderingContext.TRIANGLE_STRIP;
		gl.clearColor(0.2, 0.5, 0.1, 0.6);
		gl.clear(COLOR_BUFFER_BIT|DEPTH_BUFFER_BIT);
		gl.drawArrays(TRIANGLE_STRIP, 0,length);
		gl.drawArrays(gl.POINTS, 0,length);
	}
}
/* app specific functions */
// draw
function setScene(gl, program){
	const FLOAT=WebGLRenderingContext.FLOAT;
	var vertices=[
		-1.0, -1.0, 0.0,
		1.0, -1.0, 0.0,
		-1.0, 1.0, 0.0,
		1.0, 1.0, 0.0,
	];
	initBufferF(gl, vertices);
	gl.vertexAttribPointer(program.point,3,FLOAT, false, 0,0);
	return vertices.length/3;
}

/* generic functions */
function initBufferF(gl, data){
	// handle WebGLBuffer, 
	const ARRAY_BUFFER=WebGLRenderingContext.ARRAY_BUFFER;
	const STATIC_DRAW=WebGLRenderingContext.STATIC_DRAW;
	var buf=gl.createBuffer();
	gl.bindBuffer(ARRAY_BUFFER, buf);
	gl.bufferData(ARRAY_BUFFER, new Float32Array(data), STATIC_DRAW);
}

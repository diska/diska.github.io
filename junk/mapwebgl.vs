const VS=`attribute vec3 p;
void main(){
	gl_PointSize=512.;
	gl_Position=vec4(p,1.);
}`;
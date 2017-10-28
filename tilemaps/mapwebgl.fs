const FS=`precision mediump float;
uniform sampler2D map;	uniform sampler2D tile;
uniform float MAPDIM;	uniform float TILEDIM;
//const float MAPDIM=16.0;
//const float TILEDIM=8.0;
//const float IMGDIM=256.0-0.001;
// 8bit整数だったfloat?を3bit/3bit/2bitに分けてvec4(x,y,z,1.0)に入れるみたいな。
vec4 toVec4(vec2 coord){
	float p=texture2D(map, coord).a;
	vec4 color=vec4(0);
	// rrrgggbb
	float a=p*=256.0;
	if(a>=128.0){color.r+=4.0;a-=128.0;}
	if(a>= 64.0){color.r+=2.0;a-= 64.0;}
	if(a>= 32.0){color.r+=1.0;a-= 32.0;}
	if(a>= 16.0){color.g+=4.0;a-= 16.0;}
	if(a>=  8.0){color.g+=2.0;a-=  8.0;}
	if(a>=  4.0){color.g+=1.0;a-=  4.0;}
	if(a>=  2.0){color.b+=4.0;a-=  2.0;}
	if(a>=  1.0){color.b+=2.0;a-=  1.0;}
	color.w=8.;
	return color/8.0;
}
vec4 vec4ToVec4(vec2 coord){
	return texture2D(map, coord);
}
// 「タイル内」の「どの座標」か。「０～タイルの幅」小数部のみ
vec2 getTileCoord(vec2 coord){	return fract(coord*MAPDIM)/TILEDIM;}
// 回転させる。
vec2 getRotated(vec2 coord, float c){
	float s=(1.0/TILEDIM);
	if(c< 2.0/8.0)return vec2(coord.x, coord.y);	// 0度
	if(c< 4.0/8.0)return vec2(s-coord.y, coord.x);	// 90度
	if(c< 6.0/8.0)return vec2(s-coord.x, s-coord.y);	// 180度
	if(c< 8.0/8.0)return vec2(coord.y, s-coord.x);	// 270度
	return vec2(0);
}
vec4 getTile(sampler2D tex, vec3 currentTileCoord){
	vec2 tileCoord=vec2(0);
	tileCoord+=vec2(currentTileCoord.x, currentTileCoord.y);	// このタイルの
	tileCoord+=vec2(getRotated(getTileCoord(gl_PointCoord),currentTileCoord.z));	// このへん
	return texture2D(tex, tileCoord);	// の色
}
//
void main(){
//	vec4 m=toVec4(texture2D(map, gl_PointCoord).a);	// mapの値。
	vec4 m=toVec4(gl_PointCoord);	// mapの値。
	float rot=m.b;
	// 元々8ビットのタイル指定数値を色で表示してみると、こう。
	gl_FragColor=m;
	// タイル指定数値からタイルにしてはめこむ。
	gl_FragColor=getTile(tile, vec3(vec2(m.x,m.y),rot));
}`;
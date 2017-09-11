こんなことも

<canvas id="cnvs"/>
<script>
var r=0, c=document.getElementById("cnvs").getContext("webgl");
function draw(){c.clearColor(r=((r+=.01)<1)?r:0,.5,0,1);	c.clear(0x4000);}
function anim(){draw();	window.requestAnimationFrame(anim);}
anim();
</script>

できるのか？

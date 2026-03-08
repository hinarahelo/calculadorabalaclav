const canvas=document.createElement("canvas");
const ctx=canvas.getContext("2d");

document.getElementById("particles").appendChild(canvas);

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const particles=[];

for(let i=0;i<120;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.5

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#a855f7";

particles.forEach(p=>{

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fill();

p.y+=p.speed;

if(p.y>canvas.height)p.y=0;

});

requestAnimationFrame(animate);

}

animate();

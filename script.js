const startScreen=document.getElementById("startScreen");
const romanticScreen=document.getElementById("romanticScreen");
const romanticText=document.getElementById("romanticText");
const choiceScreen=document.getElementById("choiceScreen");
const photoScreen=document.getElementById("photoScreen");
const photoText=document.getElementById("photoText");
const finalMessage=document.getElementById("finalMessage");
const music=document.getElementById("music");

const canvas=document.getElementById("effects");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

// ==================== Mesazhi romantik ====================
const message=`Dashuria ime e shtrenjtë Nuçi,

Kur të shoh, çdo mendim i gabuar zhduket, çdo frikë largohet. Ti je arsyeja pse zemra ime rreh më fort çdo ditë.

Çdo moment me ty është një poezi, çdo fjalë e jotja një muzikë për shpirtin tim. Nuk ka asnjë vend ku dua të jem më shumë se pranë teje.

Sot dua të të them, nga thellësia e shpirtit tim: nuk ka botë pa ty, nuk ka kuptim pa ty, nuk ka unë pa ty.

Çdo buzëqeshje jote ndez një dritë në ditët e mia më të errëta. Çdo kujtim me ty është një thesar që nuk do harrohet kurrë.

Të dua pafund ❤️
`;

// ==================== Animacione zemrash dhe lulesh ====================
let items=[];
class Effect{
 constructor(type){
  this.x=Math.random()*canvas.width;
  this.y=-10;
  this.size=Math.random()*15+5;
  this.speed=Math.random()*1.5+1;
  this.type=type;
 }
 draw(){
  if(this.type==='heart') ctx.fillStyle="#ff3366";
  else if(this.type==='flower') ctx.fillStyle="#ff99cc";
  else ctx.fillStyle="#ffd700";
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
  this.y+=this.speed;
  if(this.y>canvas.height) this.y=-10;
 }
}
function startEffects(){
 setInterval(()=>{
   const types=['heart','flower','butterfly'];
   items.push(new Effect(types[Math.floor(Math.random()*types.length)]));
 },150);
 animate();
}
function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 items.forEach(item=>item.draw());
 requestAnimationFrame(animate);
}

// ==================== Funksioni për shkrim gradual ====================
function typeWriter(text, element, speed, callback){
 let i=0;
 function type(){
   if(i<text.length){
     element.innerHTML+=text.charAt(i);
     i++;
     setTimeout(type, speed);
   }else if(callback) callback();
 }
 type();
}

// ==================== Start Screen klik ====================
startScreen.onclick=()=>{
 startScreen.classList.add("hidden");
 music.play();
 romanticScreen.classList.remove("hidden");
 startEffects();
 typeWriter(message, romanticText, 40, ()=>{
   setTimeout(()=>{romanticScreen.classList.add("hidden"); choiceScreen.classList.remove("hidden");},1000);
 });
};

// ==================== Buttons ====================
document.getElementById("yesBtn").onclick=()=>{
 choiceScreen.classList.add("hidden");
 photoScreen.classList.remove("hidden");
 document.querySelector(".photo-big").style.opacity=1;
 document.querySelector(".photo-big").style.transform="scale(1)";
 photoText.innerText="Gëzuar ditëlindjen e vogla ime. Po rritemi bashkë dhe shpresoj të plakemi bashkë.\nJe t’aime ma vie ❤️";
 setTimeout(()=>{finalMessage.classList.remove("hidden");},4000);
};

document.getElementById("noBtn").onclick=()=>{
 choiceScreen.classList.add("hidden");
 photoScreen.classList.remove("hidden");
 document.querySelector(".photo-big").style.opacity=1;
 document.querySelector(".photo-big").style.transform="scale(1)";
 photoText.innerText="Më fal për gabimet që kam bërë dhe për ditët që të kam merzitur shumë.\nBehu gati se do vij të të marr.";
 setTimeout(()=>{photoText.innerText="Je t’aime ma vie ❤️"; finalMessage.classList.remove("hidden");},4000);
};

// Nis efektet që nga fillimi
startEffects();

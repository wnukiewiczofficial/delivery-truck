function Sound(src, vol, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = vol;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  if(loop) this.sound.loop = true;
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.currentTime = 0;
    this.sound.pause();
  }
}

var ob1PNG = new Image();
ob1PNG.src = './images/obstacle1.png';

var ob2PNG = new Image();
ob2PNG.src = './images/obstacle2.png';

var ob3PNG = new Image();
ob3PNG.src = './images/obstacle3.png';

var ob4PNG = new Image();
ob4PNG.src = './images/obstacle4.png';

var packagePNG = new Image();
packagePNG.src = './images/package.png';

var housePNG = new Image();
housePNG.src = './images/house.png';

var fencePNG = new Image();
fencePNG.src = './images/fence.png';

var skyBG = new Image();
skyBG.src = './images/sky.png';

var grassPNG = new Image();
grassPNG.src = './images/grass.png';

var roadPNG = new Image();
roadPNG.src = './images/road.png';

var pavementPNG = new Image();
pavementPNG.src = './images/pavement.png';
var pavementH = canvas.height*0.05;

var nameinput = document.getElementById("name");
var emailinput = document.getElementById("email");
var sendinput = document.getElementById("send");

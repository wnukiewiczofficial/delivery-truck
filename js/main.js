var canvas = document.getElementById('canvas'); // Loading canvas from html
var ctx = canvas.getContext('2d'); // Loading 2d context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var speed = 6;
var stopped = true;

var truck = new Truck();

var scene = "menu";
var form = false;

var houses = [];
houses[0] = new House(0);
houses[1] = new House(1);
houses[2] = new House(2);

var packages = [];

var obstacles = [];
obstacles[0] = new Obstacle();

var stripe1X = 0, stripe2X = canvas.width;
var roadH = canvas.height*0.2;
function drawRoad(){
  for(i = 0; i < canvas.width/1024; i++)
    ctx.drawImage(roadPNG, i*1024, canvas.height-roadH, 1024, roadH);
  for(i = 0; i < canvas.width/256; i++)
    ctx.drawImage(pavementPNG, i*256, canvas.height-roadH-pavementH, 256, pavementH);

  ctx.fillStyle = "#FFFFFF";
  if(scene == "game") stripe1X-=speed*1.2;
  if(stripe1X + canvas.width <= 0) stripe1X = canvas.width;
  if(stripe2X + canvas.width <= 0) stripe2X = canvas.width;
  if(scene == "game") stripe2X-=speed*1.2;
  for(i = 0; i < canvas.width/(canvas.width*0.05); i++)
    ctx.fillRect(i*canvas.width*0.05+stripe1X, canvas.height-roadH/2, canvas.width*0.03, canvas.height*0.01);
  for(i = 0; i < canvas.width/(canvas.width*0.05); i++)
    ctx.fillRect(i*canvas.width*0.05+stripe2X, canvas.height-roadH/2, canvas.width*0.03, canvas.height*0.01);
}

function drawGrass(){
  for(i = 0; i < canvas.width/512; i++)
  for(j = 0; j < canvas.height/512; j++)
  ctx.drawImage(grassPNG, i*512, j*512, 512, 512);
}

var titleY = canvas.height*0.2, titleDir = -1;
function drawTitle(){
  titleY += titleDir;
  if(titleY <= canvas.height*0.18) titleDir = 1;
  if(titleY >= canvas.height*0.22) titleDir = -1;

  ctx.font = canvas.width*0.05 + "px VT323";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Truck Delivery", canvas.width/2, titleY);
}

function drawForm(){
  ctx.fillStyle = "#0e360c";
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 8;
  ctx.fillRect(canvas.width/2 - canvas.width * 0.3/2, canvas.height/2 - canvas.height * 0.3/2, canvas.width * 0.3,canvas.height*0.3);
  ctx.strokeRect(canvas.width/2 - canvas.width * 0.3/2, canvas.height/2 - canvas.height * 0.3/2, canvas.width * 0.3,canvas.height*0.3);

  ctx.font = canvas.width * 0.3*0.1 + "px VT323";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Your Name", canvas.width/2, canvas.height/2 - canvas.height*0.45/4);

  nameinput.style.display = "block";
  nameinput.style.top = "calc(50% - " + canvas.height*0.35/4 + "px)";
  nameinput.style.left = "50%";

  ctx.fillText("Your E-mail", canvas.width/2, canvas.height/2 - canvas.height*0.18/4);

  emailinput.style.display = "block";
  emailinput.style.top = "calc(50% - " + canvas.height*0.09/4 + "px)";
  emailinput.style.left = "50%";

  ctx.fillText("Send", canvas.width/2, canvas.height/2 + canvas.height*0.2/4);

  sendinput.style.display = "block";
  sendinput.style.top = "calc(50% + " + canvas.height*0.3/4 + "px)";
  sendinput.style.left = "50%";

  // Back button
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.font = canvas.width * 0.3*0.06 + "px VT323";
  ctx.fillText("Get Back", canvas.width/2 + canvas.width * 0.28/2, canvas.height/2 - canvas.height * 0.3/2);
}

var btnW = canvas.width * 0.3, btnH = canvas.height * 0.15, btnX = canvas.width/2 - btnW/2, btnY = canvas.height/2 - btnH/2;
var sbtnW = canvas.width * 0.2, sbtnH = canvas.height * 0.1, sbtnX = canvas.width/2 - sbtnW/2, sbtnY = canvas.height/2 + sbtnH;
function drawButton(text){
  ctx.fillStyle = "#0e360c";
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 8;
  if(text == "Save score"){
    ctx.fillRect(sbtnX,sbtnY,sbtnW,sbtnH);
    ctx.strokeRect(sbtnX,sbtnY,sbtnW,sbtnH);
  } else{
    ctx.fillRect(btnX,btnY,btnW,btnH);
    ctx.strokeRect(btnX,btnY,btnW,btnH);
  }


  if(text == "Save score") ctx.font = sbtnW*0.2 + "px VT323";
  else ctx.font = btnW*0.2 + "px VT323";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if(text == "Save score") ctx.fillText(text, sbtnX + sbtnW/2, sbtnY + sbtnH/2);
  else ctx.fillText(text, btnX + btnW/2, btnY + btnH/2);
}

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if(stopped){
    if(x >= btnX && x <= btnX + btnW && y >= btnY && y <= btnY + btnH){
      if(scene == "menu"){
        scene = "game";
        stopped = false;
      } else if(scene == "game" && !form){
        speed = 6;
        truck.score = 0;
        stopped = false;
        truck.reset();
        packages = [];
        obstacles = [new Obstacle()];
        houses = [new House(0), new House(1), new House(2)];
      }
    }
    if(x >= sbtnX && x <= sbtnX + sbtnW && y >= sbtnY && y <= sbtnY + sbtnH){
      if(scene == "game" && !form){
        form = true;
      }
    }

    if(x >= canvas.width/2 + canvas.width*0.17/2 && x <= canvas.width/2 + canvas.width*0.3/2 && y >= canvas.height/2 - canvas.height*0.3/2 && y <= canvas.height/2 - canvas.height*0.21/2)
    {
      if(form){
        form = false;
        nameinput.style.display = "none";
        emailinput.style.display = "none";
        sendinput.style.display = "none";
      }
    }
  }
});

// Function that is looped
function game(){
  drawGrass();
  drawRoad();

  if(scene == "menu"){
    drawTitle();
    drawButton("Play");
  }
  else if(scene == "game"){
    for(let i in houses){
      houses[i].move();
      houses[i].draw();
    }


    for(let i in packages){
      if(packages.length > 0 && !packages[i].destroyed) packages[i].move();
      if(packages.length > 0 && !packages[i].destroyed) packages[i].draw();
    }

    truck.move();
    truck.collision();

    if(truck.line == -1) truck.draw();

    for(let i in obstacles){
      if(obstacles.length > 0 && !stopped) obstacles[i].move();
      if(obstacles.length > 0) obstacles[i].draw();
    }
    if(truck.line == 1) truck.draw();

    if(stopped){
      if(!form){
        drawButton("Play Again");
        drawButton("Save score");
      } else{
        drawForm();
      }
    }
  }



	requestAnimationFrame(game);
}
game();

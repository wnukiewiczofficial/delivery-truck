class Truck{
  constructor(){
    this.img = new Image();
    this.img.src = './images/truck.png';
    this.h = canvas.height*0.25;
    this.w = canvas.width*0.18;
    this.x = this.w/2;
    this.y = canvas.height-this.h*1.4;
    this.accelerate = false;
    this.brake = false;
    this.thrown = false;
    this.laneChange = 0;
    this.line = -1;

    this.score = 0;
  }

  move(){
    if(this.accelerate){
      this.x += 15;
      this.img.src = './images/truckAccelerate.png';
    }
    else if(this.brake){
      this.x -= 15;
      this.img.src = './images/truckBrake.png';
    } else this.img.src = './images/truck.png';

    if(this.x <= 0) this.x = 0;
    if(this.x + this.w >= canvas.width) this.x = canvas.width - this.w;

    if(this.laneChange == -1){
        if(this.y > canvas.height-this.h*1.4) this.y-=10;
        else{
          this.line = -1;
          this.lineChange = 0;
        }
    }
    if(this.laneChange == 1){
        if(this.y < canvas.height-this.h) this.y+=10;
        else{
          this.line = 1;
          this.lineChange = 0;
        }
    }
  }

  collision(){
    for(let i in obstacles){
      if(this.x + this.w >= obstacles[i].x && this.x <= obstacles[i].x + obstacles[i].w &&
         this.y + this.h >= obstacles[i].y && this.y <= obstacles[i].y + obstacles[i].h)
         {
           if(this.line == obstacles[i].line){
             speed = 0;
             stopped = true;
             truck.accelerate = false;
             truck.brake = false;
           }
         }
    }
  }

  reset(){
    this.x = this.w/2;
    this.y = canvas.height-this.h*1.4;
  }

  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.font = this.w*0.3 + "px VT323";
    ctx.textBaseline = "middle";
    ctx.fillText(this.score, this.x + this.w/4, this.y+this.h/2);
  }
}

document.addEventListener('keydown', (e) => {
  if(!stopped){
    if(e.key == "ArrowRight") truck.accelerate = true;
    if(e.key == "ArrowLeft") truck.brake = true;
    if(e.key == "ArrowUp") truck.laneChange = -1;
    if(e.key == "ArrowDown") truck.laneChange = 1;
    if(e.key == " " && !truck.thrown){
      packages.push(new Package());
      truck.thrown = true;
    }
  }
});

document.addEventListener('keyup', (e) => {
  if(!stopped){
    if(e.key == "ArrowRight") truck.accelerate = false;
    if(e.key == "ArrowLeft") truck.brake = false;
    if(e.key == " ") truck.thrown = false;
  }
});

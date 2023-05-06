class Obstacle{
  constructor(){
    this.h = canvas.height*0.2;
    this.w = canvas.width*0.18;
    this.x = canvas.width;
    this.speed = speed * ((Math.random() * 2) + 1);
    if(Math.floor(Math.random() * 2) == 0){
      this.line = -1;
      this.y = canvas.height-this.h*1.5;
    } else{
      this.line = 1;
      this.y = canvas.height-this.h;
    }
    this.img = new Image();
    this.img.src = './images/obstacle' + Math.floor(Math.random() * (5-1) + 1) + '.png';
  }

  move(){
    this.x -= this.speed;
    if(this.x + this.w <= 0){
      obstacles.push(new Obstacle());
      obstacles.shift();
    }
  }

  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

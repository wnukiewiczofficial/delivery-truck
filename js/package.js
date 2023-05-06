class Package{
  constructor(){
    this.x = truck.x + truck.w/2;
    this.y = truck.y + truck.h/2;
    this.size = canvas.width*0.03;
    this.vel = 2;
    this.delivered = false;
    this.index = packages.length;
    this.destroyed = false;
  }

  move(){
    if(!this.delivered){
      this.vel += 0.6;
      this.y -= this.vel;
    }

    if((this.x + this.size <= 0 || this.y + this.size <= 0) && !this.destroyed){
      this.destroyed = true;
    }

    for(let i in houses){
      if(this.x > houses[i].fenceX && this.x + this.size < houses[i].fenceX+houses[i].fenceGap){
        if(this.y + this.size <= houses[i].y + houses[i].h - houses[i].fenceH/2){
          if(!this.delivered && !houses[i].visited){
            truck.score++;
            if(truck.score % 10 == 0) speed+=2;
          }
          this.delivered = true;
          houses[i].visited = true;
          this.x -= speed;
        }
      }
      else if((this.x > houses[i].x && this.x + this.size < houses[i].fenceX) ||
              (this.x > houses[i].fenceX + houses[i].fenceGap && this.x + this.size < houses[i].x + houses[i].w)){
        if(this.y + this.size <= houses[i].y + houses[i].h + houses[i].fenceH/2){
          this.delivered = true;
          this.x -= speed;
        }
      }
    }

  }

  draw(){
    ctx.drawImage(packagePNG, this.x, this.y, this.size, this.size);
  }
}

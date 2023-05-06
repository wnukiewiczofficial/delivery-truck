class House{
  constructor(index){
    this.w = canvas.width*0.4;
    this.h = canvas.height*0.4;
    this.space = canvas.width*0.1;
    this.x = index*(this.w+this.space);
    this.y = 0;
    this.index = index;
    this.visited = false;

    this.fenceH = canvas.height*0.1;
    this.fenceGap = canvas.width*0.1;
    this.fenceX = this.x + this.w/2 - this.fenceGap;

  }

  move(){
    this.x -= speed;
    this.fenceX -= speed;

    if(this.x + this.w <= 0){
      this.visited = false;
      this.x = canvas.width + this.space;
      this.fenceX = this.x + this.w/2 - this.fenceGap;
    }


  }

  draw(){
    // Drawing house
    ctx.drawImage(housePNG, this.x, this.y, this.w, this.h);

    // Fence
    ctx.drawImage(fencePNG, this.x, this.y+this.h-this.fenceH, this.fenceX-this.x, this.fenceH);
    ctx.drawImage(fencePNG, this.fenceX + this.fenceGap, this.y+this.h-this.fenceH, this.fenceX-this.x, this.fenceH);
    ctx.drawImage(fencePNG, this.fenceX + this.fenceGap + this.fenceX-this.x-10, this.y+this.h-this.fenceH, this.fenceX-this.x, this.fenceH);

  }
}

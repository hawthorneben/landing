function Particle() {
  this.pos = createVector(random(width), height);
  this.vel = createVector();
  this.acc = createVector();
  
  this.prev = this.pos.copy();
  
  this.maxVel = 2;
  
  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.acc.mult(0);
    
    this.edges();
  }
  
  this.show = function() {
    stroke(255, 7);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    this.prev = this.pos.copy();
  }
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.edges = function() {
    if (this.pos.x > width) { 
      this.pos.x = 0;
      this.prev = this.pos.copy();
    }
    if (this.pos.x < 0) { 
      this.pos.x = width;
      this.prev = this.pos.copy();
    }
    if (this.pos.y > height) { 
      this.pos.y = 0;
      this.prev = this.pos.copy();
    }
    if (this.pos.y < 0) { 
      this.pos.y = height;
      this.prev = this.pos.copy();
    }
  }
}

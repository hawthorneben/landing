function Cell(radius, pos, color) {
    this.pos = pos;
    this.vel = createVector();
    this.acc = createVector();
    this.r = radius;
    this.color = color;
    this.iterations = 1;
    this.attemptReproduce = floor(random(200, 300));
}

Cell.prototype.touched = function() {
    if (p5.Vector.dist(this.pos, createVector(mouseX, mouseY)) < this.r / 2) {
        return true;
    }
    return false;
}

Cell.prototype.applyForce = function(force) {
    this.acc.add(force);
}

Cell.prototype.run = function() {
    this.update();
    this.show();
}

Cell.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.vel.mult(0.95);
    this.acc.mult(0);
    
    this.edges();
    if (this.iterations % this.attemptReproduce == 0) {
        if (random() < map(this.r, 15, 100, 0.00, 0.6)) {
            this.dueToSplit = true;
        }
    }

    this.iterations++;
}

Cell.prototype.show = function() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
}

Cell.prototype.intersects = function(other) {
    var dist = p5.Vector.dist(this.pos, other.pos);
    if (dist < (this.r / 2 + other.r / 2)) {
        var dist = p5.Vector.dist(this.pos, other.pos);
        var mag = 1 / dist;
        var force = p5.Vector.sub(this.pos, other.pos).normalize().mult(mag);
        this.applyForce(force);
        other.applyForce(force.mult(-1));
    }
}

Cell.prototype.reproduce = function() {
    var newLevels = [];
    for (var i = 0; i < 3; i++) {
        newLevels.push(this.color.levels[i] + 10);
    }
    var newColor = color(newLevels);

    this.r *= 0.8;
    var offspring = new Cell(this.r, this.pos.copy(), newColor);
    this.pos.x += 5;
    offspring.pos.x -= 5;
    this.vel.add(createVector(-1, random(-1, 1)));
    offspring.vel.add(createVector(1, random(-1, 1)));
    //if (this.r < 5)
        this.dueToSplit = false;
    //this.dueToSplit = false;
    return offspring;
}

Cell.prototype.edges = function() {
    if (this.pos.x > width) { 
        this.pos.x = 0;
    }
    if (this.pos.x < 0) { 
        this.pos.x = width;
    }
    if (this.pos.y > height) { 
        this.pos.y = 0;
    }
    if (this.pos.y < 0) { 
        this.pos.y = height;
    }
}
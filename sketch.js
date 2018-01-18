var cells = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(200);
    cells.push(new Cell(100, createVector(width / 2, height / 2), color(random(100), random(100), random(100))));
}

function draw() {
    background(200);
    for (var i = cells.length - 1; i >= 0; i--) {
        var cell = cells[i];
        
        cell.run();

        if (cell.dueToSplit) {
            cells.push(cell.reproduce());
        }

        cell.applyForce(p5.Vector.random2D().mult(0.1));
        for (var j = 0; j < cells.length; j++) {
            if (j != i) {
                cell.intersects(cells[j]);
            }
        }
    }
}

function mousePressed() {
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];

        if (cell.touched()) {
            cells.push(cell.reproduce());
        }
    }
}

'use strict';

class Cell {
    constructor(color, pos) {
        this.color = color;
        this.relativePosition = pos; // relative to parent cluster top left corner (cluster.pos)
    }

    move = vector => {
        this.relativePosition.x += vector.x;
        this.relativePosition.y += vector.y;
    };
}

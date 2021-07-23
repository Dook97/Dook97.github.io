'use strict';

class Cell {
    constructor(color, position) {
        this.color = color;
        this.relativePosition = position; // relative to parent cluster top left corner (cluster.pos)
    }

    move = vector => {
        this.relativePosition.x += vector.x;
        this.relativePosition.y += vector.y;
    };

    moveTo = point => {
        this.relativePosition = point;
    };
}

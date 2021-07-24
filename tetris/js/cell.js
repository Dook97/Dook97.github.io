'use strict';

class Cell {
    constructor(position) {
        this.relativePosition = position; // relative to parent cluster top left corner (cluster.position)
    }

    move = vector => {
        this.relativePosition.x += vector.x;
        this.relativePosition.y += vector.y;
    };

    moveTo = point => {
        this.relativePosition = point;
    };
}

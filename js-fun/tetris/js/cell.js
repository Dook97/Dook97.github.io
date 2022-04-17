'use strict';

class Cell {
    constructor(position, parent) {
        this.relativePosition = position; // relative to parent cluster top left corner (cluster.position)
        this.parent = parent;
    }

    move = vector => {
        this.relativePosition.x += vector.x;
        this.relativePosition.y += vector.y;
    };

    moveTo = point => {
        this.relativePosition = point;
    };

    getPosition = () => ({ x: this.relativePosition.x + this.parent.position.x, y: this.relativePosition.y + this.parent.position.y });
}

'use strict';

class Playfield {
    constructor(xSize, ySize) {
        this.grid = new Array(xSize).fill(new Array(ySize).fill({ present: false, color: undefined }));
    }

    checkCellAvailability = position => !grid[position.x][position.y].present;

    reserveCell = (position, color) => this.grid[position.x][position.y] = { present: true, color: color };
}

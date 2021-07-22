'use strict';

class Playfield {
    constructor(xSize, ySize) {
        this.grid = new Array(ySize).fill(new Array(xSize).fill({ present: false, color: undefined }));
    }

    checkCellAvailability = pos => !grid[pos.x][pos.y].present;
}

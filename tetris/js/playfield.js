'use strict';

class Playfield {
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.grid = [];
        for (let i = 0; i < ySize; i++) {
            this.grid.push([]);
            for (let j = 0; j < xSize; j++) {
                this.grid[i].push('');
            }
        }
    }

    checkCellAvailability = position => {
        if (position.x >= 0 && position.x < this.xSize && position.y < this.ySize) {
            return !this.grid[position.y][position.x];
        }
        return false;
    };

    reserveCell = (position, color) => {
        this.grid[position.y][position.x] = color;
    };
}

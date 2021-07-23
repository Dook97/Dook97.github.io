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

    checkCellAvailability = position => (position.x >= 0 && position.x < this.xSize && position.y < this.ySize ? !this.grid[position.y][position.x] : false);

    deleteFullRows = () => {
        let fullRowsIndexes = this.findFullRowsIndexes();
        for (let i = 0; i < fullRowsIndexes.length; i++) {
            this.grid.splice(fullRowsIndexes[i], 1);
            this.grid = [new Array(this.xSize).fill(''), ...this.grid];
        }
        return fullRowsIndexes.length;
    };

    findFullRowsIndexes = () => {
        let out = [];
        this.grid.forEach((_, i, arr) => out = arr[i].every(val => Boolean(val)) ? [...out, i] : out);
        console.log(out);
        return out;
    };

    reserveCell = (position, color) => {
        this.grid[position.y][position.x] = color;
    };
}

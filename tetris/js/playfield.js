'use strict';

class Playfield {
    constructor(xSize, ySize, yOffset) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.yOffset = yOffset;
        this.grid = [];
        for (let i = 0; i < ySize; i++) {
            this.grid.push(new Array(xSize).fill(''));
        }
    }

    checkCellAvailability = position => (position.x >= 0 && position.x < this.xSize && position.y < this.ySize ? !this.grid[position.y][position.x] : false);

    checkGameEndCondition = () => (this.grid[this.yOffset].every(value => !value) ? false : true); // if theres a cell at the top of the visible grid

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
        return out;
    };

    reserveCell = (position, color) => {
        this.grid[position.y][position.x] = color;
    };
}

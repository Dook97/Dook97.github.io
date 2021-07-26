'use strict';

class Playfield {
    constructor(xSize, ySize, yOffset) {
        this.xSize = xSize; // grid width
        this.ySize = ySize + yOffset; // grid height - yOffset included
        this.yOffset = yOffset; // number of invisible rows used for spawning of new tetrominos
        this.grid = this.getEmptyGrid();
    }

    getEmptyGrid = () => {
        let grid = [];
        for (let i = 0; i < this.ySize; i++) {
            grid.push(new Array(this.xSize).fill(''));
        }
        return grid;
    };

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
        this.grid.forEach((_, i, arr) => (out = arr[i].every(val => Boolean(val)) ? [...out, i] : out));
        return out;
    };

    reserveCell = (position, color) => (this.grid[position.y][position.x] = color);

    // returns distance from active cluster to the nearest downward obstacle
    getCollisionDistance = cluster => {
        let minDistance = this.ySize;
        let maxY = 0;
        cluster.children.forEach(cell => {
            let cellX = cluster.position.x + cell.relativePosition.x;
            let cellY = cluster.position.y + cell.relativePosition.y;
            this.grid.forEach((row, i) => {
                if (i > cellY && i - (cellY + 1) < minDistance && row[cellX]) {
                    minDistance = i - (cellY + 1);
                }
            });
            if (cellY > maxY) {
                maxY = cellY;
            }
        });
        return minDistance !== this.ySize ? minDistance : this.ySize - 1 - maxY;
    };
}

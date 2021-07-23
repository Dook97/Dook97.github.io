'use strict';

class Painter {
    constructor(playfield, yOffset, colors) {
        this.colors = colors;
        this.canvas = document.querySelector('canvas');
        this.yOffset = yOffset;
        this.scaleX = this.canvas.width / playfield.xSize;
        this.scaleY = this.canvas.height / (playfield.ySize - yOffset);
        this.context = this.canvas.getContext('2d');
        this.playfield = playfield;
        this.cluster;
    }

    getCluster = cluster => this.cluster = cluster;

    paint = () => {
        this.context.clearRect(0, 0, this.scaleX * this.playfield.xSize, this.scaleY * (this.playfield.ySize - this.yOffset));
        for (let i = 0; i < this.playfield.grid.length; i++) {
            for (let j = 0; j < this.playfield.grid[i].length; j++) {
                if (this.playfield.grid[i][j]) {
                    this.context.fillStyle = this.playfield.grid[i][j];
                    this.context.fillRect(j * this.scaleX + 1, (i - this.yOffset) * this.scaleY + 1, this.scaleX - 1, this.scaleY - 1);
                }
            }
        }
        this.cluster.children.forEach(cell => {
            this.context.fillStyle = cell.color;
            this.context.fillRect(
                (this.cluster.position.x + cell.relativePosition.x) * this.scaleX + 1,
                (this.cluster.position.y + cell.relativePosition.y - this.yOffset) * this.scaleY + 1,
                this.scaleX - 1,
                this.scaleY - 1
            );
        });
        requestAnimationFrame(this.paint);
    };
}

'use strict';

class Painter {
    constructor(playfield) {
        this.colors = ['#0341AE', '#72CB3B', '#FFD500', '#FF971C', '#FF3213'];
        this.canvas = document.querySelector('canvas');
        this.scaleX = this.canvas.width / playfield.xSize;
        this.scaleY = this.canvas.height / playfield.ySize;
        this.context = this.canvas.getContext('2d');
        this.playfield = playfield;
        this.cluster = new Object();
    }

    getCluster = cluster => this.cluster = cluster;

    paint = () => {
        this.context.clearRect(0, 0, this.scaleX * 10, this.scaleY * 20);
        for (let i = 0; i < this.playfield.grid.length; i++) {
            for (let j = 0; j < this.playfield.grid[i].length; j++) {
                if (this.playfield.grid[i][j]) {
                    this.context.fillStyle = this.playfield.grid[i][j];
                    this.context.fillRect(j * this.scaleY + 1, i * this.scaleX + 1, this.scaleX - 1, this.scaleY - 1);
                }
            }
        }
        for (const cell of this.cluster.children) {
            this.context.fillStyle = cell.color;
            this.context.fillRect(
                (this.cluster.position.x + cell.relativePosition.x) * this.scaleX + 1,
                (this.cluster.position.y + cell.relativePosition.y) * this.scaleY + 1,
                this.scaleX - 1,
                this.scaleY - 1
            );
        }
        requestAnimationFrame(this.paint);
    };
}

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
        this.gameStatus = true; // true for running false for the opposite
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
        if (!this.gameStatus) {
            this.paintEndGame();
        }
        requestAnimationFrame(this.paint);
    };

    paintEndGame = () => {
        this.context.fillStyle = 'rgba(0, 0, 0, 0.85)';
        this.context.fillRect(0, this.canvas.height / 2 - 50, this.canvas.width, 75);
        this.context.fillStyle = 'green';
        this.context.textAlign = 'center';
        this.context.font = '50px monospace';
        this.context.fillText('game over', this.canvas.width / 2, this.canvas.height / 2);
    };
}

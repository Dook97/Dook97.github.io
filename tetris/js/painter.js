'use strict';

class Painter {
    constructor(playfield, yOffset, colors, canvas, sideCanvas, statusElements) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.sideCanvas = sideCanvas;
        this.sideCtx = sideCanvas.getContext('2d');
        this.sideScaleX = sideCanvas.width / 4;
        this.sideScaleY = sideCanvas.height / 3;
        this.sideCtx.fillStyle = 'green';

        this.playfield = playfield;
        this.cluster; // active tetromino
        this.nextCluster; // queued tetromino

        this.statusElements = statusElements;
        this.colors = colors; // tetrominos colors
        this.yOffset = yOffset; // number of invisible rows used for spawning of new tetrominos
        this.scaleX = canvas.width / playfield.xSize; // width of one cell
        this.scaleY = canvas.height / (playfield.ySize - yOffset); // height of one cell
        this.gameStatus = 'running'; // options: running, paused, end
    }

    // main graphics method
    paint = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sideCtx.clearRect(0, 0, this.sideCanvas.width, this.sideCanvas.height);
        this.highlightActiveColumns();
        this.paintFrozenCells();
        this.paintActiveCluster();
        this.paintNextCluster();
        if (this.gameStatus === 'paused') {
            this.paintBanner('Paused');
        } else if (this.gameStatus === 'end') {
            this.paintBanner('Game Over');
        }
        requestAnimationFrame(this.paint);
    };

    paintFrozenCells = () => {
        for (let i = 0; i < this.playfield.grid.length; i++) {
            for (let j = 0; j < this.playfield.grid[i].length; j++) {
                if (this.playfield.grid[i][j]) {
                    this.paintCell({ x: j, y: i - this.yOffset }, this.playfield.grid[i][j]);
                }
            }
        }
    };

    paintActiveCluster = () => {
        this.cluster.children.forEach(cell => {
            this.paintCell({ x: this.cluster.position.x + cell.relativePosition.x, y: this.cluster.position.y + cell.relativePosition.y - this.yOffset }, this.cluster.color);
        });
    };

    paintNextCluster = () => {
        this.nextCluster.rotations[0].forEach(val => {
            this.sideCtx.fillRect(val.x * this.sideScaleX + 1, val.y * this.sideScaleY + 1, this.sideScaleX - 1, this.sideScaleY - 1);
        });
    };

    paintCell = (position, color) => {
        let gradient = this.ctx.createRadialGradient(
            position.x * this.scaleX,
            position.y * this.scaleY,
            this.scaleX,
            (position.x + 1) * this.scaleX,
            (position.y + 1) * this.scaleY,
            this.scaleX / 2
        );
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, color);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(position.x * this.scaleX + 1, position.y * this.scaleY + 1, this.scaleX - 1, this.scaleY - 1);
    };

    // highlits columns of the canvas in which there are cells of an active cluster
    highlightActiveColumns = () => {
        this.ctx.fillStyle = 'rgb(7, 7, 7)';
        this.cluster.children.forEach(cell => this.ctx.fillRect((this.cluster.position.x + cell.relativePosition.x) * this.scaleX, 0, this.scaleX, this.canvas.height));
    };

    paintBanner = text => {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.90)';
        this.ctx.fillRect(0, this.canvas.height / 2 - 50, this.canvas.width, 75);
        this.ctx.fillStyle = 'green';
        this.ctx.textAlign = 'center';
        this.ctx.font = '50px pixel';
        this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
    };

    fillPageStats = (score, turns, rows, time) => {
        this.statusElements.score.innerHTML = score;
        this.statusElements.turns.innerHTML = turns;
        this.statusElements.rows.innerHTML = rows;
        this.statusElements.time.innerHTML = this.formatTime(time);
        this.statusElements.status.innerHTML = this.gameStatus;
    };

    formatTime = milis => `${Math.floor(milis / 60000)}m ${Math.floor((milis % 60000) / 1000)}s`;
}

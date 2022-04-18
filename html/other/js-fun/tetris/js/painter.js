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

    paint = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sideCtx.clearRect(0, 0, this.sideCanvas.width, this.sideCanvas.height);
        this.paintClusterShadow();
        this.paintCluster();
        this.paintFrozenCells();
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
                    this.paintCell({ x: j, y: i }, this.playfield.grid[i][j]);
                }
            }
        }
    };

    paintCluster = () => this.cluster.children.forEach(cell => this.paintCell(cell.getPosition(), this.cluster.color));

    paintClusterShadow = () => {
        let collisionDistance = this.playfield.getCollisionDistance(this.cluster);
        this.cluster.children.forEach(cell => this.paintCell({ x: cell.getPosition().x, y: cell.getPosition().y + collisionDistance }, this.cluster.color, true));
    };

    paintNextCluster = () => {
        this.nextCluster.childrenPositions.forEach(val =>
            this.sideCtx.fillRect(val.x * this.sideScaleX + 1, val.y * this.sideScaleY + 1, this.sideScaleX - 1, this.sideScaleY - 1)
        );
    };

    paintCell = (position, color, strokeMode = false) => {
        let args = [position.x * this.scaleX + 1, (position.y - this.yOffset) * this.scaleY + 1, this.scaleX - 1, this.scaleY - 1];
        if (strokeMode) {
            this.ctx.strokeStyle = color;
            this.ctx.strokeRect(...args);
        } else {
            let gradient = this.ctx.createRadialGradient(args[0], args[1], this.scaleX, args[0] + this.scaleX, args[1] + this.scaleY, this.scaleX / 2);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, color);
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(...args);
        }
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

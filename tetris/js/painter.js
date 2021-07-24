'use strict';

class Painter {
    constructor(playfield, yOffset, colors, canvas, statusElements) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.playfield = playfield;
        this.cluster; // active tetromino

        this.statusElements = statusElements;
        this.colors = colors; // tetrominos colors
        this.yOffset = yOffset; // number of invisible rows used for spawning of new tetrominos
        this.scaleX = canvas.width / playfield.xSize; // width of one cell
        this.scaleY = canvas.height / (playfield.ySize - yOffset); // height of one cell
        this.gameStatus = 'running'; // options: running, paused, end
    }

    // main graphics method
    paint = () => {
        this.ctx.clearRect(0, 0, this.scaleX * this.playfield.xSize, this.scaleY * (this.playfield.ySize - this.yOffset));
        this.paintFrozenCells();
        this.paintActiveCluster();
        if (this.gameStatus === 'paused') {
            this.paintPause();
        } else if (this.gameStatus === 'end') {
            this.paintEndGame();
        }
        requestAnimationFrame(this.paint);
    };

    paintFrozenCells = () => {
        for (let i = 0; i < this.playfield.grid.length; i++) {
            for (let j = 0; j < this.playfield.grid[i].length; j++) {
                if (this.playfield.grid[i][j]) {
                    this.ctx.fillStyle = this.playfield.grid[i][j];
                    this.ctx.fillRect(j * this.scaleX + 1, (i - this.yOffset) * this.scaleY + 1, this.scaleX - 1, this.scaleY - 1);
                }
            }
        }
    };

    paintActiveCluster = () => {
        this.cluster.children.forEach(cell => {
            this.ctx.fillStyle = cell.color;
            this.ctx.fillRect(
                (this.cluster.position.x + cell.relativePosition.x) * this.scaleX + 1,
                (this.cluster.position.y + cell.relativePosition.y - this.yOffset) * this.scaleY + 1,
                this.scaleX - 1,
                this.scaleY - 1
            );
        });
    };

    // paint a 'game over' banner
    paintEndGame = () => {
        this.paintBanner('Game Over');
    };

    paintPause = () => {
        this.paintBanner('Paused');
    };

    paintBanner = text => {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.90)';
        this.ctx.fillRect(0, this.canvas.height / 2 - 50, this.canvas.width, 75);
        this.ctx.fillStyle = 'green';
        this.ctx.textAlign = 'center';
        this.ctx.font = '50px monospace';
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

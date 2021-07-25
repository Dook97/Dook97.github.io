'use strict';

class Manager {
    constructor(tick, xSize, ySize, yOffset, colors) {
        this.statusElements = {
            score: document.querySelector('#score'),
            turns: document.querySelector('#turns'),
            rows: document.querySelector('#rows'),
            time: document.querySelector('#time'),
            status: document.querySelector('#status'),
        };
        this.canvas = document.querySelector('#main-canvas');
        this.sideCanvas = document.querySelector('#side-canvas');

        this.playfield = new Playfield(xSize, ySize, yOffset);
        this.painter = new Painter(this.playfield, yOffset, colors, this.canvas, this.sideCanvas, this.statusElements);

        this.nextCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.cluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.painter.cluster = this.cluster;
        this.painter.nextCluster = this.nextCluster;

        this.prevColor = 'none';
        this.tick = tick; // game step duration
        this.score = 0;
        this.turns = 0;
        this.rows = 0;
        this.time = 0;
        this.setEvents();
    }

    // game loop
    loop = () => {
        this.painter.fillPageStats(this.score, this.turns, this.rows, this.time);
        setTimeout(() => {
            if (this.painter.gameStatus === 'running') {
                this.time += this.tick;
                this.turns++;
                if (!this.cluster.move({ x: 0, y: 1 })) {
                    this.changeActiveCluster();
                    let deletedRowsCount = this.playfield.deleteFullRows();
                    this.rows += deletedRowsCount;
                    this.score += 10 * (2 ** deletedRowsCount - 1);
                    if (this.playfield.checkGameEndCondition()) {
                        this.painter.gameStatus = 'end';
                    }
                }
            }
            this.loop();
        }, this.tick);
    };

    changeActiveCluster = () => {
        this.cluster.freeze();
        this.cluster = this.nextCluster;
        this.nextCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.painter.cluster = this.cluster;
        this.painter.nextCluster = this.nextCluster;
    };

    // choose random type and color; color is guaranteed to be different from previous tetrominos color
    getRandClusterArgs = () => [
        ['I', 'J', 'L', 'O', 'S', 'T', 'Z'][Math.floor(Math.random() * 7)],
        this.painter.colors.filter(color => color !== this.prevColor)[Math.floor(Math.random() * (this.painter.colors.length - 1))],
    ];

    prepareNewCluster = (type, color) => {
        this.prevColor = color;
        if (type === 'I') return new I(color, this.playfield);
        if (type === 'J') return new J(color, this.playfield);
        if (type === 'L') return new L(color, this.playfield);
        if (type === 'O') return new O(color, this.playfield);
        if (type === 'S') return new S(color, this.playfield);
        if (type === 'T') return new T(color, this.playfield);
        if (type === 'Z') return new Z(color, this.playfield);
    };

    // set keypress events for game control
    setEvents = () => {
        document.addEventListener('keypress', e => {
            if (e.key.toLowerCase() === 'w' && this.painter.gameStatus === 'running') this.cluster.rotate();
            else if (e.key.toLowerCase() === 'a' && this.painter.gameStatus === 'running') this.cluster.move({ x: -1, y: 0 });
            else if (e.key.toLowerCase() === 'd' && this.painter.gameStatus === 'running') this.cluster.move({ x: 1, y: 0 });
            else if (e.key.toLowerCase() === 's' && this.painter.gameStatus === 'running') this.cluster.drop();
            else if (e.key.toLowerCase() === 'r') this.restart();
            else if (e.key.toLowerCase() === 'p') this.painter.gameStatus = this.painter.gameStatus === 'running' ? 'paused' : 'running';
        });
    };

    restart = () => {
        this.painter.gameStatus = 'running';
        this.changeActiveCluster();
        this.playfield.grid = this.playfield.getEmptyGrid();
        this.score = 0;
        this.turns = 0;
        this.rows = 0;
        this.time = 0;
    };
}

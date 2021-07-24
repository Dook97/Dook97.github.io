'use strict';

class Manager {
    constructor(tick, xSize, ySize, yOffset, colors) {
        this.playfield = new Playfield(xSize, ySize + yOffset, yOffset);
        this.painter = new Painter(this.playfield, yOffset, colors, document.querySelector('canvas'));

        this.preparedCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.activeCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.painter.cluster = this.activeCluster;

        this.tick = tick; // game step duration
        this.defaultTick = tick;
        this.score = 0;
        this.setEvents();
    }

    // game loop & logic
    loop = () => {
        setTimeout(() => {
            this.tick = this.defaultTick;
            if (!this.activeCluster.move({ x: 0, y: 1 })) {
                this.changeActiveCluster();
                this.score += 10 * 2 ** this.playfield.deleteFullRows();
                this.tick = 0;
                if (this.playfield.checkGameEndCondition()) {
                    this.painter.gameStatus = false;
                    return;
                }
            }
            this.loop();
        }, this.tick);
    };

    changeActiveCluster = () => {
        this.activeCluster.freeze();
        this.activeCluster = this.preparedCluster;
        this.preparedCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.painter.cluster = this.activeCluster;
    };

    getRandClusterArgs = () => [['I', 'J', 'L', 'O', 'S', 'T', 'Z'][Math.floor(Math.random() * 7)], this.painter.colors[Math.floor(Math.random() * this.painter.colors.length)]];

    prepareNewCluster = (type, color) => {
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
            if (e.key.toLowerCase() === 'w') this.activeCluster.rotate();
            else if (e.key.toLowerCase() === 'a') this.activeCluster.move({ x: -1, y: 0 });
            else if (e.key.toLowerCase() === 'd') this.activeCluster.move({ x: 1, y: 0 });
            else if (e.key.toLowerCase() === 's') this.activeCluster.drop();
        });
    };
}

'use strict';

class Manager {
    constructor(painter, playfield, tick) {
        this.tick = tick;
        this.painter = painter;
        this.playfield = playfield;
        this.activeCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.preparedCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.setEvents();
    }

    loop = () => {
        setTimeout(() => {
            this.painter.getCluster(this.activeCluster);
            if (!this.activeCluster.move({ x: 0, y: 1 })) {
                //console.log(this.activeCluster.position);
                this.activeCluster.freeze();
                this.changeActiveCluster();
            }
            this.loop();
        }, this.tick);
    };

    changeActiveCluster = () => {
        this.activeCluster = this.preparedCluster;
        this.preparedCluster = this.prepareNewCluster(...this.getRandClusterArgs());
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

    setEvents = () => {
        document.addEventListener('keypress', e => {
            // right rotate
            if (e.key === 'w') this.activeCluster.rotate();
            // left move
            else if (e.key === 'a') this.activeCluster.move({ x: -1, y: 0 });
            // right move
            else if (e.key === 'd') this.activeCluster.move({ x: 1, y: 0 });
            // drop
            else if (e.key === 's') this.activeCluster.drop();
        });
    };
}

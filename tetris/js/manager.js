'use strict';

class Manager {
    constructor() {
        this.painter = new Painter();
        this.activeCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.preparedCluster = this.prepareNewCluster(...this.getRandClusterArgs());
        this.setEvents();
    }

    changeActiveCluster = () => {
        this.activeCluster = this.preparedCluster;
        this.preparedCluster = this.prepareNewCluster(...this.getRandClusterArgs());
    };

    getRandClusterArgs = () => [['I', 'J', 'L', 'O', 'S', 'T', 'Z'][Math.floor(Math.random() * 7)], this.painter.colors[Math.floor(Math.random() * this.colors.length)]];

    prepareNewCluster = (type, color) => {
        this.preparedCluster =
            type === 'I'
                ? new I(color, this)
                : type === 'J'
                ? new J(color, this)
                : type === 'L'
                ? new L(color, this)
                : type === 'O'
                ? new O(color, this)
                : type === 'S'
                ? new S(color, this)
                : type === 'T'
                ? new T(color, this)
                : new Z(color, this);
    };

    setEvents = () => {
        document.addEventListener('keypress', e => {
            e.key === 'ArrowDown'
                ? this.activeCluster.rotate(-1) // left rotate
                : e.key === 'ArrowUp'
                ? this.activeCluster.rotate(1) // right rotate
                : e.key === 'ArrowLeft'
                ? this.activeCluster.move({ x: -1, y: 0 }) // left move
                : e.key === 'ArrowRight'
                ? this.activeCluster.move({ x: 1, y: 0 }) // right move
                : this.activeCluster.drop();
        });
    };
}

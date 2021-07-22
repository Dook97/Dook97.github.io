'use strict';

class Cluster {
    constructor(color, playfield) {
        this.children;
        this.color = color;
        this.playfield = playfield;
        this.rotationIndex = 0;
        this.position = { x: 0, y: 0 };
    }

    getChildren = (positions, color) => {
        for (const position of positions) {
            this.children = [...this.children, new Cell(color, position)];
        }
    };

    rotate = direction => {
        this.rotationIndex = (this.rotationIndex + direction) % 4 < 0 ? 3 : (this.rotationIndex + direction) % 4;
        //todo
    };

    checkMoveLegality = vector => {
        for (const child of children) {
            if (!this.playfield.checkCellAvailability({ x: this.position.x + child.relativePosition.x + vector.x, y: this.position.y + child.relativePosition.y + vector.y })) {
                console.log(`err: invalid move arg "${vector}" (out of bounds)`);
                return false;
            }
        }
        return true;
    };

    move = vector => {
        if (checkMoveLegality(vector)) {
            for (const child of children) {
                child.move(vector);
            }
        }
    };

    drop = () => {};
}

class I extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
    }
}

class J extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
    }
}

class L extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
    }
}

class O extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
    }
}

class S extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
    }
}

class T extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
    }
}

class Z extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
    }
}

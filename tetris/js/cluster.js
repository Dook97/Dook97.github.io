'use strict';

class Cluster {
    constructor(color, playfield) {
        this.color = color;
        this.playfield = playfield;
        this.children = [];
        this.rotationIndex = 0;
        this.position = { x: 0, y: 0 };
    }

    freeze = () => {
        for (const child of this.children) {
            this.playfield.reserveCell({ x: this.position.x + child.relativePosition.x, y: this.position.y + child.relativePosition.y }, child.color);
        }
    };

    getChildren = positions => {
        for (const position of positions) {
            this.children = [...this.children, new Cell(this.color, position)];
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
        if (this.checkMoveLegality(vector)) {
            this.position.x += vector.x;
            this.position.y += vector.y;
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

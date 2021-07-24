'use strict';

class Cluster {
    constructor(color, playfield) {
        this.color = color; // tetromino color inherited by its cells
        this.playfield = playfield;
        this.children = [];
        this.rotationIndex = 0;
        this.position = { x: 0, y: 0 }; // top left corner of the imaginary tetromino container
        this.rotations; // array of all possible rotations - specified in child classes
    }

    freeze = () => {
        this.children.forEach(child => this.playfield.reserveCell({ x: this.position.x + child.relativePosition.x, y: this.position.y + child.relativePosition.y }, child.color));
    };

    getChildren = () => {
        this.rotations[this.rotationIndex].forEach(position => this.children.push(new Cell(this.color, position)));
    };

    rotate = () => {
        let newRotationIndex = (this.rotationIndex + 1) % this.rotations.length;
        if (this.rotations[newRotationIndex].every(value => this.playfield.checkCellAvailability({ x: this.position.x + value.x, y: this.position.y + value.y }))) {
            this.rotationIndex = newRotationIndex;
            this.children.forEach((child, i) => child.moveTo(this.rotations[this.rotationIndex][i]));
        }
    };

    checkMoveLegality = vector =>
        this.children.every(child =>
            this.playfield.checkCellAvailability({ x: this.position.x + child.relativePosition.x + vector.x, y: this.position.y + child.relativePosition.y + vector.y })
        );

    move = vector => {
        if (this.checkMoveLegality(vector)) {
            this.position.x += vector.x;
            this.position.y += vector.y;
            return true;
        }
        return false;
    };

    drop = () => {
        while (this.move({ x: 0, y: 1 })) {}
    };
}

class I extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        // prettier-ignore
        this.rotations = [
            [{x : 0, y : 1}, {x : 1, y : 1}, {x : 2, y : 1}, {x : 3, y : 1}],
            [{x : 2, y : 0}, {x : 2, y : 1}, {x : 2, y : 2}, {x : 2, y : 3}],
            [{x : 0, y : 2}, {x : 1, y : 2}, {x : 2, y : 2}, {x : 3, y : 2}],
            [{x : 1, y : 0}, {x : 1, y : 1}, {x : 1, y : 2}, {x : 1, y : 3}]
        ];
        this.getChildren();
        this.position = { x: 3, y: 1 };
    }
}

class J extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        // prettier-ignore
        this.rotations = [
            [{x : 1, y : 0}, {x : 1, y : 1}, {x : 0, y : 2}, {x : 1, y : 2}],
            [{x : 0, y : 0}, {x : 0, y : 1}, {x : 1, y : 1}, {x : 2, y : 1}],
            [{x : 1, y : 0}, {x : 2, y : 0}, {x : 1, y : 1}, {x : 1, y : 2}],
            [{x : 0, y : 1}, {x : 1, y : 1}, {x : 2, y : 1}, {x : 2, y : 2}]
        ];
        this.getChildren();
        this.position = { x: 4, y: 0 };
    }
}

class L extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        // prettier-ignore
        this.rotations = [
            [{x : 1, y : 0}, {x : 1, y : 1}, {x : 2, y : 2}, {x : 1, y : 2}],
            [{x : 0, y : 2}, {x : 0, y : 1}, {x : 1, y : 1}, {x : 2, y : 1}],
            [{x : 1, y : 0}, {x : 0, y : 0}, {x : 1, y : 1}, {x : 1, y : 2}],
            [{x : 0, y : 1}, {x : 1, y : 1}, {x : 2, y : 1}, {x : 2, y : 0}]
        ];
        this.getChildren();
        this.position = { x: 3, y: 0 };
    }
}

class O extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        // prettier-ignore
        this.rotations = [
            [{x : 0, y : 0}, {x : 1, y : 0}, {x : 0, y : 1}, {x : 1, y : 1}]
        ];
        this.getChildren();
        this.position = { x: 4, y: 1 };
    }
}

class S extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        // prettier-ignore
        this.rotations = [
            [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}],
            [{x: 1, y: 1}, {x: 2, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}],
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}]
        ];
        this.getChildren();
        this.position = { x: 4, y: 1 };
    }
}

class T extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        // prettier-ignore
        this.rotations = [
            [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
            [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
            [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}]
        ];
        this.getChildren();
        this.position = { x: 4, y: 1 };
    }
}

class Z extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        // prettier-ignore
        this.rotations = [           
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}],
            [{x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
            [{x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
            [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}]
        ];
        this.getChildren();
        this.position = { x: 4, y: 1 };
    }
}

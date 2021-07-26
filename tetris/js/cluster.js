'use strict';

class Cluster {
    constructor(color, playfield) {
        this.color = color; // tetromino color
        this.playfield = playfield;
        this.children = [];
    }

    freeze = () => this.children.forEach(cell => this.playfield.reserveCell(cell.getPosition(), this.color));

    getChildren = () => this.childrenPositions.forEach(position => this.children.push(new Cell(position, this)));

    rotate = () => {
        if (this.children.every(child => this.playfield.checkCellAvailability({ x: this.position.x + this.edgeLength - 1 - child.relativePosition.y, y: this.position.y + child.relativePosition.x }))) {
            this.children.forEach(child => child.moveTo({ x: this.edgeLength - 1 - child.relativePosition.y, y: child.relativePosition.x }));
        }
    };

    checkMoveLegality = vector => this.children.every(cell => this.playfield.checkCellAvailability({ x: cell.getPosition().x + vector.x, y: cell.getPosition().y + vector.y }));

    move = vector => {
        if (this.checkMoveLegality(vector)) {
            this.position.x += vector.x;
            this.position.y += vector.y;
            return true;
        }
        return false;
    };

    drop = () => this.move({ x: 0, y: this.playfield.getCollisionDistance(this) });
}

class I extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        this.childrenPositions = [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
        ];
        this.position = { x: 3, y: 1 };
        this.edgeLength = 4;
        this.getChildren();
    }
}

class J extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        this.childrenPositions = [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
        ];
        this.getChildren();
        this.edgeLength = 3;
        this.position = { x: 4, y: 0 };
    }
}

class L extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        this.childrenPositions = [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 1, y: 2 },
        ];
        this.getChildren();
        this.edgeLength = 3;
        this.position = { x: 3, y: 0 };
    }
}

class O extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        this.childrenPositions = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
        ];
        this.getChildren();
        this.edgeLength = 2;
        this.position = { x: 4, y: 1 };
    }
}

class S extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        this.childrenPositions = [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
        ];
        this.getChildren();
        this.edgeLength = 3;
        this.position = { x: 4, y: 1 };
    }
}

class T extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        this.childrenPositions = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
        ];
        this.getChildren();
        this.edgeLength = 3;
        this.position = { x: 4, y: 1 };
    }
}

class Z extends Cluster {
    constructor(color, playfield) {
        super(color, playfield);
        this.childrenPositions = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
        ];
        this.getChildren();
        this.edgeLength = 3;
        this.position = { x: 4, y: 1 };
    }
}

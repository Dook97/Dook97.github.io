'use strict';

class Painter {
    constructor() {
        this.colors = ['red', 'green', 'blue'];
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
    }
}

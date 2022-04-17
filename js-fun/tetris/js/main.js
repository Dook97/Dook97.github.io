'use strict';

window.addEventListener('load', () => {
    const tick = 1000; // game step duration
    const yOffset = 3; // number of top rows which won't be visible and are only used for spawning new tetrominos
    const colors = ['#0341AE', '#72CB3B', '#FFD500', '#FF971C', '#FF3213']; // tetrominos colors
    const xSize = 10; // grid x axis length
    const ySize = 20; // grid y axis length

    let manager = new Manager(tick, xSize, ySize, yOffset, colors);

    manager.loop();
    manager.painter.paint();
});

let tick = 1000; // game step duration
let yOffset = 3; // number of top rows which won't be visible and are only used for spawning new tetrominos
let colors = ['#0341AE', '#72CB3B', '#FFD500', '#FF971C', '#FF3213']; // tetrominos colors
let xSize = 10;
let ySize = 20;

let playfield = new Playfield(xSize, ySize + yOffset, yOffset);
let painter = new Painter(playfield, yOffset, colors);
let manager = new Manager(painter, playfield, tick);

painter.getCluster(manager.activeCluster);
manager.loop();
painter.paint();

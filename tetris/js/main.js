let tick = 1000; // game step duration
let yOffset = 4; // number of top rows which won't be visible
let colors = ['#0341AE', '#72CB3B', '#FFD500', '#FF971C', '#FF3213']; // tetrominoe colors

let playfield = new Playfield(10, 20 + yOffset);
let painter = new Painter(playfield, yOffset, colors);
let manager = new Manager(painter, playfield, tick);

painter.getCluster(manager.activeCluster);
manager.loop();
painter.paint();

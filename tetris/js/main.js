let tick = 1000;

let playfield = new Playfield(10, 20);
let painter = new Painter(playfield);
let manager = new Manager(painter, playfield, tick);
painter.getCluster(manager.activeCluster);

manager.loop();
painter.paint();

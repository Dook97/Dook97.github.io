let tick = 1000; // game step duration
let yOffset = 3; // number of top rows which won't be visible and are only used for spawning new tetrominos
let colors = ['#0341AE', '#72CB3B', '#FFD500', '#FF971C', '#FF3213']; // tetrominos colors
let xSize = 10; // grid x axis length
let ySize = 20; // grid y axis length

let manager = new Manager(tick, xSize, ySize, yOffset, colors);

manager.painter.getCluster(manager.activeCluster);
manager.loop();
manager.painter.paint();

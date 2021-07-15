let canvas,
    context,
    edge = 750,
    scale = 10, // edge MUST be divisible by scale
    limitXY = edge/scale,
    grid,
    interval = 100;

window.addEventListener('load', () => {
    canvas = document.querySelector('canvas');
    canvas.setAttribute('width', edge);
    canvas.setAttribute('height', edge);
    context = canvas.getContext('2d');
    grid = fillGrid();

    setInterval(() => grid = updateGrid(), interval);
    draw();
});

const draw = () => {
    for (let x = 0; x < limitXY; x++) {
        for (let y = 0; y < limitXY; y++) {
            context.fillStyle = grid[x][y] ? 'green' : 'black';
            context.fillRect(x*scale, y*scale, scale, scale);
        }
    }
    requestAnimationFrame(draw);
};

const updateGrid = () => {
    let out = fillGrid();

    for (let x = 0; x < limitXY; x++) {
        for (let y = 0; y < limitXY; y++) {
            let count = 0;
            let neighbours = getNeighbours(x, y);
            for (const nbr of neighbours) {
                if (grid[nbr[0]][nbr[1]]) {
                    count++;
                }
            }
            out[x][y] = (grid[x][y] && count === 2) || (count === 3);
        }
    }
    return out;
};

const getNeighbours = (x, y) => {
    let neigbours = [
        [x-1,y-1],[x,y-1],[x+1,y-1],
        [x-1,y  ],        [x+1,y  ],
        [x-1,y+1],[x,y+1],[x+1,y+1]
    ];
    let out = []

    for (let i = 0; i < neigbours.length; i++) {
        if (neigbours[i][0] >= 0 && neigbours[i][1] >= 0 && neigbours[i][0] < limitXY && neigbours[i][1] < limitXY) {
            out.push(neigbours[i]);
        }
    }
    return out;
};

const fillGrid = () => {
    let out = [];

    for (let i = 0; i < limitXY; i++) {
        out.push(new Array());
        for (let j = 0; j < limitXY; j++) {
            out[i].push(false);
        }
    }
    return out;
};
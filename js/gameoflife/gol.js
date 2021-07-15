let context,
    edge = 750,
    scale = 10, // edge MUST be divisible by scale
    limitXY = edge/scale,
    grid;

window.addEventListener('load', () => {
    let canvas = document.querySelector('canvas'),
        interval = 70;
    
    grid = fillGrid(limitXY, limitXY);
    canvas.setAttribute('width', edge);
    canvas.setAttribute('height', edge);
    context = canvas.getContext('2d');
    context.fillStyle = 'green';

    setInterval(() => grid = updateGrid(), interval);
    draw();
});

const draw = () => {
    context.clearRect(0, 0, edge, edge);
    for (let x = 0; x < limitXY; x++) {
        for (let y = 0; y < limitXY; y++) {
            if (grid[x][y]) {
                context.fillRect(x*scale, y*scale, scale, scale);
            }
        }
    }
    requestAnimationFrame(draw);
};

const updateGrid = () => {
    let out = fillGrid(limitXY, limitXY);
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
    /*
    code below returns absolute positions of neighbours of the point supplied in argument
    two cells are neighbours if they share a corner; neighbourship spans across grid boundaries (so a point at x=0 can be neighbour of a point at x=max)
    the items of the returned list are arranged same way they would be in a grid
    */
    return [
        [(x - 1 < 0) ? limitXY - 1 : x - 1, (y - 1 < 0) ? limitXY - 1 : y - 1], [x, (y - 1 < 0) ? limitXY - 1 : y - 1], [(x + 1 === limitXY) ? 0 : x + 1, (y - 1 < 0) ? limitXY - 1 : y - 1],
        [(x - 1 < 0) ? limitXY - 1 : x - 1,                             y    ],                                         [(x + 1 === limitXY) ? 0 : x + 1,                             y    ],
        [(x - 1 < 0) ? limitXY - 1 : x - 1, (y + 1 === limitXY) ?   0 : y + 1], [x, (y + 1 === limitXY) ?   0 : y + 1], [(x + 1 === limitXY) ? 0 : x + 1, (y + 1 === limitXY) ?   0 : y + 1]
    ];
};

const fillGrid = (x, y) => {
    let out = [];
    for (let i = 0; i < x; i++) {
        out.push(new Array());
        for (let j = 0; j < y; j++) {
            out[i].push(false);
        }
    }
    return out;
};
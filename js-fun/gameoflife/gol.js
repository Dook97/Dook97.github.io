let context;
const edge = 750; // dont fuck with this - webpage layout depends on this being 750px
const scale = 10; // edge MUST be divisible by scale
let limitXY;
let grid;
let interval;
let paused = true;
let generation = 0;

window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas');
    const slider = document.querySelector('input');

    limitXY = edge / scale;
    context = canvas.getContext('2d');
    context.fillStyle = 'green';
    context.strokeStyle = 'black';
    grid = fillGrid(limitXY, limitXY);
    interval = 10 * 2 ** slider.value;

    slider.addEventListener('input', () => interval = 10 * 2 ** slider.value);

    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / scale);
        const y = Math.floor((e.clientY - rect.top) / scale);
        grid[x][y] = !grid[x][y];
    });

    loop();
    draw();
});

const loop = () => {
    setTimeout(() => {
        if (!paused) {
            generation++;
            grid = updateGrid();
        }
        loop();
    }, interval);
};

const draw = () => {
    context.clearRect(0, 0, edge, edge);
    for (let x = 0; x < limitXY; x++) {
        for (let y = 0; y < limitXY; y++) {
            if (grid[x][y]) {
                context.fillRect(x * scale + 1, y * scale + 1, scale - 1, scale - 1);
            }
        }
    }
    if (!paused) {
        document.querySelector('#status').innerText = 'running';
    } else {
        document.querySelector('#status').innerText = 'paused';
    }
    document.querySelector('#generation').textContent = `${generation}`;
    requestAnimationFrame(draw);
};

const updateGrid = () => {
    let out = fillGrid(limitXY, limitXY);
    let changed = false;
    for (let x = 0; x < limitXY; x++) {
        for (let y = 0; y < limitXY; y++) {
            let count = 0;
            const neighbours = getNeighbours(x, y);
            for (const nbr of neighbours) {
                if (grid[nbr[0]][nbr[1]]) {
                    count++;
                }
            }
            out[x][y] = (grid[x][y] && count === 2) || count === 3;
            if (out[x][y] !== grid[x][y]) {
                changed = true;
            }
        }
    }
    if (!changed) {
        paused = true;
    }
    return out;
};

document.addEventListener('keypress', e => {
    if (e.key === 's') {
        paused = !paused;
    } else if (e.key === 'c') {
        paused = true;
        grid = fillGrid(limitXY, limitXY);
        generation = 0;
    }
});

const getNeighbours = (x, y) => {
    // prettier-ignore
    let neighbours = [
        [x - 1, y - 1], [x, y - 1], [ x + 1, y - 1],
        [x - 1, y    ],             [ x + 1, y    ],
        [x - 1, y + 1], [x, y + 1], [ x + 1, y + 1]
    ];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 2; j++) {
            if (neighbours[i][j] === -1) {
                neighbours[i][j] = limitXY - 1;
            } else if (neighbours[i][j] === limitXY) {
                neighbours[i][j] = 0;
            }
        }
    }
    return neighbours;
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

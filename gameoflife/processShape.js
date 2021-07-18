window.addEventListener('load', () => {
    for (const key of Object.keys(shapes)) {
        writeShape(shapes[key], key);
    }
    let shapeContainer = document.querySelectorAll('#shapes > tbody > tr');
    for (let i = 0; i < shapeContainer.length; i++) {
        shapeContainer[i].addEventListener('click', () => {
            paused = true;
            generation = 0;
            grid = fillGrid(limitXY, limitXY);
            importShape(shapes[Object.keys(shapes)[i]]);
        });
    }
});

const importShape = shape => {
    let x = shape[0].length;
    let y = shape.length;
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            grid[j + Math.floor(limitXY / 2) - Math.floor(x / 2)][i + Math.floor(limitXY / 2) - Math.floor(y / 2)] = shape[i][j] === '#' ? true : false;
        }
    }
};

const exportShape = () => {
    // find bounds of the shape
    let left, right, top, bottom;
    for (let i = 0; i < limitXY; i++) {
        for (let j = 0; j < limitXY; j++) {
            if (grid[i][j]) {
                right = i;
                if (bottom < j || bottom === undefined) {
                    bottom = j;
                }
                if (left === undefined) {
                    left = i;
                }
                if (top > j || top === undefined) {
                    top = j;
                }
            }
        }
    }
    if (left === undefined) {
        return [];
    } else {
        let out = [];
        for (let i = top; i <= bottom; i++) {
            out.push('');
            for (let j = left; j <= right; j++) {
                out[i - top] += grid[j][i] ? '#' : '.';
            }
        }
        return out;
    }
};

const writeShape = (shape, name) => {
    document.querySelector('#shapes > tbody').innerHTML += `
        <tr>
            <td>
                <p>${name}</p>
            </td>
            <td>
                ${toHTMLTable(shape)}
            </td>
        </tr>
    `;
};

const toHTMLTable = shape => {
    let out = '<table><tbody>';
    for (const row of shape) {
        out += '<tr>';
        for (const char of row) {
            out += char === '#' ? '<td class="greenbg"></td>' : '<td></td>';
        }
        out += '</tr>';
    }
    out += '</tbody></table>';
    return out;
};

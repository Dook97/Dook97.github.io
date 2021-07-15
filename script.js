let canvas,
    context,
    edge,
    point,
    piContainer,
    piValues = [0, 0];

window.addEventListener('load', () => {
    edge = 750;
    canvas = document.querySelector('canvas');
    piContainer = document.querySelector('#pi_container')
    canvas.setAttribute('width', edge);
    canvas.setAttribute('height', edge);
    context = canvas.getContext('2d');

    setInterval(() => {
        generatePoint();
        calculatePI();
        draw();
    }, 0);
});

let generatePoint = () => {
    let x = Math.random() * canvas.width,
        y = Math.random() * canvas.width;
    point = {
        x : x,
        y : y,
        inOut: Math.sqrt((x - edge / 2)**2 + (y - edge / 2)**2) < edge / 2
    };
};

let calculatePI = () => {
    point.inOut ? piValues[0] += 1 : piValues[1] += 1;
    piContainer.textContent = (4 * piValues[0] / (piValues[0] + piValues[1])).toLocaleString('en-US', {minimumFractionDigits: 16, useGrouping:false})
};

let draw = () => {
    point.inOut ? context.fillStyle = 'green' : context.fillStyle = 'red';
    context.fillRect(point.x, point.y, 1, 1);
};

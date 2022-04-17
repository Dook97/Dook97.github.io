let canvas,
    context,
    piContainer,
    point = {},
    edge = 750,
    inOut = [0, 0];

window.addEventListener('load', () => {
    canvas = document.querySelector('canvas');
    piContainer = document.querySelector('#pi_container')
    canvas.setAttribute('width', edge);
    canvas.setAttribute('height', edge);
    context = canvas.getContext('2d');
    setInterval(() => {
        generatePoint();
        countInOut();    
    },0);
    draw();
});

let generatePoint = () => {
    point.x = Math.random() * edge;
    point.y = Math.random() * edge;
    point.inOut = (point.x - edge / 2)**2 + (point.y - edge / 2)**2 < (edge / 2)**2;
};

let countInOut = () => point.inOut ? inOut[0] += 1 : inOut[1] += 1;

let draw = () => {
    piContainer.textContent = (4 * inOut[0] / (inOut[0] + inOut[1])).toLocaleString('en-US', {minimumFractionDigits: 16, useGrouping:false})
    point.inOut ? context.fillStyle = 'green' : context.fillStyle = 'red';
    context.fillRect(point.x, point.y, 1, 1);
    requestAnimationFrame(draw);
};
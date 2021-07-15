let canvas,
    context,
    field,
    dimensions = {
        x : 50,
        y : 50
    },
    interval = 100,
    edge = 750,
    scale = 10;

window.addEventListener('load', () => {
    canvas = document.querySelector('canvas');
    canvas.setAttribute('width', edge);
    canvas.setAttribute('height', edge);
    context = canvas.getContext('2d');
    field = fillField();

    setInterval(() => field = updateField(), interval);
    draw();
});

let draw = () => {
    //code duh
    requestAnimationFrame(draw);
};

let updateField = () => {
    //logic
};

let fillField = () => {
    field = [];
    for (let i = 0; i < dimensions.y; i++) {
        field.push(new Array());
        for (let j = 0; j < dimensions.x; j++) {
            field[i].push(false);
        }
    }
    return field;
};
import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

let register = 1;
let cicle = 1;
let sumOfStrengths = 0;

const CRT = [...Array.from({ length: 240 }, () => '#')];

function countIfProbedCicle() {
    if ([20, 60, 100, 140, 180, 220].includes(cicle)) {
        sumOfStrengths += cicle * register;
    }
}

function draw() {
    let character = '.';
    let spriteIndex = register;

    if (41 <= cicle && cicle <= 80) {
        spriteIndex += 40;
    } else if (81 <= cicle && cicle <= 120) {
        spriteIndex += 80;
    } else if (121 <= cicle && cicle <= 160) {
        spriteIndex += 120;
    } else if (161 <= cicle && cicle <= 200) {
        spriteIndex += 160;
    } else if (201 <= cicle && cicle <= 240) {
        spriteIndex += 200;
    }

    if ([spriteIndex - 1, spriteIndex, spriteIndex + 1].includes(cicle - 1)) {
        character = '#';
    }

    CRT[cicle - 1] = character;
}

for await (const line of lineReader) {
    const [operation, num] = line.split(' ');

    if (operation === 'noop') {
        countIfProbedCicle();
        draw();
        cicle += 1;
    }

    if (operation === 'addx') {
        countIfProbedCicle();
        draw();
        cicle += 1;
        countIfProbedCicle();
        draw();
        cicle += 1;
        register += parseInt(num);
    }
}

console.log(`Sum of signal strengths: ${sumOfStrengths}\nCRT:`);

for (let i = 0; i < 240; i += 40) {
    const line = CRT.slice(i, i + 40);
    console.log(line.join(' '));
}

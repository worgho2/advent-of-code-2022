import fs from 'fs';
import readline from 'readline';

const pointsMap = new Map([
    ['AX', { first: 4, second: 3 }],
    ['AY', { first: 8, second: 4 }],
    ['AZ', { first: 3, second: 8 }],
    ['BX', { first: 1, second: 1 }],
    ['BY', { first: 5, second: 5 }],
    ['BZ', { first: 9, second: 9 }],
    ['CX', { first: 7, second: 2 }],
    ['CY', { first: 2, second: 6 }],
    ['CZ', { first: 6, second: 7 }],
]);

let firstStrategySum = 0;
let secondStrategySum = 0;

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

lineReader.on('line', (line) => {
    firstStrategySum += pointsMap.get(line.replace(' ', '')).first || 0;
    secondStrategySum += pointsMap.get(line.replace(' ', '')).second || 0;
});

lineReader.on('close', () =>
    console.log(`First strategy sum: ${firstStrategySum}\nSecond strategy sum: ${secondStrategySum}`)
);

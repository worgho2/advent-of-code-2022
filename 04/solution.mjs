import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let contains = 0;
let overlaps = 0;

function intervalContainsInterval(a, b, c, d) {
    return !!(a >= c && b <= d)
}

function intervalOverlapsInterval(a, b, c, d) {
    return !!(intervalContainsInterval(a, b, c, d) || (a <= c && b >= c) || (a <= d && b >= d))
}

for await (const line of lineReader) {
    const [a, b, c, d] = line.split(',').flatMap(i => i.split('-')).map(i => parseInt(i));

    if (intervalContainsInterval(a, b, c, d) || intervalContainsInterval(c, d, a, b)) {
        contains += 1;
    }

    if (intervalOverlapsInterval(a, b, c, d) || intervalOverlapsInterval(c, d, a, b)) {
        overlaps += 1;
    }
}

console.log(`Contains: ${contains}\nOverlaps: ${overlaps}`);


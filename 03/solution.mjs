import fs from 'fs';
import readline from 'readline';

const priorityMap = new Map([
    ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(i + 97), i + 1]),
    ...Array.from({ length: 26 }, (_, i) => [String.fromCharCode(i + 65), i + 27]),
]);

let prioritySum = 0;
let badgePrioritySum = 0;

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

let index = 1;
let lastThreeLines = [];

for await (const line of lineReader) {
    const [a, b] = [line.slice(0, line.length / 2), line.slice(line.length / 2)].map((c) => c.split(''));

    for (const item of a) {
        if (b.includes(item)) {
            prioritySum += priorityMap.get(item);
            break;
        }
    }

    lastThreeLines.push(line);

    if (index % 3 === 0) {
        const mappedLines = lastThreeLines.map((a) => a.split(''));

        for (const item of mappedLines[0]) {
            if (mappedLines[1].includes(item) && mappedLines[2].includes(item)) {
                badgePrioritySum += priorityMap.get(item);
                break;
            }
        }

        lastThreeLines = [];
    }

    index += 1;
}

console.log(`Priority sum: ${prioritySum}\nBadge priority sum: ${badgePrioritySum}`);

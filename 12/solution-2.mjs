import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

const mountain = [];
let starts = [];
let end = [];

let index = 0;
for await (const line of lineReader) {
    const row = line.split('');

    for (let i = 0; i < row.length; i++) {
        if (['S', 'a'].includes(row[i])) {
            starts.push([index, i]);
        }
    }

    const endIndex = row.indexOf('E');

    if (endIndex !== -1) {
        end = [index, endIndex];
        row[endIndex] = 'z';
    }

    mountain.push(
        row.map((a) => ({
            weight: a.charCodeAt(0) - 'a'.charCodeAt(0),
            visited: false,
        }))
    );

    index++;
}

const queue = starts.map((a) => ({ coord: a, traveled: 0 }));

const travelModes = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];

const isValid = (i, j) => !!(i >= 0 && j >= 0 && i < mountain.length && j < mountain[0].length);

while (true) {
    const current = queue.shift();
    const currentNode = mountain[current.coord[0]][current.coord[1]];

    if (current.coord.map((a) => `${a}`).join(',') === end.map((a) => `${a}`).join(',')) {
        console.log(current.traveled);
        break;
    }

    if (currentNode.visited) {
        continue;
    }

    currentNode.visited = true;

    for (let dir of travelModes) {
        if (!isValid(current.coord[0] + dir[0], current.coord[1] + dir[1])) {
            continue;
        }

        const nextNode = mountain[current.coord[0] + dir[0]][current.coord[1] + dir[1]];

        if (!nextNode.visited && nextNode.weight - currentNode.weight <= 1) {
            queue.push({
                coord: [current.coord[0] + dir[0], current.coord[1] + dir[1]],
                traveled: current.traveled + 1,
            });
        }
    }
}

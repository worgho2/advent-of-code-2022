import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

const ropes = [
    {
        coords: Array.from({ length: 2 }, () => ({ x: 0, y: 0 })),
        visitedCoords: new Map([['0:0', 1]]),
    },
    {
        coords: Array.from({ length: 10 }, () => ({ x: 0, y: 0 })),
        visitedCoords: new Map([['0:0', 1]]),
    },
];

function move(rope, direction, num) {
    const coords = rope.coords;
    const visitedCoords = rope.visitedCoords;

    for (let i = 0; i < num; i++) {
        if (direction === 'L') {
            coords[0].x -= 1;
        } else if (direction === 'R') {
            coords[0].x += 1;
        } else if (direction === 'U') {
            coords[0].y -= 1;
        } else {
            coords[0].y += 1;
        }

        for (let j = 1; j < coords.length; j++) {
            const hDistFromLast = Math.abs(coords[j - 1].x - coords[j].x);
            const vDistFromLast = Math.abs(coords[j - 1].y - coords[j].y);

            if (Math.max(hDistFromLast, vDistFromLast) > 1) {
                let xIncrement = 0;
                let yIncrement = 0;

                if (coords[j - 1].x > coords[j].x) {
                    xIncrement = 1;
                } else if (coords[j - 1].x < coords[j].x) {
                    xIncrement = -1;
                }

                if (coords[j - 1].y > coords[j].y) {
                    yIncrement = 1;
                } else if (coords[j - 1].y < coords[j].y) {
                    yIncrement = -1;
                }

                coords[j].x += xIncrement;
                coords[j].y += yIncrement;
            }
        }

        visitedCoords.set(`${coords[coords.length - 1].x}:${coords[coords.length - 1].y}`, 1);
    }

    return { coords, visitedCoords };
}

for await (const line of lineReader) {
    const [direction, n] = line.split(' ');
    const num = parseInt(n);

    for (let i = 0; i < ropes.length; i++) {
        ropes[i] = move(ropes[i], direction, num);
    }
}

console.log(
    ropes
        .map((i) => `Number of visited coords for rope with ${i.coords.length} knots: ${i.visitedCoords.size}`)
        .join('\n')
);

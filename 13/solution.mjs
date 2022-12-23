import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

const orderedPairs = [];

const isOrdered = (arr1, arr2) => {
    if (typeof arr1 === 'number' && typeof arr2 === 'number') {
        if (arr1 > arr2) {
            return 'h';
        } else if (arr1 < arr2) {
            return 'l';
        } else {
            return 'e';
        }
    }

    if (Array.isArray(arr1) && !Array.isArray(arr2)) {
        return isOrdered(arr1, [arr2]);
    }

    if (!Array.isArray(arr1) && Array.isArray(arr2)) {
        return isOrdered([arr1], arr2);
    }

    for (let j = 0; j < Math.max(arr1.length, arr2.length); j++) {
        if (arr1[j] === undefined) {
            return 'l';
        } else if (arr2[j] === undefined) {
            return 'h';
        } else {
            const result = isOrdered(arr1[j], arr2[j]);

            if (result === 'e') {
                continue;
            }

            return result;
        }
    }

    return 'e';
};

let index = 1;
let pair = [];
for await (const line of lineReader) {
    if (line === '') {
        if (isOrdered(pair[0], pair[1]) === 'l') {
            orderedPairs.push(index);
        }

        pair = [];
        index++;
        continue;
    }

    pair.push(JSON.parse(line));
}

console.log(orderedPairs.reduce((a, b) => a + b, 0));

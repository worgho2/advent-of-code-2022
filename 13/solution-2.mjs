import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input-2.txt'),
});

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

const items = [];
for await (const line of lineReader) {
    if (line === '') {
        continue;
    }

    items.push(JSON.parse(line));
}

items.sort((arr1, arr2) => {
    if (isOrdered(arr1, arr2) === 'h') {
        return 1;
    } else if (isOrdered(arr1, arr2) === 'l') {
        return -1;
    } else {
        return 0;
    }
});

const results = items
    .map((a, i) => {
        if (a.length === 1 && Array.isArray(a[0]) && a[0].length === 1 && [2, 6].includes(a[0][0])) {
            return i + 1;
        } else {
            return 1;
        }
    })
    .reduce((acc, x) => acc * x, 1);

console.log(results);

import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let fileSystem = {};
let currentDir = [];

for await (const line of lineReader) {
    const input = line.split(' ');

    if (input[0] === '$') {
        if (input[1] === 'cd') {
            if (input[2] === '/') {
                currentDir = ['/'];
            } else if (input[2] === '..') {
                currentDir.pop();
            } else {
                currentDir.push(input[2]);
            }
        }

        continue;
    }

    let reference = fileSystem;
    for (const folder of currentDir) {
        if (reference[folder] === undefined) {
            reference[folder] = {};
        }

        reference = reference[folder];
    }

    if (input[0] === 'dir') {
        const dirname = input[1];
        if (reference[dirname] === undefined) {
            reference[dirname] = {};
        }
    } else {
        const size = input[0];
        const filename = input[1];

        reference[filename] = parseInt(size);
    }
}

const directoriesWithAtMost100000 = [];
const allDirectoriesSize = [];

function getDirectorySize(directory) {
    let totalSize = 0;

    for (const [key, value] of Object.entries(directory)) {
        if (typeof value === 'number') {
            totalSize += value;
        } else {
            totalSize += getDirectorySize(directory[key]);
        }
    }

    if (totalSize < 100000) {
        directoriesWithAtMost100000.push(totalSize);
    }

    allDirectoriesSize.push(totalSize);

    return totalSize;
}

const usedSize = getDirectorySize(fileSystem);
const freeSize = 70000000 - usedSize;
const requiredSize = 30000000 - freeSize;

const smallestDistanceDirSize = allDirectoriesSize.filter(i => i >= requiredSize).sort((a,b) => a - b)[0];
const sumOfDirectoriesWithAtMost100000 = directoriesWithAtMost100000.reduce((a, b) => a + b);

console.log(`Sum of directories with at most 100000: ${sumOfDirectoriesWithAtMost100000}\nSmallest directory to delete: ${smallestDistanceDirSize}`);

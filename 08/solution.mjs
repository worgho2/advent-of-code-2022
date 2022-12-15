import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

let forest = [];

for await (const line of lineReader) {
    forest.push(line.split('').map((i) => parseInt(i)));
}

const lines = forest.length;
const columns = forest[0].length;
let numberOfVisibleTrees = 0;
let highestScenicTree = 0;

for (let i = 0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
        const isVisible = {
            right: true,
            left: true,
            top: true,
            bottom: true,
        };

        const scenicScore = {
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
        };

        const currentTreeHeight = forest[i][j];

        for (let k = j + 1; k < columns; k++) {
            scenicScore.right += 1;
            if (forest[i][k] >= currentTreeHeight) {
                isVisible.right = false;
                break;
            }
        }

        for (let k = j - 1; k >= 0; k--) {
            scenicScore.left += 1;
            if (forest[i][k] >= currentTreeHeight) {
                isVisible.left = false;
                break;
            }
        }

        for (let k = i + 1; k < lines; k++) {
            scenicScore.bottom += 1;
            if (forest[k][j] >= currentTreeHeight) {
                isVisible.bottom = false;
                break;
            }
        }

        for (let k = i - 1; k >= 0; k--) {
            scenicScore.top += 1;
            if (forest[k][j] >= currentTreeHeight) {
                isVisible.top = false;
                break;
            }
        }

        if ([isVisible.right, isVisible.left, isVisible.top, isVisible.bottom].includes(true)) {
            numberOfVisibleTrees += 1;
        }

        const totalScenicScore = [scenicScore.right, scenicScore.left, scenicScore.top, scenicScore.bottom].reduce(
            (a, b) => a * b
        );

        if (totalScenicScore > highestScenicTree) {
            highestScenicTree = totalScenicScore;
        }
    }
}

console.log(`Visible trees: ${numberOfVisibleTrees}\nHighest scenic tree: ${highestScenicTree}`);

import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

const stacks = [];
let stacks9001 = [];

/**
 * 0 -> reading stacks
 * 1 -> reading empty line
 * 2 -> reading instructions
 */
let readState = 0;

let i = 0;
for await (const line of lineReader) {
    if (readState === 0) {
        const items = line.match(/.{1,4}/g).map((i) => i.replace(/[ \[\]]+/g, ''));

        if (items[0] === '1') {
            readState = 1;
            continue;
        }

        if (i === 0) {
            stacks.push(...Array.from({ length: items.length }, () => []));
        }

        for (let j = 0; j < stacks.length; j++) {
            if (items[j] !== '') {
                stacks[j] = [items[j], ...stacks[j]];
            }
        }

        i += 1;
    } else if (readState === 1) {
        readState = 2;
        stacks9001 = stacks.slice();
        continue;
    } else {
        const splittedInstruction = line.split(' ');
        const numberOfcrates = splittedInstruction[1];
        const fromStack = splittedInstruction[3] - 1;
        const toStack = splittedInstruction[5] - 1;

        const index = stacks[fromStack].length - numberOfcrates;
        stacks[toStack] = [...stacks[toStack], ...stacks[fromStack].slice(index).reverse()];
        stacks[fromStack] = stacks[fromStack].slice(0, index);

        const index9001 = stacks9001[fromStack].length - numberOfcrates;
        stacks9001[toStack] = [...stacks9001[toStack], ...stacks9001[fromStack].slice(index9001)];
        stacks9001[fromStack] = stacks9001[fromStack].slice(0, index9001);
    }
}

const lastStackCrates = stacks.map((v) => v[v.length - 1]).join('');
const lastStackCrates9001 = stacks9001.map((v) => v[v.length - 1]).join('');

console.log(`Last stack crates: ${lastStackCrates}\nLast stack crates 9001: ${lastStackCrates9001}`);

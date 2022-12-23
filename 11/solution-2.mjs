import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt'),
});

const monkeys = [];
let currentMonkey = {};

for await (const line of lineReader) {
    if (line.startsWith('Monkey')) {
        currentMonkey = {};
    }

    if (line.startsWith('  Starting')) {
        currentMonkey.items = line
            .replace(',', '')
            .split(' ')
            .slice(4)
            .map((i) => parseInt(i));
    }

    if (line.startsWith('  Operation')) {
        currentMonkey.operation = (old) => eval(line.split(' ').slice(5).join(' '));
    }

    if (line.startsWith('  Test')) {
        currentMonkey.test = {
            divisor: parseInt(line.split(' ').slice(5)[0]),
        };
    }

    if (line.startsWith('    If true')) {
        currentMonkey.test.trueMokey = parseInt(line.split(' ').slice(9)[0]);
    }

    if (line.startsWith('    If false')) {
        currentMonkey.test.falseMonkey = parseInt(line.split(' ').slice(9)[0]);
        currentMonkey.inspectedItems = 0;
        monkeys.push(currentMonkey);
    }

    if (line === '') {
        currentMonkey = {};
    }
}

const mod = monkeys.map((a) => a.test.divisor).reduce((a, b) => a * b);

for (let round = 0; round < 10_000; round++) {
    for (let i = 0; i < monkeys.length; i++) {
        for (let j = 0; j < monkeys[i].items.length; j++) {
            monkeys[i].items[j] = monkeys[i].operation(monkeys[i].items[j]);
            monkeys[i].items[j] %= mod;
            monkeys[i].inspectedItems += 1;

            if (monkeys[i].items[j] % monkeys[i].test.divisor === 0) {
                monkeys[monkeys[i].test.trueMokey].items.push(monkeys[i].items[j]);
            } else {
                monkeys[monkeys[i].test.falseMonkey].items.push(monkeys[i].items[j]);
            }
        }

        monkeys[i].items = [];
    }
}

const monkeyBusiness = monkeys
    .map((a) => a.inspectedItems)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);

console.log(`Monkey business: ${monkeyBusiness}`);

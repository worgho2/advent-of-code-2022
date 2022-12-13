import fs from 'fs';
import readline from 'readline';

const lineReader = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let startOfPacketMarker = 0;
let startOfMessageMarker = 0;

function isSet(items) {
    return !!([...new Set(items)].length === [...items].length);
}

for await (const line of lineReader) {
    const lineArray = line.split('');

    for (let i = 3; i < lineArray.length; i++) {
        if (isSet([lineArray[i], lineArray[i-1], lineArray[i-2], lineArray[i-3]])) {
            startOfPacketMarker = i + 1;
            break;
        }
    }

    for (let i = 13; i < lineArray.length; i++) {
        if (
            isSet([
                lineArray[i], lineArray[i-1], lineArray[i-2],
                lineArray[i-3], lineArray[i-4], lineArray[i-5],
                lineArray[i-6], lineArray[i-7], lineArray[i-8],
                lineArray[i-9], lineArray[i-10], lineArray[i-11],
                lineArray[i-12], lineArray[i-13],
            ])
        ) {
            startOfMessageMarker = i + 1;
            break;
        }
    }
}


console.log(`Start of packet marker: ${startOfPacketMarker}\nStart of message marker: ${startOfMessageMarker}`);

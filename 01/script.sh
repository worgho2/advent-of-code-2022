#!/bin/bash

cat input.txt | tr '\n' '+' | sed 's/++/-/g' | tr '-' '\n' > temp1
echo '0' >> temp1
cat temp1 | bc | sort | tail -3 | tr '\n' '+' > temp2
echo '0' >> temp2

FIRST=$(cat temp1 | bc | sort | tail -1)
SECOND=$(cat temp2 | bc)

echo -e "Highest sum: $FIRST\nTop three sum: $SECOND"

rm -f temp1 temp2
#!/bin/bash

cat input.txt | tr '\n' '+' | sed 's/++/-/g' | tr '-' '\n' > parsed.txt
echo '0' >> parsed.txt
cat parsed.txt | bc | sort | tail -1
rm -f parsed.txt
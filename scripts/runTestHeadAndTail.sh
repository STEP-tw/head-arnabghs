#! /bin/bash

echo ""
echo "  Tests for head.js"
echo "<<------------------->>"
echo ""
./scripts/runHeadTest.sh textFiles/fifteenLines.txt textFiles/fiveLines.txt

echo ""
echo "   Tests for tail.js"
echo  "<<-------------------->>"
echo ""
./scripts/runHeadTest.sh textFiles/fifteenLines.txt textFiles/fiveLines.txt
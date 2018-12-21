#./bin/sh

input_file=$1
input_file2=$2

tail $input_file > .sysTail
node ./tail.js $input_file > .usrTail
echo "for format -> node ./tail.js file1"
node scripts/compareTails.js

tail -- $input_file > .sysTail 
node ./tail.js -- $input_file > .usrTail
echo "for format -> node ./tail.js -- file1" 
node scripts/compareTails.js

tail -n5 $input_file > .sysTail
node ./tail.js -n5 $input_file > .usrTail
echo "for format -> node ./tail.js -n5 file1"
node scripts/compareTails.js

tail -n 5 $input_file > .sysTail
node ./tail.js -n 5 $input_file > .usrTail
echo "for format -> node ./tail.js -n 5 file1"
node scripts/compareTails.js

tail -5 $input_file > .sysTail
node ./tail.js -5 $input_file > .usrTail
echo "for format -> node ./tail.js -5 file1"
node scripts/compareTails.js

tail $input_file $input_file2 | sed '/^$/d' > .sysTail
node ./tail.js $input_file $input_file2 > .usrTail
echo "for format -> node ./tail.js file1 file2"
node scripts/compareTails.js

tail -n 5 $input_file $input_file2 | sed '/^$/d' > .sysTail
node ./tail.js -n 5 $input_file $input_file2 > .usrTail
echo "for format -> node ./tail.js -n 5 file1 file2"
node scripts/compareTails.js

tail -n5 $input_file $input_file2 | sed '/^$/d' > .sysTail
node ./tail.js -n5 $input_file $input_file2 > .usrTail
echo "for format -> node ./tail.js -n5 file1 file2"
node scripts/compareTails.js

tail -5 $input_file $input_file2 | sed '/^$/d' > .sysTail
node ./tail.js -5 $input_file $input_file2 > .usrTail
echo "for format -> node ./tail.js -5 file1 file2"
node scripts/compareTails.js

tail -c5 $input_file > .sysTail
node ./tail.js -c5 $input_file > .usrTail
echo "for format -> node ./tail.js -c5 file1"
node scripts/compareTails.js

tail -c 5 $input_file > .sysTail
node ./tail.js -c 5 $input_file > .usrTail
echo "for format -> node ./tail.js -c 5 file1"
node scripts/compareTails.js

tail -c5 $input_file $input_file2 > .sysTail
node ./tail.js -c5 $input_file $input_file2 > .usrTail
echo "for format -> node ./tail.js -c5 file1 file2"
node scripts/compareTails.js

tail -c 5 $input_file $input_file2 > .sysTail
node ./tail.js -c 5 $input_file $input_file2 > .usrTail
echo "for format -> node ./tail.js -c 5 file1 file2"
node scripts/compareTails.js

tail -n11 $input_file > .sysTail
node ./tail.js -n11 $input_file > .usrTail
echo "for format -> node ./tail.js -n11 file1"
node scripts/compareTails.js

tail -n16 $input_file > .sysTail
node ./tail.js -n16 $input_file > .usrTail
echo "for format -> node ./tail.js -n16 file1"
node scripts/compareTails.js

echo  "\nIllegal Cases\n"

tail -x5 $input_file 2> .sysTail
node ./tail.js -x5 $input_file > .usrTail
echo "for format -> node ./tail.js -x5 file1 (illegal option)"
node scripts/compareTails.js

tail -x 5 $input_file 2> .sysTail
node ./tail.js -x 5 $input_file > .usrTail
echo "for format -> node ./tail.js -x 5 file1 (illegal option)"
node scripts/compareTails.js

tail --5 $input_file 2> .sysTail
node ./tail.js --5 $input_file > .usrTail
echo "for format -> node ./tail.js --5 file1 (illegal option)"
node scripts/compareTails.js

tail -c0 $input_file 2> .sysTail
node ./tail.js -c0 $input_file > .usrTail
echo "for format -> node ./tail.js -c0 file1 (illegal option)"
node scripts/compareTails.js

tail -c 0 $input_file 2> .sysTail
node ./tail.js -c 0 $input_file > .usrTail
echo "for format -> node ./tail.js -c 0 file1 (illegal option)"
node scripts/compareTails.js

tail -n0 $input_file 2> .sysTail
node ./tail.js -n0 $input_file > .usrTail
echo "for format -> node ./tail.js -n0 file1 (illegal option)"
node scripts/compareTails.js

tail -n 0 $input_file 2> .sysTail
node ./tail.js -n 0 $input_file > .usrTail
echo "for format -> node ./tail.js -n 0 file1 (illegal option)"
node scripts/compareTails.js

tail -n10x $input_file 2> .sysTail
node ./tail.js -n10x $input_file > .usrTail
echo "for format -> node ./tail.js -n10x file1 (illegal option)"
node scripts/compareTails.js

tail -n 2.5 $input_file 2> .sysTail
node ./tail.js -n 2.5 $input_file > .usrTail
echo "for format -> node ./tail.js -n 2.5 file1 (illegal option)"
node scripts/compareTails.js

tail -c 2.5 $input_file 2> .sysTail
node ./tail.js -c 2.5 $input_file > .usrTail
echo "for format -> node ./tail.js -c 2.5 file1 (illegal option)"
node scripts/compareTails.js


#tail -- 5 $input_file 2> .sysTail 1>> .sysTail
#node ./tail.js -- 5 $input_file > .usrTail
#echo "for format -> node ./tail.js -- 5 file1" 
#node scripts/compareTails.js

tail invalidFile 2> .sysTail 1>> .sysTail
node ./tail.js invalidFile > .usrTail
echo "for format -> node ./tail.js invalidFile" 
node scripts/compareTails.js

tail invalidFile $input_file 2> .sysTail 1>> .sysTail
node ./tail.js invalidFile  $input_file > .usrTail
echo "for format -> node ./tail.js invalidFile file1" 
node scripts/compareTails.js


tail $input_file invalidFile 1> .sysTail 2>> .sysTail
node ./tail.js $input_file invalidFile > .usrTail
echo "for format -> node ./tail.js file1 invalidFile" 
node scripts/compareTails.js

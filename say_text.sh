#!/bin/sh

# Random voice from file
first_index=1 
last_index=$(wc -l < voices.csv)
rand_index=$(jot -r 1  $first_index $last_index)
line=$(sed "${rand_index}q;d" voices.csv)
set -- $line
voice=$1

# Random textfile
ls -1 texts >> texts_index.txt
first_index=1 
last_index=$(wc -l < texts_index.txt)
rand_index=$(jot -r 1  $first_index $last_index)
line=$(sed "${rand_index}q;d" texts_index.txt)
set -- $line
file=$1

echo $voice
echo $file
# -o sounds/$file.aiff
say -v $voice -f texts/$file -i


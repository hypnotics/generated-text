#!/bin/sh

# Arguments
while getopts 'a:' flag; do
  case "${flag}" in
    a) var="${OPTARG}" ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

# Random verb from WordNet
first_index=200 
last_index=$(wc -l < ../WordNet-3.0/dict/index.verb)
rand_index=$(jot -r 1  $first_index $last_index)
line=$(sed "${rand_index}q;d" ../WordNet-3.0/dict/index.verb)
set -- $line
verb=$1
t_verb=$(echo ${verb} | tr '[_]' ' ')

# Random adjective from WordNet
first_index=200 
last_index=$(wc -l < ../WordNet-3.0/dict/index.adj)
rand_index=$(jot -r 1  $first_index $last_index)
line=$(sed "${rand_index}q;d" ../WordNet-3.0/dict/index.adj)
set -- $line
adj=$1
t_adj=$(echo ${adj} | tr '[_]' ' ')

# Random noun from WordNet
first_index=198 
last_index=$(wc -l < ../WordNet-3.0/dict/index.noun)
rand_index=$(jot -r 1  $first_index $last_index)
line=$(sed "${rand_index}q;d" ../WordNet-3.0/dict/index.noun)
set -- $line
noun=$1
t_noun=$(echo ${noun} | tr '[_]' ' ')

# Random preposition from file
first_index=1 
last_index=$(wc -l < prepositions.csv)
rand_index=$(jot -r 1  $first_index $last_index)
line=$(sed "${rand_index}q;d" prepositions.csv)
set -- $line
prep=$1

ix="a"

if [[ $t_adj =~ ^[aeiou] ]]
	then ix="an"
fi

first_word="$(tr '[:lower:]' '[:upper:]' <<< ${t_verb:0:1})${t_verb:1}" 
sentence="$first_word $prep $ix $t_adj $t_noun." 
echo $sentence
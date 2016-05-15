#!/usr/bin/python

import sys


def plural(word):
    if word.endswith('y'):
        return word[:-1] + 'ies'
    elif word[-1] in 'sx' or word[-2:] in ['sh', 'ch']:
        return word + 'es'
    elif word.endswith('an'):
        return word[:-2] + 'en'
    else:
        return word + 's'

if len(sys.argv) == 1:
    check = 'fairy'
else:
    check = sys.argv[1]

print(plural(check))


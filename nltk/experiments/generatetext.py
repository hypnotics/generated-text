# Natural Language Toolkit: code_random_text
import nltk
import random
from nltk.corpus import brown

def generate_model(cfdist, word, num=15):
    for i in range(num):
        print(word[0], end=' ')
        word = random.choice(common)
        #word = cfdist[word].max()

text = brown.words(categories='science_fiction')
fd = nltk.FreqDist(text)
common = fd.most_common(1000)

word = random.choice(common)

print("ENTRY: ", word)

print(generate_model(fd, word))
print(".")
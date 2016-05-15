import nltk
from urllib import request
url = "http://www.gutenberg.org/files/2554/2554.txt"
response = request.urlopen(url)

# Read as string
raw = response.read().decode('utf8')
print(type(raw))
print(len(raw))
print(raw[:75])

# To tokens (list)
tokens = nltk.word_tokenize(raw)
print(type(tokens))
print(len(tokens))
print(tokens[:10])

# To text
text = nltk.Text(tokens)
print(type(text))
print(text[1024:1062])
print(text.collocations())

## Trim to actual book
start_index = raw.find("PART I")
end_index = raw.rfind("End of Project Gutenberg's Crime")
raw = raw[start_index:end_index]
print(raw.find("PART I"))

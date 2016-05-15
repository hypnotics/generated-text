#http://news.bbc.co.uk/2/hi/health/2284783.stm
import nltk
from bs4 import BeautifulSoup
from urllib import request

url = "http://news.bbc.co.uk/2/hi/health/2284783.stm"
html = request.urlopen(url).read().decode('utf8')
html[:60]
raw = BeautifulSoup(html).get_text()
tokens = nltk.word_tokenize(raw)
#print(tokens)
tokens = tokens[110:390]
text = nltk.Text(tokens)
print(text.concordance('gene'))
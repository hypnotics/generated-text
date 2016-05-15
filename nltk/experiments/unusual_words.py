# Natural Language Toolkit: code_unusual
import nltk

def unusual_words(text):
    text_vocab = set(w.lower() for w in text if w.isalpha())
    english_vocab = set(w.lower() for w in nltk.corpus.words.words())
    unusual = text_vocab - english_vocab

    plural = set(w for w in unusual if w.endswith("s") and (w[::-1] for w in english_vocab))

    past_tense = set(w for w in unusual if w.endswith("ed") and (w[::-2] for w in english_vocab))

    present_tense = set(w for w in unusual if w.endswith("ing") and (w[::-3] for w in english_vocab))

    normalized = unusual - plural - past_tense - present_tense

    return sorted(normalized)

print(unusual_words(nltk.corpus.gutenberg.words('austen-sense.txt')))
# print(unusual_words(nltk.corpus.nps_chat.words()))
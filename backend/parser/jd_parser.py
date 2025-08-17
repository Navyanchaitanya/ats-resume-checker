import re

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    return text

def parse_jd(jd_text):
    return clean_text(jd_text)

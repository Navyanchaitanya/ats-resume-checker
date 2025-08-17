import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction import text as sklearn_text

REQUIRED_SECTIONS = ["education", "experience", "skills", "projects", "certifications", "summary"]

def tfidf_similarity_score(resume_text, jd_text):
    try:
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf = vectorizer.fit_transform([resume_text.lower(), jd_text.lower()])
        score = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
        return round(score * 100, 2)
    except:
        return 0.0

def formatting_score(resume_text):
    return 90 if len(resume_text) > 200 else 60

def readability_score(resume_text):
    sentences = re.split(r'[.!?]', resume_text)
    words = resume_text.split()
    if len(sentences) == 0:
        return 50
    avg = len(words) / len(sentences)
    return max(30, min(100, 100 - abs(avg - 20) * 5))

def completeness_score(resume_text):
    found = [section for section in REQUIRED_SECTIONS if section in resume_text.lower()]
    return round(len(found) / len(REQUIRED_SECTIONS) * 100, 2)

def extract_keywords(text, top_n=20):
    stop_words = sklearn_text.ENGLISH_STOP_WORDS
    words = re.findall(r'\b\w{4,}\b', text.lower())
    filtered = [word for word in words if word not in stop_words]
    freq = {}
    for word in filtered:
        freq[word] = freq.get(word, 0) + 1
    sorted_words = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    keywords = [word for word, _ in sorted_words[:top_n]]
    return list(set(keywords))

def overall_score(resume_text, jd_text):
    sim = tfidf_similarity_score(resume_text, jd_text)
    read = readability_score(resume_text)
    comp = completeness_score(resume_text)
    fmt = formatting_score(resume_text)

    total = round((sim * 0.5 + read * 0.15 + comp * 0.2 + fmt * 0.15), 2)

    keywords_from_jd = extract_keywords(jd_text)
    keywords_in_resume = [kw for kw in keywords_from_jd if kw in resume_text.lower()]
    missing_keywords = list(set(keywords_from_jd) - set(keywords_in_resume))

    return {
        "total": total,
        "similarity": sim,
        "readability": read,
        "completeness": comp,
        "formatting": fmt,
        "matched_keywords": keywords_in_resume,
        "missing_keywords": missing_keywords
    }

# === backend/models.py ===

class ResumeScore:
    def __init__(self, id, filename, score, keyword_match, formatting, readability, completeness):
        self.id = id
        self.filename = filename
        self.score = score
        self.keyword_match = keyword_match
        self.formatting = formatting
        self.readability = readability
        self.completeness = completeness

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "score": self.score,
            "keyword_match": self.keyword_match,
            "formatting": self.formatting,
            "readability": self.readability,
            "completeness": self.completeness
        }

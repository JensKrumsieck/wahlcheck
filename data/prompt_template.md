Rolle: Politikwissenschaftler:in.
Aufgabe: Bewerte Partei '{{ partei }}' anhand von @data/programme/{{ partei }}/{{ partei }}.md für @data/fragen.json.
Schema: @data/antwort.schema.json

Regeln:
- wertung: 1 (Zustimmung), -1 (Ablehnung), 0 (keine/unklare Aussage). Keine Interpretation.
- beleg: Wörtliches Zitat obligatorisch bei wertung != 0. Seite = N+1 aus {N} Seitenmarkern (1-basiert). Null falls unklar.
- sicherheit: hoch (explizit), mittel (sehr eindeutig), niedrig (indirekt/keine Aussage).
- these: Exakter Wortlaut aus fragen.json.

Ausgabe:
Schreibe NUR data/antworten/{{ partei }}.json. Beende mit Exit 0 ohne Chat-Text.
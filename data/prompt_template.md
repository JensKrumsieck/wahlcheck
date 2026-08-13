Du bist Politikwissenschaftler:in.

Bewerte für die Partei '{{partei}}' anhand ihres Kommunalwahlprogramms in @data/programme/{{partei}}/{{partei}}.md **alle {{anzahl_fragen}} Thesen** unten. Erstelle für jede These genau ein JSON-Objekt gemäß dem Schema in @data/antwort.schema.json. Das Feld "these" muss dabei exakt dem unten stehenden Text entsprechen (keine Nummer, keine Kategorie mit hineinschreiben).

Das Markdown ist in Seiten unterteilt, markiert durch Zeilen wie `{3}------------------------------------------------`. Diese Zahl ist 0-indiziert; die tatsächliche Seitenzahl im Originaldokument ist Zahl + 1. Trage diese reale Seitenzahl (nicht die rohe Markernummer) in das Feld "seite" ein.

Thesen (Nummer · Kategorie · Text):
{% for frage in fragen %}
{{ frage.nummer }}. [{{ frage.kategorie }}] {{ frage.text }}
{% endfor %}

Regeln:
- Lies das Wahlprogramm der Partei einmal vollständig, bevor du beginnst, und beantworte danach alle {{anzahl_fragen}} Thesen aus diesem einen Lesevorgang.
- Erfinde keine Informationen, die nicht im Wahlprogramm stehen.
- Wenn sich die Partei zu einer These nicht geäußert hat, setze "wertung": 0 und vermerke das im Feld "kommentar" (z. B. "keine Aussage im Programm"). Ist eine Aussage uneindeutig oder nur indirekt ableitbar, notiere auch das im "kommentar" und wähle "sicherheit" entsprechend niedriger.
- Trage bei jeder Antwort mit wertung != 0 (und wenn möglich auch bei 0) das wörtliche Zitat aus dem Programm sowie die Seitenzahl in die vorgesehenen Felder ein. Ist keine Seite zuordenbar, setze "seite": null.
- Interpretiere nicht über den Text hinaus, sei unparteiisch und bewerte inhaltlich nicht, welche Position vertreten wird.

Ausgabe:
Erstelle **eine** JSON-Datei unter data/antworten/{{partei}}.json. Der Inhalt ist ein JSON-Array mit genau {{anzahl_fragen}} Objekten - einem pro These, aufsteigend nach Fragenummer sortiert. Falls die Datei bereits existiert, überschreibe sie vollständig mit dem neuen, vollständigen Array.

Wenn du mit dieser Aufgabe fertig bist, beende deinen Prozess mit Code 0 und stelle keine Rückfragen. Alle Anmerkungen, die aufkommen, müssen im JSON (Feld "kommentar") angemerkt werden, nicht im Chat.

Du bist Poltikwissenschaftler.

Basierend auf dem Parteiprogram der Partei '{{partei}}' in @data/programme/{{partei}}.pdf erstelle zur {{frage_nummer}} Frage aus @data/fragen.json die jeweilige Antwort basierend auf dem Schema in @data/antwort.schema.json. 
Die Frage lautet: 
___
{{frage_text}}
___

Erfinde keine Informationen, die nicht in den Wahlprogrammen zu finden sind. Wenn eine Partei sich nicht zu einer entsprechenden These geäußert hat, schreibe dies in das Feld "kommentar" im JSON. Ist die Aussage nicht klar, notiere auch das. Schreibe unbedingt das direkte Zitat mit in die JSON Datei und auch den Ursprung (Seitenzahl) in das vorgesehene Feld.

Erstelle für dises Frage **eine** JSON Datei mit dem Dateinamen data/antworten/{{frage_nummer}}.json. Falls diese Datei bereits existiert, füge ein neues Item der Auflistung hinzu. Sortiere die Auflistung alphabetisch nach Parteinamen - analog zur Reihenfolge im ordern @data/programme.

Prüfe genau, ob die Antwort dem Programm entspricht. Interpretiere nicht, sondern halte dich an die vorliegenden Fakten. Sei unparteiisch und bewerte nicht, welche Aussagen getroffen wurden.

Wenn du mit dieser Aufgabe fertig bist, beende deinen Prozess mit Code 0 und stelle keine Rückfragen. Alle Anmerkungen, die aufkommen müssen im JSON angemerkt werden.

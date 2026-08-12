import fragen from '../../data/fragen.json';

export interface Question {
    id: string;
    these: string;
    kategorie: string;
}
export type Wertung = -1 | 0 | 1;

export interface PartyAnswer {
    wertung: Wertung;
    sicherheit: "hoch" | "mittel" | "niedrig";
    zitat: string;
    seite: number | null;
    kommentar: string | null;
}

export interface Party {
    name: string;
    answers: Record<string, PartyAnswer>;
}

export const questions: Question[] = Object.entries(fragen).flatMap(
	([kategorie, these]) =>
		these.map((text, index) => ({
			id: `${kategorie}-${index + 1}`,
			these: text,
			kategorie
		}))
);
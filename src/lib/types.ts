import fragen from '../../data/input/fragen.json';
import release from '../../data/version.json';

export const releaseTag: string = release.tag;

export interface Question {
    id: string;
    these: string;
    kategorie: string;
}
export type Wertung = -1 | 0 | 1;

export interface PartyAnswer {
    these: string;
    wertung: Wertung;
    sicherheit: "hoch" | "mittel" | "niedrig";
    zitat: string;
    seite: number | null;
    kommentar: string | null;
}

export interface Party {
    name: string;
    answers: PartyAnswer[];
    answerByThese: Map<string, PartyAnswer>;
}

export interface UserAnswers {
    [questionId: string]: Wertung;
}

export const questions: Question[] = Object.entries(fragen).flatMap(
    ([kategorie, these]) =>
        these.map((text, index) => ({
            id: `${kategorie}-${index + 1}`,
            these: text,
            kategorie
        }))
);

const DISPLAY_NAMES: Record<string, string> = {
    AFD: 'AfD',
    BSW: 'BSW',
    CDU: 'CDU',
    FDP: 'FDP',
    GRUENE: 'GRÜNE',
    LINKE: 'Die Linke',
    SPD: 'SPD',
    Volt: 'Volt',
};

export const PARTY_COLORS: Record<string, string> = {
    AfD: '#009ee0',
    BSW: '#7a4171',
    CDU: '#666666',
    'Die Linke': '#bf1d97',
    FDP: '#efb118',
    GRÜNE: '#3ca951',
    SPD: '#d23a33',
    Volt: '#582c83',
};
const FALLBACK_COLOR = '#6b7280';

export function colorFor(partyName: string): string {
    return PARTY_COLORS[partyName] ?? FALLBACK_COLOR;
}

export function answerIcon(wertung: number) {
    if (wertung === 1) return "👍";
    if (wertung === -1) return "👎";
    return "⭕";
}

export function answerLabel(wertung: number) {
    if (wertung === 1) return "👍 Zustimmung";
    if (wertung === -1) return "👎 Ablehnung";
    return "⭕ Neutral";
  }

const antwortModules = import.meta.glob<PartyAnswer[]>('../../data/antworten/*.json', {
    eager: true,
    import: 'default'
});

export const parties: Party[] = Object.entries(antwortModules)
    .map(([path, answers]) => {
        const stamm = path.match(/([^/]+)\.json$/)?.[1] ?? path;
        return {
            name: DISPLAY_NAMES[stamm] ?? stamm,
            answers,
            answerByThese: new Map(answers.map(answer => [answer.these, answer]))
        };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));

// Antwort einer Partei zu einer bestimmten Frage, gematcht über den
// Thesentext (nicht über den Array-Index, siehe computeScore weiter unten).
export function answerFor(party: Party, question: Question): PartyAnswer | undefined {
    return party.answerByThese.get(question.these);
}

/// 2 wenn beide gleich, 1 wenn partei oder user neutral, 0 wenn entgegengesetzt
export function scoreMatch(a: Wertung, b: Wertung) {
    if (a == b) return 2;
    if (a == 0 || b == 0) return 1;
    return 0;
}

export function computeScore(userAnswers: UserAnswers) {
    return parties.map(party => {
        const totalScore = questions.reduce((sum, question) => {
            const userAnswer = userAnswers[question.id];
            if (userAnswer === undefined) return sum;

            const partyAnswer = answerFor(party, question);
            if (!partyAnswer) return sum; // Partei hat (noch) keine Antwort zu dieser These

            return sum + scoreMatch(userAnswer, partyAnswer.wertung);
        }, 0);

        return {
            name: party.name,
            totalScore,
            maxScore: questions.length * 2
        };
    });
}
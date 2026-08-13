import fragen from '../../data/fragen.json';

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
    answers: PartyAnswer[]
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
    Linke: 'Die Linke',
    SPD: 'SPD',
    Volt: 'Volt',
};

const antwortModules = import.meta.glob<PartyAnswer[]>('../../data/antworten/*.json', {
    eager: true,
    import: 'default'
});

const parties: Party[] = Object.entries(antwortModules)
    .map(([path, answers]) => {
        const stamm = path.match(/([^/]+)\.json$/)?.[1] ?? path;
        return { name: DISPLAY_NAMES[stamm] ?? stamm, answers };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));

/// 2 wenn beide gleich, 1 wenn partei oder user neutral, 0 wenn entgegengesetzt
function scoreMatch(a: Wertung, b: Wertung) {
    if (a == b) return 2;
    if (a == 0 || b == 0) return 1;
    return 0;
}

export function computeScore(userAnswers: UserAnswers) {
    return parties.map(party => {
        const answerByThese = new Map(party.answers.map(answer => [answer.these, answer]));

        const totalScore = questions.reduce((sum, question) => {
            const userAnswer = userAnswers[question.id];
            if (userAnswer === undefined) return sum;

            const partyAnswer = answerByThese.get(question.these);
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
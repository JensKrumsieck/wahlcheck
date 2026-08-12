import fragen from '../../data/fragen.json';

import AFD from '../../data/antworten/AFD.json';
import BSW from '../../data/antworten/BSW.json';
import CDU from '../../data/antworten/CDU.json';
import GRUENE from '../../data/antworten/GRUENE.json';
import Linke from '../../data/antworten/Linke.json';
import SPD from '../../data/antworten/SPD.json';
import Volt from '../../data/antworten/Volt.json';

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

const parties: Party[] = [
    { name: 'AfD', answers: AFD as PartyAnswer[] },
    { name: 'BSW', answers: BSW as PartyAnswer[] },
    { name: 'CDU', answers: CDU as PartyAnswer[] },
    { name: 'GRÜNE', answers: GRUENE as PartyAnswer[] },
    { name: 'Die Linke', answers: Linke as PartyAnswer[] },
    { name: 'SPD', answers: SPD as PartyAnswer[] },
    { name: 'Volt', answers: Volt as PartyAnswer[] },
]

/// 2 wenn beide gleich, 1 wenn partei oder user neutral, 0 wenn entgegengesetzt
function scoreMatch(a: Wertung, b: Wertung) {
    if (a == b) return 2;
    if (a == 0 || b == 0) return 1;
    if (a != b) return 0;
    return 0;
}

export function computeScore(userAnswers: UserAnswers) {
    return parties.map(party => ({
        name: party.name,
        totalScore: party.answers.reduce((sum, answer, index) => {
            const questionId = questions[index]?.id;
            const userAnswer = userAnswers[questionId];
            return sum + (userAnswer !== undefined ? scoreMatch(userAnswer, answer.wertung) : 0);
        }, 0),
        maxScore: party.answers.length * 2
    }));
}
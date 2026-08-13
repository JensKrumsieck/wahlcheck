import type { UserAnswers } from './types';

const STORAGE_KEY = 'wahlomat:answers';

export function saveAnswers(answers: UserAnswers): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function loadAnswers(): UserAnswers | null {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed as UserAnswers;
    } catch {
        // korrupter Wert im localStorage, ignorieren
    }
    return null;
}

export function clearAnswers(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}

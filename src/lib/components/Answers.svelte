<script lang="ts">
    import { type Question, type Wertung, scoreMatch, colorFor, answerFor, type UserAnswers, answerLabel, parties } from "$lib/types";
    interface Props {
        score: UserAnswers | undefined;
        questions: Question[];
    }
    let { score, questions }: Props = $props();

    function sortedPartiesFor(question: Question) {
        return [...parties].sort((a, b) => {
            const answerA = answerFor(a, question);
            const answerB = answerFor(b, question);
            const scoreA = answerA && score ? scoreMatch(score[question.id], answerA.wertung) : -1;
            const scoreB = answerB && score ? scoreMatch(score[question.id], answerB.wertung) : -1;
            return scoreB - scoreA;
        });
    }
</script>

<h2 id="antworten" class="mt-12 mb-4 scroll-mt-20 font-display text-2xl font-semibold text-ink">Antworten im Detail</h2>
<small class="text-ink-muted">ℹ️ <b>KI kann Fehler machen!</b> Überprüfe die Antworten anhand der <a class="underline hover:text-ink-faint" href="/list">Wahlprogramme.</a></small>
<div class="flex flex-col gap-3 pb-16 mt-5">
    {#each questions as question}
        {@const sorted = sortedPartiesFor(question)}
        <details class="group rounded-xl border border-border bg-surface p-4 open:shadow-lg sm:p-5">
            <summary class="flex cursor-pointer list-none flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center gap-3">
                    <span class="text-ink-faint transition group-open:rotate-90">▸</span>
                    <span class="font-medium text-ink">{question.these}</span>
                </div>
                <div class="flex shrink-0 items-center gap-3 pl-6 sm:pl-0">
                    {#if score}<span class="text-sm text-ink-muted">Du: {answerLabel(score[question.id])}</span>{/if}
                    <span class="flex gap-1">
                        {#each sorted as party}
                            <span class="h-2.5 w-2.5 rounded-full" style="background-color: {colorFor(party.name)}" title={party.name}></span>
                        {/each}
                    </span>
                </div>
            </summary>

            <ul class="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                {#each sorted as party}
                    {@const answer = answerFor(party, question)}
                    <li class="rounded-lg border-l-4 bg-surface-2 px-3 py-2" style="border-color: {colorFor(party.name)}">
                        <p class="font-semibold text-ink">{party.name}</p>
                        {#if answer}
                            <p class="text-sm text-ink-muted">
                                {answerLabel(answer.wertung)} · Sicherheit: {answer.sicherheit}
                            </p>
                            {#if answer.zitat}
                                <blockquote class="mt-1 text-sm text-ink-muted italic">
                                    „{answer.zitat}“{#if answer.seite}&nbsp;(S. {answer.seite}){/if}
                                </blockquote>
                            {/if}
                            {#if answer.kommentar}
                                <p class="mt-1 text-xs text-ink-faint">{answer.kommentar}</p>
                            {/if}
                        {:else}
                            <p class="text-sm text-ink-faint">keine Antwort vorhanden</p>
                        {/if}
                    </li>
                {/each}
            </ul>
        </details>
    {/each}
</div>

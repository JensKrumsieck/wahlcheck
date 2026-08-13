<script lang="ts">
  import { computeScore, answerFor, scoreMatch, type Question, type UserAnswers, parties } from "$lib/types";
  import { AxisX, AxisY, BarX, Plot, Text } from "svelteplot";

  interface Props {
    score: UserAnswers;
    questions: Question[];
  }

  let { score, questions }: Props = $props();

  let raw = $derived(computeScore(score));
  let values = $derived(
    raw.map((i) => ({
      name: i.name,
      value: i.totalScore / i.maxScore,
      label: `${Math.round((i.totalScore / i.maxScore) * 100)}%`,
    })),
  );

  const scheme = {
    AfD: "#009ee0",
    BSW: "#7a4171",
    CDU: "#000000",
    "Die Linke": "#bf1d97",
    FDP: "#efb118",
    GRÜNE: "#3ca951",
    SPD: "#d23a33",
    Volt: "#582c83",
  };
</script>

<Plot y={{ type: "band" }} x={{ percent: true }} color={{ scheme }} marginRight={40}>
  <AxisX title="" />
  <AxisY title="" />
  <BarX data={values} y="name" x="value" fill="name" sort={{ channel: "x", order: "descending" }} />
  <Text data={values} y="name" x="value" text="label" dx={6} textAnchor="start" />
</Plot>

<ul>
  {#each questions as question}
    {@const sortedParties = [...parties].sort((a, b) => {
      const answerA = answerFor(a, question);
      const answerB = answerFor(b, question);
      const scoreA = answerA ? scoreMatch(score[question.id], answerA.wertung) : -1;
      const scoreB = answerB ? scoreMatch(score[question.id], answerB.wertung) : -1;
      return scoreB - scoreA;
    })}
    <li class="prose max-w-none mx-5 my-6 px-2 border rounded-md shadow-lg border-slate-200">
      <small>{question.id}</small>
      <h3>{question.these}</h3>
      <ul>
      <li>Deine Antwort: {score[question.id] === 1 ? "👍 Zustimmung" : score[question.id] === -1 ? "👎 Ablehnung" : "⭕ Neutral"}</li>
        {#each sortedParties as party}
          {@const answer = answerFor(party, question)}
          <li>
            <strong>{party.name}:</strong>
            {#if answer}
              {answer.wertung === 1 ? "👍 Zustimmung" : answer.wertung === -1 ? "👎 Ablehnung" : "⭕ Neutral"} (Sicherheit {answer.sicherheit})
              {#if answer.zitat}
                <blockquote>
                  „{answer.zitat}“{#if answer.seite}
                    (S. {answer.seite}){/if}
                </blockquote>
              {/if}
              {#if answer.kommentar}
                <small>{answer.kommentar}</small>
              {/if}
            {:else}
              keine Antwort vorhanden
            {/if}
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

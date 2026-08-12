<script lang="ts">
  import { computeScore, type UserAnswers } from "$lib/types";
  import { AxisX, AxisY, BarX, Plot } from "svelteplot";

  interface Props {
    score: UserAnswers;
  }

  let { score }: Props = $props();

  let raw = $derived(computeScore(score));
  let values = $derived(
    raw.map((i) => ({
      name: i.name,
      value: i.totalScore / i.maxScore,
    })),
  );

  const scheme = {
    CDU: "#55598e",
    SPD: "#d23a33",
    GRÜNE: "#3ca951",
    FDP: "#efb118",
    Linke: "#bf1d97",
  };
</script>

<Plot x={{ type: "band" }} y={{ percent: true }} color={{ scheme }}>
  <AxisX title="" />
  <AxisY title="" />
  <BarX
    data={values}
    y="name"
    x="value"
    fill="party"
    sort={{ channel: "value", order: "descending" }}
  />
</Plot>

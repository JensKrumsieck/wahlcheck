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

<Plot y={{ type: "band" }} x={{ percent: true }} color={{ scheme }}>
  <AxisX title="" />
  <AxisY title="" />
  <BarX
    data={values}
    y="name"
    x="value"
    fill="name"
    sort={{ channel: "value", order: "descending" }}
  />
</Plot>

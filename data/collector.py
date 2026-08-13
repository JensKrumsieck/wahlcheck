from enum import Enum
import json
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from threading import Lock
from argparse import ArgumentParser
from jinja2 import Environment, FileSystemLoader
import anthropic

client = anthropic.Anthropic()

working_dir = Path(__file__).parent


class Effort(Enum):
    low = "low"
    medium = "medium"
    high = "high"
    xhigh = "xhigh"
    max = "max"


class Model(Enum):
    haiku = "haiku"
    sonnet = "sonnet"
    opus = "opus"


parser = ArgumentParser("Collector")
parser.add_argument("--model", required=True, type=Model)
parser.add_argument("--effort", type=Effort, default=Effort.low)
args = parser.parse_args()

model = args.model
effort = args.effort

env = Environment(loader=FileSystemLoader(working_dir))
template = env.get_template("prompt_template.md")

with open(working_dir / "fragen.json") as f:
    fragen = json.load(f)

anzahl_fragen = sum(len(thesen) for thesen in fragen.values())

print_lock = Lock()


def log(message: str) -> None:
    with print_lock:
        print(message, flush=True)


def bewerte_partei(partei_pdf: Path) -> tuple[str, bool, float]:
    partei = partei_pdf.stem

    prompt = template.render(
        partei=partei,
    )

    log(f"→ {partei}: gestartet")
    start = time.perf_counter()

    result = subprocess.run(
        [
            "claude",
            "--model",
            model.value,
            "--effort",
            effort.value,
            "--permission-mode",
            "auto",
            "-p",
            prompt,
        ],
        cwd=working_dir,
        capture_output=True,
        text=True,
    )

    dauer = time.perf_counter() - start
    erfolg = result.returncode == 0

    if erfolg:
        log(f"✓ {partei}: fertig ({dauer:.0f}s)")
    else:
        log(
            f"✗ {partei}: fehlgeschlagen nach "
            f"{dauer:.0f}s (exit code {result.returncode})"
        )

        fehlertext = (result.stderr or result.stdout or "").strip()

        if fehlertext:
            tail = "\n".join(f"    {line}" for line in fehlertext.splitlines()[-15:])
            log(f"  Fehlerausgabe von {partei}:\n{tail}")

    return partei, erfolg, dauer


partei_programme = sorted((working_dir / "programme").glob("*.pdf"))

print(
    f"Bewerte {anzahl_fragen} Thesen für "
    f"{len(partei_programme)} Parteien "
    f"(Modell: {model.value}, Effort: {effort.value})\n"
)

gesamtstart = time.perf_counter()

with ThreadPoolExecutor(max_workers=len(partei_programme)) as pool:
    ergebnisse = list(pool.map(bewerte_partei, partei_programme))

gesamtdauer = time.perf_counter() - gesamtstart

erfolgreich = [partei for partei, ok, _ in ergebnisse if ok]

fehlgeschlagen = [partei for partei, ok, _ in ergebnisse if not ok]

print(
    f"\n{len(erfolgreich)}/{len(ergebnisse)} Parteien "
    f"erfolgreich in {gesamtdauer:.0f}s."
)

if fehlgeschlagen:
    print(f"Fehlgeschlagen: {', '.join(fehlgeschlagen)}")
    sys.exit(1)

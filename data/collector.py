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

working_dir = Path(__file__).parent


class Effort(Enum):
    medium = "medium"
    high = "high"
    xhigh = "xhigh"
    max = "max"


class Model(Enum):
    sonnet = "sonnet"
    opus = "opus"


parser = ArgumentParser("Collector")
parser.add_argument("--model", required=True, type=Model)
parser.add_argument("--effort", required=False, type=Effort)
args = parser.parse_args()

model: Model = args.model
effort: Effort = args.effort if args.effort else Effort.medium

env = Environment(loader=FileSystemLoader(working_dir))
template = env.get_template("prompt_template.md")

with open(working_dir / "fragen.json") as f:
    fragen = json.load(f)

fragen_liste = []
ix = 1
for kategorie, thesen in fragen.items():
    for text in thesen:
        fragen_liste.append({"nummer": ix, "kategorie": kategorie, "text": text})
        ix += 1

print_lock = Lock()


def log(message: str) -> None:
    with print_lock:
        print(message, flush=True)


def bewerte_partei(partei_pdf: Path) -> tuple[str, bool, float]:
    partei = partei_pdf.stem
    prompt = template.render(
        fragen=fragen_liste,
        anzahl_fragen=len(fragen_liste),
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
        capture_output=True,
        text=True,
    )
    dauer = time.perf_counter() - start
    erfolg = result.returncode == 0

    if erfolg:
        log(f"✓ {partei}: fertig ({dauer:.0f}s)")
    else:
        log(
            f"✗ {partei}: fehlgeschlagen nach {dauer:.0f}s (exit code {result.returncode})"
        )
        fehlertext = (result.stderr or result.stdout or "").strip()
        if fehlertext:
            tail = "\n".join(f"    {line}" for line in fehlertext.splitlines()[-15:])
            log(f"  Fehlerausgabe von {partei}:\n{tail}")

    return partei, erfolg, dauer


partei_pdfs = sorted((working_dir / "programme").rglob("*.pdf"))

print(
    f"Bewerte {len(fragen_liste)} Thesen für {len(partei_pdfs)} Parteien "
    f"(Modell: {model.value}, Effort: {effort.value})\n"
)

gesamtstart = time.perf_counter()
with ThreadPoolExecutor(max_workers=len(partei_pdfs)) as pool:
    ergebnisse = list(pool.map(bewerte_partei, partei_pdfs))
gesamtdauer = time.perf_counter() - gesamtstart

erfolgreich = [partei for partei, ok, _ in ergebnisse if ok]
fehlgeschlagen = [partei for partei, ok, _ in ergebnisse if not ok]

print(
    f"\n{len(erfolgreich)}/{len(ergebnisse)} Parteien erfolgreich in {gesamtdauer:.0f}s."
)
if fehlgeschlagen:
    print(f"Fehlgeschlagen: {', '.join(fehlgeschlagen)}")
    sys.exit(1)

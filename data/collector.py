import json
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from jinja2 import Environment, FileSystemLoader

working_dir = Path(__file__).parent

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


def bewerte_partei(partei_pdf: Path) -> None:
    partei = partei_pdf.stem
    prompt = template.render(
        fragen=fragen_liste,
        anzahl_fragen=len(fragen_liste),
        partei=partei,
    )
    subprocess.run(
        [
            "claude",
            "--model",
            "opus",
            "--effort",
            "xhigh",
            "--permission-mode",
            "auto",
            "-p",
            prompt,
        ]
    )


partei_pdfs = sorted((working_dir / "programme").rglob("*.pdf"))

with ThreadPoolExecutor(max_workers=len(partei_pdfs)) as pool:
    list(pool.map(bewerte_partei, partei_pdfs))

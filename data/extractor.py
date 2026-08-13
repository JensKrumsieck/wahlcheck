from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import subprocess

working_dir = Path(__file__).parent
partei_pdfs = sorted((working_dir / "programme").rglob("*.pdf"))


def extract_text(partei_pdf):
    subprocess.run(
        [
            "marker_single",
            "--paginate_output",
            "--output_dir",
            working_dir / "programme",
            "--disable_ocr",
            partei_pdf,
        ]
    )


with ThreadPoolExecutor(max_workers=len(partei_pdfs)) as pool:
    list(pool.map(extract_text, partei_pdfs))

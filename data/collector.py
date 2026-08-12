import json
from pathlib import Path

with open(Path(__file__).parent / "fragen.json") as f:
    fragen = json.load(f)

print(fragen)

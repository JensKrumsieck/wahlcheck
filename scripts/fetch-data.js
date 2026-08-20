// Fetches the latest "wahlcheck-antworten.zip" release asset from the
// wahlcheck_pipeline repo and extracts it into /data. Runs before dev/build.
// Network or upstream issues must never break the app build, so every
// failure path here just warns and exits 0, leaving /data as it was.
import { mkdtempSync, rmSync, existsSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import AdmZip from 'adm-zip';

const REPO = 'JensKrumsieck/wahlcheck_pipeline';
const ASSET_NAME = 'wahlcheck-antworten.zip';
const ROOT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT_DIR, 'data');

// Picks up GITHUB_TOKEN from .env for local dev; real env vars (CI) already
// take precedence and .env may simply not exist there, so this is best-effort.
try {
	process.loadEnvFile(join(ROOT_DIR, '.env'));
} catch {
	// no .env file — fine, rely on whatever is already in process.env
}

function warn(message) {
	console.warn(`[fetch-data] ${message} — skipping, keeping existing /data as-is.`);
}

async function main() {
	const headers = {
		Accept: 'application/vnd.github+json',
		'User-Agent': 'wahlcheck-build-script'
	};
	if (process.env.GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	}

	const releaseRes = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
		headers
	});
	if (!releaseRes.ok) {
		warn(`could not fetch latest release for ${REPO} (HTTP ${releaseRes.status})`);
		return;
	}

	const release = await releaseRes.json();
	const asset = release.assets?.find((a) => a.name === ASSET_NAME);
	if (!asset) {
		warn(`release "${release.tag_name ?? 'latest'}" has no "${ASSET_NAME}" asset`);
		return;
	}

	const assetRes = await fetch(asset.browser_download_url, { headers });
	if (!assetRes.ok) {
		warn(`could not download "${ASSET_NAME}" (HTTP ${assetRes.status})`);
		return;
	}
	const zipBuffer = Buffer.from(await assetRes.arrayBuffer());

	const tmpExtractDir = mkdtempSync(join(tmpdir(), 'wahlcheck-antworten-'));
	try {
		new AdmZip(zipBuffer).extractAllTo(tmpExtractDir, true);
	} catch (err) {
		warn(`could not extract "${ASSET_NAME}" (${err.message})`);
		rmSync(tmpExtractDir, { recursive: true, force: true });
		return;
	}

	if (existsSync(DATA_DIR)) rmSync(DATA_DIR, { recursive: true, force: true });
	cpSync(tmpExtractDir, DATA_DIR, { recursive: true });
	rmSync(tmpExtractDir, { recursive: true, force: true });

	console.log(`[fetch-data] extracted "${ASSET_NAME}" from release "${release.tag_name}" into /data`);
}

main().catch((err) => warn(err.message));

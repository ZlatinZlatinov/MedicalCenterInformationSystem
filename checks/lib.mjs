// Shared helpers for the exercise self-checks.
// These check STRUCTURE, not quality: they tell you something required is missing,
// they cannot tell you the work is good. Only you and the defence can do that.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

export const results = [];
export const check = (name, ok, detail = '') => results.push({ name, ok: Boolean(ok), detail });

export const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : null);

/** the body under a "## Heading", trimmed */
export const section = (text, heading) => {
  if (!text) return null;
  const re = new RegExp(`^##+\\s*${heading}\\s*$`, 'im');
  const start = text.search(re);
  if (start === -1) return null;
  const after = text.slice(start);
  const next = after.slice(after.indexOf('\n')).search(/^##\s/m);
  return (next === -1 ? after.slice(after.indexOf('\n')) : after.slice(after.indexOf('\n'), after.indexOf('\n') + next)).trim();
};

/** lines that carry content, ignoring HTML comments and empty bullets */
export const filled = (body) =>
  (body ?? '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .split('\n')
    .map((l) => l.replace(/^[-*\d.\s\[\]x]+/i, '').trim())
    .filter((l) => l.length > 2);

/** a section with its guidance comments removed, for regex questions like "does this mention Google" */
export const prose = (body) => (body ?? '').replace(/<!--[\s\S]*?-->/g, '');

/**
 * Lines that carry an answer, not just a label. The template ships stubs like "- Model:",
 * and `filled` counts those as content because it only looks at length.
 */
export const answered = (body) => filled(body).filter((l) => !/^[^:]{1,40}:\s*$/.test(l));

export const git = (args, fallback = '') => {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim();
  } catch {
    return fallback;
  }
};

export const findFile = (dir, test, depth = 3) => {
  if (!existsSync(dir) || depth < 0) return null;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFile(full, test, depth - 1);
      if (found) return found;
    } else if (test(entry.name, full)) return full;
  }
  return null;
};

/** JSON that may not be there or may not parse */
export const json = (path) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
};

/** every file under dir matching test; the plural of findFile */
export const findFiles = (dir, test, depth = 4, out = []) => {
  if (!existsSync(dir) || depth < 0) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'checks' || entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) findFiles(full, test, depth - 1, out);
    else if (test(entry.name, full)) out.push(full);
  }
  return out;
};

const SOURCE = new Set([
  '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.py', '.rb', '.go', '.java', '.cs', '.php',
  '.html', '.css', '.svelte', '.vue', '.astro', '.sql', '.yml', '.yaml', '.json', '.md', '.sh',
]);

/** every source file in the project, so a check can ask "is this anywhere at all" */
export const sources = (dir = '.') =>
  findFiles(dir, (name) => SOURCE.has(extname(name)), 5).filter((f) => {
    try {
      return statSync(f).size < 400_000;
    } catch {
      return false;
    }
  });

/**
 * Files whose contents match a pattern. Language-agnostic on purpose: these checks
 * must work whether the student picked Node, Python or something else.
 */
export const grep = (pattern, { files = sources(), where = () => true } = {}) => {
  const re = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
  const hits = [];
  for (const file of files) {
    if (!where(file)) continue;
    let text;
    try {
      text = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    if (re.test(text)) hits.push(file);
  }
  return hits;
};

/** the source files that look like tests, by the usual naming conventions */
export const testFiles = (dir = '.') =>
  findFiles(dir, (name) => /(\.test\.|_test\.|\.spec\.)/.test(name) || /^test_.*\.(py|js|mjs|ts)$/.test(name), 5);

/**
 * The AC-n ids declared in SPEC.md. The convention is `- [AC-3] ...` under
 * "## Acceptance criteria"; a test proves it by naming the id in its title.
 * Grep-based traceability cannot go stale quietly the way a hand-kept table can.
 */
export const acceptanceIds = (spec) => {
  const body = section(spec, 'Acceptance criteria');
  return [...new Set([...(body ?? '').matchAll(/\bAC-(\d+)\b/g)].map((m) => `AC-${m[1]}`))];
};

/** run a command and report what happened, instead of throwing */
export const run = (cmd, args, { timeout = 180_000, cwd = '.' } = {}) => {
  try {
    const out = execFileSync(cmd, args, { encoding: 'utf8', stdio: 'pipe', timeout, cwd, shell: false });
    return { code: 0, out };
  } catch (error) {
    return { code: error.status ?? 1, out: `${error.stdout ?? ''}${error.stderr ?? ''}` || String(error.message) };
  }
};

/**
 * course.json: the handful of facts about this copy of the repository that nobody can
 * work out by reading the code: how to start the MCP server and where the deployment
 * answers. It exists so those live somewhere a script can read, rather than in prose
 * in a README, where no check can find them.
 */
export const manifest = () => json('course.json') ?? {};

/** A manifest value that has actually been filled in, ignoring the guidance keys. */
export const manifestValue = (key) => {
  const value = manifest()[key];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
};

const SECRETS = [
  [/\bAIza[0-9A-Za-z_-]{20,}/, 'a Google API key'],
  [/\bGOCSPX-[0-9A-Za-z_-]{10,}/, 'a Google OAuth client secret'],
  [/\bsk-[A-Za-z0-9]{20,}/, 'an OpenAI-style API key'],
  [/\bghp_[A-Za-z0-9]{20,}/, 'a GitHub token'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'a private key'],
];

/**
 * Your repository is public. A leaked key is billed to you and a leaked client
 * secret lets anyone sign in as your app, so this runs from Exercise 2 onward.
 */
export const secretScan = (dir = '.') => {
  const found = [];
  for (const file of sources(dir)) {
    if (file.includes('.env.example')) continue;
    let text;
    try {
      text = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    for (const [re, what] of SECRETS) if (re.test(text)) found.push(`${file}: looks like ${what}`);
  }
  return found;
};

export function report(title) {
  const failed = results.filter((r) => !r.ok);
  console.log(`${title}\n`);
  for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.ok || !r.detail ? '' : `\n       ${r.detail}`}`);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  console.log(
    failed.length
      ? 'These are structural checks and they must all pass before you hand in. Passing them is the minimum, not the point.'
      : 'Structure is in place. Whether the work is any good is decided by your evidence and by the defence.',
  );
  process.exit(failed.length ? 1 : 0);
}

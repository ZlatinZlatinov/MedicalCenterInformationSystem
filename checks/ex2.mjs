// Exercise 2 self-check: is the spec written and does the repository carry it?
//   node checks/ex2.mjs
import { acceptanceIds, answered, check, filled, json, manifestValue, prose, read, report, secretScan, section } from './lib.mjs';

const spec = read('SPEC.md');
check('SPEC.md exists', spec !== null, 'the template ships one, fill it in');

if (spec) {
  const goals = filled(section(spec, 'Goals'));
  const nonGoals = filled(section(spec, 'Non-goals'));
  const constraints = filled(section(spec, 'Constraints'));
  const criteria = filled(section(spec, 'Acceptance criteria')).filter((l) => !/^#/.test(l) && !/^Slice \d/i.test(l));
  check('Goals are written', goals.length >= 2, `found ${goals.length}, write at least 2`);
  check('Non-goals are written', nonGoals.length >= 3, `found ${nonGoals.length}, write at least 3: this is the part that saves you`);
  check('Constraints are written', constraints.length >= 2, `found ${constraints.length}`);
  check('Acceptance criteria are written', criteria.length >= 8, `found ${criteria.length}, write at least 8: the project is bigger than one slice`);
  const vague = criteria.filter((c) => /^(it )?(works|is done|is ready|looks good|is nice|работи|готово)/i.test(c));
  check('no vague acceptance criterion', vague.length === 0, vague.length ? `"${vague[0]}" cannot be checked in a minute` : '');

  // The id is what lets a test prove a criterion, and lets the check say which one is untested.
  const ids = acceptanceIds(spec);
  const unlabelled = criteria.filter((c) => !/\bAC-\d+\b/.test(c));
  check('every acceptance criterion carries an id', ids.length >= 8 && unlabelled.length === 0,
    unlabelled.length ? `${unlabelled.length} criterion(s) with no AC-n id, starting with "${unlabelled[0].slice(0, 60)}"` : `found ${ids.length} id(s)`);
  check('no id is used twice', ids.length === new Set(ids).size, 'two criteria cannot both be AC-4');

  check('the project name replaces the placeholder', !/<\s*project name\s*>/i.test(spec), 'the first line still says <Project name>');
  check('the spec vs result note is filled in', filled(section(spec, 'Spec vs result')).length >= 1, 'write what the agent missed or reinterpreted');

  const option = answered(section(spec, 'Project option'));
  check('the project option is named', option.length >= 1 && !/<.*>/.test(option.join(' ')),
    'lab booking, study groups, club events, or the own project the lecturer approved');

  // The model feature. Three things, because the third is the one students skip.
  const model = section(spec, 'The model feature');
  const modelLines = answered(model);
  check('the model feature is specified', modelLines.length >= 3 && !/\bTBD\b|\bTODO\b|<[a-z ]+>/i.test(model ?? ''),
    `found ${modelLines.length} filled line(s); name the model, the input, the output and what happens when it fails`);
  check('the model feature has a failure plan', /fails|fallback|timeout|rate|down|429|резерв|отказ/i.test(answered(model).join(' ')),
    'what does a user see when the provider is slow, rate-limited or wrong?');

  // The MCP tools table. Same description bar as mcp-server/check.mjs applies to find_lecture.
  const mcp = section(spec, 'MCP tools');
  const rows = (mcp ?? '')
    .split('\n')
    .filter((l) => l.trim().startsWith('|') && !/^\|[\s|:-]+\|$/.test(l.trim()))
    .map((l) => l.split('|').map((c) => c.trim()).filter(Boolean))
    .filter((cells) => cells.length >= 2 && !/^tool$/i.test(cells[0]));
  check('at least three MCP tools are listed', rows.length >= 3, `found ${rows.length} tool row(s) in the table`);
  const thin = rows.filter((cells) => (cells[1] ?? '').length < 20);
  check('every MCP tool has a real description', rows.length > 0 && thin.length === 0,
    thin.length ? `"${thin[0][0]}" is described in ${thin[0][1].length} characters; the model picks a tool by reading this` : '');

  // Auth: two ways in, one account.
  const auth = answered(section(spec, 'Auth')).join('\n');
  check('local sign-in is specified', /password|парола|local|локал/i.test(auth), 'email and password, hashed');
  check('a provider is specified', /google|github|gitlab|microsoft|facebook|oauth|oidc/i.test(auth), 'at least one social provider');
  check('account linking is specified', /link|verified|verify|свърз|потвърд/i.test(auth),
    'what happens when the same person signs in both ways?');

  check('the UI section is filled in', answered(section(spec, 'UI')).length >= 1, 'the stack and the screens; the checklist lives in docs/UI.md');
}

// course.json says how to start things in this repository, so the checks do not have
// to guess.
const pkg = json('package.json');
const mcpCommand = manifestValue('mcp');
check('course.json says how to start your MCP server', Boolean(mcpCommand), 'the default "npm run mcp" is fine once that script exists');
if (mcpCommand && /^npm run (\S+)/.test(mcpCommand)) {
  const script = mcpCommand.match(/^npm run (\S+)/)[1];
  check(`package.json has an "${script}" script`, Boolean(pkg?.scripts?.[script]), 'the command in course.json has to be one that actually runs');
}

const env = read('.env.example');
check('.env.example lists what the app needs', filled(env).length >= 3, 'names only, never values');
if (env && spec) {
  const auth = prose(section(spec, 'Auth'));
  if (/google/i.test(auth)) {
    check('the Google client is in .env.example', /GOOGLE_CLIENT_ID/.test(env) && /GOOGLE_CLIENT_SECRET/.test(env),
      'the spec says Google, so the id and the secret are configuration');
  }
  const model = prose(section(spec, 'The model feature'));
  const hosted = /api|gemini|openai|anthropic|claude|gpt|mistral|groq|hosted/i.test(model);
  if (hosted) check('the model key is in .env.example', /_API_KEY|_TOKEN/.test(env), 'a hosted model needs a key, and the key is configuration');
}

const agents = read('AGENTS.md');
check('AGENTS.md exists', agents !== null);
if (agents) {
  check('commands are filled in', answered(section(agents, 'Commands')).length >= 3, 'install, run and test must be exact and working');
  check('conventions are written', answered(section(agents, 'Conventions')).length >= 1);
  check('the always-ask list is kept', filled(section(agents, 'Always ask before')).length >= 3);
  check('the agent is told about the MCP server', section(agents, 'The MCP server') !== null,
    'the agent will add tools; tell it they go through the service layer');
}

const log = read('AGENT_LOG.md');
check('AGENT_LOG.md has at least one entry', (log ?? '').includes('## ') && filled(log).length > 4, 'one entry per agent session');
const usage = read('USAGE.md');
check('USAGE.md has at least one row', ((usage ?? '').match(/^\|\s*\d{4}-\d{2}-\d{2}/gm) ?? []).length >= 1, 'one row per session, tokens from /stats');

// Your repository is public from here to the defence.
const leaked = secretScan();
check('no secret is committed', leaked.length === 0, leaked.join('\n       '));

report('Exercise 2 · spec and project setup');

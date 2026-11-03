// Adds a changeset for runtime `dependencies` changed since the last release tag.
// devDependencies are skipped on purpose - they don't affect consumers of the package.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

const lastTag = git("describe", "--tags", "--abbrev=0", "--match", "v*");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const prevDeps = JSON.parse(git("show", `${lastTag}:package.json`)).dependencies ?? {};
const deps = pkg.dependencies ?? {};

const changes = [...new Set([...Object.keys(prevDeps), ...Object.keys(deps)])]
  .filter((name) => prevDeps[name] !== deps[name])
  .map((name) => {
    if (!prevDeps[name]) return `added \`${name}@${deps[name]}\``;
    if (!deps[name]) return `removed \`${name}\``;
    return `\`${name}\` from \`${prevDeps[name]}\` to \`${deps[name]}\``;
  });

if (!changes.length) {
  console.log(`No dependency changes since ${lastTag}`);
  process.exit(0);
}

const file = `.changeset/deps-since-${lastTag}.md`;
const list = changes.map((change) => `- ${change}`).join("\n");
writeFileSync(file, `---\n"${pkg.name}": patch\n---\n\nUpdated dependencies:\n\n${list}\n`);
console.log(`Created ${file}:\n${list}`);

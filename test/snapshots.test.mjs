// Compiles every fixture against dist/index.scss and compares the CSS with the saved
// snapshot: sites update the library with ^1.x, so a release must not change their CSS.
// After an intended change, rewrite the snapshots with: UPDATE_SNAPSHOTS=1 npm test
import assert from "node:assert/strict";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import * as sass from "sass";

const fixtures = new URL("fixtures/", import.meta.url);
const snapshots = new URL("snapshots/", import.meta.url);
const library = new URL("../dist/index.scss", import.meta.url);

// Resolves the package as Vite does, by name and by its dist path.
const packageImporter = {
  findFileUrl(url) {
    return url === "scss-slamp" || url === "scss-slamp/dist/index" ? library : null;
  },
};

const futureDeprecations = Object.values(sass.deprecations ?? {}).filter(
  (deprecation) => deprecation.status === "future",
);

const options = (warnings, deprecations) => ({
  importers: [packageImporter],
  futureDeprecations,
  logger: {
    warn(message, { deprecation, span }) {
      if (!deprecation) warnings.push(message);
      // Only the library's own code counts: the old @import in a fixture is the site's business.
      else if (span?.url?.href === library.href) deprecations.push(message);
    },
  },
});

const compile = (fixture) => {
  const warnings = [];
  const deprecations = [];
  const { css } = sass.compile(fileURLToPath(new URL(fixture, fixtures)), options(warnings, deprecations));
  return { css: `${css}\n`, warnings, deprecations };
};

const compileValues = (values) => {
  const warnings = [];
  const declarations = values.map((value, index) => `v${index}: ${value};`).join(" ");
  const { css } = sass.compileString(`@use 'scss-slamp' as *; .a { ${declarations} }`, options(warnings, []));
  const results = [...css.matchAll(/v\d+: (.+);/g)].map((match) => match[1]);
  return { results, warnings };
};

const fixtureFiles = readdirSync(fixtures).filter((file) => file.endsWith(".scss") && !file.startsWith("_"));

for (const fixture of fixtureFiles) {
  test(`${fixture} gives the same CSS as the snapshot`, () => {
    const { css, deprecations } = compile(fixture);
    const snapshot = new URL(fixture.replace(/\.scss$/, ".css"), snapshots);
    if (process.env.UPDATE_SNAPSHOTS) writeFileSync(snapshot, css);
    assert.deepEqual(deprecations, [], "the library uses deprecated Sass");
    assert.equal(css, readFileSync(snapshot, "utf8"));
  });
}

test("em values give the same result as px values", () => {
  const { results } = compileValues([
    "slamp(1em, 2em)",
    "slamp(16px, 32px)",
    "slamp(16px, 48px, 30em, 90em)",
    "slamp(16px, 48px, 480px, 1440px)",
  ]);
  assert.equal(results[0], results[1]);
  assert.equal(results[2], results[3]);
});

test("rem() and em() convert rem and em values", () => {
  const { results } = compileValues(["rem(1em)", "rem(2rem)", "em(1em)", "em(2rem)"]);
  assert.deepEqual(results, ["1rem", "2rem", "1em", "2em"]);
});

test("a first value larger than the second prints a warning and keeps the CSS", () => {
  const { results, warnings } = compileValues(["slamp(40px, 20px)"]);
  assert.equal(results[0], "clamp(2.5rem, 3.04rem + -1.79vw, 1.25rem)");
  assert.match(warnings.join("\n"), /slamp\(40px, 20px\): the first value is larger than the second/);
});

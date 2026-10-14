# Changelog

## 1.4.4

For px, rem, vw and % values the CSS output is the same as 1.4.3: the tests compare it with snapshots taken from the published 1.4.3, and 122 real `slamp()` calls taken from sites that use the library give the same CSS.

Fixed:
- `em` values. `slamp(1em, 2em)` gave `clamp(16rem, …, 32rem)` and now gives the same result as `slamp(16px, 32px)`. Viewport limits in `em` work too, and so do `rem()` and `em()` with rem or em values (`rem(2rem)` gave `32rem`). If you pass `em` to these functions, check the result.

Added:
- A warning when the first value is larger than the second, as in `slamp(40px, 20px)`: the value doesn't scale. The CSS doesn't change.

Changed, with the same CSS:
- `slamp()` is about 2.5 times faster: the unit converter reads its options once per conversion.
- Removed about 170 lines of converter code that was defined twice.
- README: setup with `@use`, `@forward ... with` and `pkg:`, examples with the real output.
- Build: a small Node script replaces gulp. The dev dependencies go from 378 packages to 24.
- Tests: snapshot tests on Sass 1.77.8 and on the latest Sass, plus a check that the library uses no deprecated Sass. GitHub Actions runs them on every push and every week.

Older versions: see the [releases](https://github.com/DidoMarchet/scss-slamp/releases) and the [npm versions](https://www.npmjs.com/package/scss-slamp?activeTab=versions).

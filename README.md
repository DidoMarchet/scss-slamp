
# scss-slamp — Fluid responsive clamp() generator for Sass/SCSS
## Generate fluid responsive CSS clamp() values with a Sass/SCSS helper function.

**scss-slamp** is a Sass function that writes CSS `clamp()` for you. Give it a minimum and a maximum size: `slamp(16px, 24px)` returns a value in `rem` that grows linearly with the viewport width between two limits (480px and 1600px by default). Use it for fluid typography, spacing and layout sizes.

### You won't have to make up clamp “preferred value“ anymore because:

:relaxed: [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()) is **one of the most useful css function** for responsive and adaptive layouts!

:worried: But it's **hard to define the preferred value** used as long as the result is between the minimum and maximum values.

:triangular_ruler: By adding the [slope of linear functions](https://www.mathplanet.com/education/pre-algebra/graphing-and-functions/the-slope-of-a-linear-function) to `clamp()` **we enhance the function with a little bit of mathematics**!

:rocket: This is how [`slamp()`](#example) works: **S**~~lope~~ + ~c~**LAMP** = **SLAMP**.

### Table of content:
- [Install](#install)
- [Options](#options)
- [Usage](#usage)
- [Example](#example)
- [Thanks](#thanks)
- [Development](#development)
- [Adopted by E-commerce Platforms, Apps, and Websites](#adopted-by-e-commerce-platforms-apps-and-websites)

# Install

``` bash
npm i scss-slamp
# pnpm add scss-slamp
```

Load it with `@use`:

``` scss
@use 'scss-slamp' as *;
```

In a design system, forward it once from your toolbox file and load the toolbox everywhere:

``` scss
// _core.scss
@forward 'scss-slamp';

// component.scss
@use 'core' as *;
```

The old `@import 'scss-slamp';` still works, but Dart Sass 3.0 will remove `@import`. With Dart Sass 1.71 or newer you can also write `@use 'pkg:scss-slamp' as *;`.

scss-slamp needs Dart Sass (`sass` or `sass-embedded`). LibSass and node-sass are not supported.

# Options
The library comes with three default options:

``` scss
$defaults_slamp_options: (
  "root-size": 16px, 
  "min": 480px, 
  "max": 1600px
);
```

- `root-size` - represents the calculation base for `rem` expressed in `px`;
- `min` - the minimum viewport width (px, rem or em);
- `max` - the maximum viewport width (px, rem or em).

Configure `$slamp_options` when you load the library to **override** each default:

``` scss
@use 'scss-slamp' as * with (
  $slamp_options: (
    "root-size": 10px,
    "min": 768px,
    "max": 1920px
  )
);
```

`@forward 'scss-slamp' with (...)` takes the same map. With the old `@import`, assign `$slamp_options` after the import.

Early versions used `$slamp_limits`: that name is ignored, use `$slamp_options`.

# Usage

``` scss
selector{
  rule: slamp(minSize, maxSize);
  rule: slamp(minSize, maxSize, minLimit, maxLimit);
}
```


The function takes as parameters:

- `$minSize` - *required* - the lower bound (px, rem or em);
- `$maxSize` - *required* - the upper bound (px, rem or em);
- `$minLimit` - *optional* - override the default minimum viewport width (px, rem or em);
- `$maxLimit` - *optional* - override the default maximum viewport width (px, rem or em);
- `$digits` - *optional* - decimal digits of the computed intersection and slope, `2` by default.

It returns a `clamp` statement where everything in between the preferred limits **changes in linear fashion**.

```scss
/*
selector{
  rule: clamp(minSize[rem], intersection[rem] + slope * 100vw, maxSize[rem])
}
*/
```

❗ The generated arguments of the `clamp` statement are expressed in `rem` because it's relative to the root **avoiding compounding issues**.

❗ `$minSize` must be smaller than `$maxSize`. Otherwise the value doesn't scale and Sass prints a warning: `slamp(40px, 20px)` stays at 40px, and so does `slamp(-40px, -60px)` at -40px.

❗ `vw` sizes are converted to `rem` at a 1200px viewport, and `%` sizes are read as `px`: use px, rem or em.

# Example
``` scss
.my-class{
  padding: slamp(25px, 50px) slamp(50px, 75px);
}

#id{
  width: slamp(5vw, 15vw);
}

h2{
  font-size: slamp(1.25rem, 2.75rem, 768px, 1920px); // default viewport limits are overridden
}

/*
.my-class {
  padding: clamp(1.5625rem, 0.89rem + 2.23vw, 3.125rem) clamp(3.125rem, 2.46rem + 2.23vw, 4.6875rem);
}

#id {
  width: clamp(3.75rem, 0.54rem + 10.71vw, 11.25rem);
}

h2 {
  font-size: clamp(1.25rem, 0.25rem + 2.08vw, 2.75rem);
}
*/
```

# Thanks
Special thanks for the inspiration and snippets to:

- Pedro Rodriguez the author of this **wonderful and detailed** article [https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/) who inspire me to create this function;
- black7375 the author of the **fundamental library** [sass-unitconverter](https://github.com/black7375/sass-unitconverter), based on [unitconversion](https://github.com/jakob-e/unitconversion) by Jakob Eriksen, the backbone of this function.

# Contribute
Feel free to **fork and increase** this repo!

And **let me know** if you find it useful!

# Development

``` bash
npm install
npm run build   # writes dist/index.scss from src/
npm test        # compares the CSS of test/fixtures with test/snapshots
```

A release must not change the CSS of the sites that use the library: a failing snapshot means the output changed. After an intended change, update the snapshots with `UPDATE_SNAPSHOTS=1 npm test` and write it in the [changelog](CHANGELOG.md).

### **Adopted by E-commerce Platforms, Apps, and Websites**

This library is trusted and used by several high-profile websites and applications, including:

- [Zavaluce](https://zavaluce.it/)
- [Airdom](https://airdom.com/)
- [Airdom App IOS](https://apps.apple.com/it/app/airdom/id6447354554)
- [Airdom App Android](https://play.google.com/store/apps/details?id=eu.airness.appstore)
- [Custom Airdom](https://custom.airdom.com/)
- [Ale Bikewear](https://www.alebikewear.com/)
- [Pixartprinting Blog](https://www.pixartprinting.it/blog/) *(and 20+ localized versions)*
- [Gopleyers](https://gopleyers.com/)
- [Emblema Bike](https://www.emblema.bike/)
- [La Mia Cantina](https://www.lamiacantina.it/)
- [BlueMotion 3D](https://www.bluemotion3d.com/)

...and many others.

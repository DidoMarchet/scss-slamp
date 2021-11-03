
# slamp()
### Don't have to make up clamp preferred values anymore because:

:relaxed: [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()) is **one of the most useful css rule** for responsive and adaptive layouts!

:worried: But it's **hard to define the preferred value** used as long as the result is between the minimum and maximum values.

:triangular_ruler: Adding the [slope of linear functions](https://www.mathplanet.com/education/pre-algebra/graphing-and-functions/the-slope-of-a-linear-function) to `clamp()` **we enhance the rule with a little bit of mathematics**!

:rocket: This is how [`slamp()`](#example) works: **S**~~lope~~ + ~c~**LAMP** = **SLAMP**.

### Table of content:
- [Options](#options)
- [Usage](#usage)
- [Example](#example)
- [Thanks](#thanks)

Install the package via npm:

``` bash
npm i scss-slamp
```

and include it using an **@import** statement:

``` scss
@import '~scss-slamp';

/// @import 'node_modules/scss-slamp/dist/index.scss';
/// [...]
```

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
- `min` - the minimun viewport width (px, em, rem, vw, % [...]);
- `max` - the maximum viewport width (px, em, rem, vw, % [...]).

Using the `$slamp_options` variable in your scss stylesheet you can **override** each defaults:

``` scss
$slamp_options: (
  "root-size": 10px, 
  "min": 768px,
  "max": 1920px
);
```

# Usage

``` scss
selector{
  rule: slamp(minSize, maxSize);
  rule: slamp(minSize, maxSize, minLimit, maxLimit);
}
```


The function takes as parameters:

- `$minSize` - *required* - the lower bound (px, em, rem, vw, % [...]);
- `$maxSize` - *required* - the upper bound (px, em, rem, vw, % [...]);
- `$minLimit` - *optional* - override the default minimum viewport width (px, em, rem, vw, % [...]);
- `$maxLimit` - *optional* - override the default maximum viewport width (px, em, rem, vw, % [...]).

It returns a `clamp` statement where everything in between the preferred limits **changes in linear fashion**.

```scss
/*
selector{
  rule: clamp(minSize[rem], intersection[rem] + slope * 100vw, maxSize[rem])
}
*/
```

❗ The generated arguments of the `clamp` statement are expressed in `rem` because it's relative to the root **avoiding compounding issues**.

# Example
``` scss
.my-class{
  padding: slamp(25px, 50px) slamp(50px, 75px);
}

h2{
  font-size: slamp(1.25rem, 2.75rem, 768px, 1920px); // default viewport limits are overrided
}

/*
.my-class {
  padding: clamp(1.5625 rem, 0.8928571429 rem + 2.2321428571 vw, 3.125 rem)
    clamp(3.125 rem, 2.4553571429 rem + 2.2321428571 vw, 4.6875 rem);
}

h2 {
  font-size: clamp(1.25rem, 0.25rem + 2.0833333333vw, 2.75rem);
}
*/
```

# Thanks
Special thanks for the inspiration and snippets to:

- Pedro Rodriguez the author of this **wonderful and detailed** article [https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/) who inspire me to create this function;
- Jakob Eriksen the author of this **fundamental library** [https://github.com/black7375/sass-unitconverter](https://github.com/black7375/sass-unitconverter), the backbone of this function.

# Contribute
Feel free to **fork and increase** this repo!

And **let me know** if you find it useful!

Enjoy :punch:

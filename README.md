# scss-slamp
### Table of content:
- [Setup](#setup)
- [Usage](#usage)

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

# Setup
First of all we set up the **minimum** and **maximum** viewport widths by which will be calculated the intermediate values.

The library comes with two default limits:

``` scss
$defaults_slamp_limits: (
  "min": 480px, 
  "max": 1600px
);
```

Using the `$slamp_limits` variable in your scss stylesheet you can **override** the defaults:

``` scss
$slamp_limits: (
  "min": 768px,
  "max": 1920px
);
```

You can specify limits using **various units of measure**  (px, em, rem, %, vw [...]).

# Usage
The function takes four parameters (two required) and returns a `clamp` statement with an interpolated "preferred" value.
``` scss
/// @content @function slamp($minSize, $maxSize, $minLimit: null, $maxLimit: null){ ... }
/// @param {String} $minSize - required - the min size of the property (px, em, rem, %, vw [...])
/// @param {String} $maxSize - required - the max size of the property (px, em, rem, %, vw [...])
/// @param {String} $minLimit - optional - the min limit if different from default (px, em, rem, %, vw [...])
/// @param {String} $maxLimit - optional - the max limit if different from default (px, em, rem, %, vw [...])
/// @return clamp($minSize[rem], $intersection[rem] + ($slope * 100)[vw], $maxSize[rem])

.my-class{
  padding: slamp(25px, 50px) slamp(50px, 75px);
  font-size: slamp(1.25rem, 2.75rem, 768px, 1920px);
}

```



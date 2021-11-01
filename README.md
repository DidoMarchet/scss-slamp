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

Using the `$slamp_limits` variable in your scss stylesheet you can **override** the default limits:

``` scss
$slamp_limits: (
  "min": 768px,
  "max": 1920px
);
```

You can specify limits using **various units** of measure (px, em, rem, %, vw [...]) and they will be **converted in rem**.

# Usage



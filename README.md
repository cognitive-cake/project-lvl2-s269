# Difference calculator
[![Maintainability](https://api.codeclimate.com/v1/badges/f2e328122369de775267/maintainability)](https://codeclimate.com/github/cognitive-cake/project-lvl2-s269/maintainability) [![Build Status](https://travis-ci.org/cognitive-cake/project-lvl2-s269.svg?branch=master)](https://travis-ci.org/cognitive-cake/project-lvl2-s269)

## Example
```
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```

## Use

`gendiff [options] <firstConfig> <secondConfig>`

Supported formats - json, yaml, ini.

### Options

`-f --format [format]`  ---  Format output: plain, pretty or json (default pretty)

# Difference calculator
[![Maintainability](https://api.codeclimate.com/v1/badges/f2e328122369de775267/maintainability)](https://codeclimate.com/github/cognitive-cake/project-lvl2-s269/maintainability) [![Build Status](https://travis-ci.org/cognitive-cake/project-lvl2-s269.svg?branch=master)](https://travis-ci.org/cognitive-cake/project-lvl2-s269)

## Example
```
$ gendiff --format plain first-config.ini second-config.ini
Property 'common.setting2' was deleted
Property 'common.setting3' was updated. From 'true' to complex value
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.setting4' was added with value: 'blah blah'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From complex value to 'str'
Property 'group1.rest' was added with value: '350'
Property 'group1.boolean' was added with value: 'false'
Property 'group2' was deleted
Property 'group3' was added with value: complex value
```

## Use

`gendiff [options] <firstConfig> <secondConfig>`

Supported formats - json, yaml, ini.

### Options

`-f --format [format]`  ---  Format output: plain, pretty or json (default pretty)

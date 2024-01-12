gendiff

### Hexlet tests and linter status:

[![Actions Status](https://github.com/eugene4ik/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/eugene4ik/frontend-project-46/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/cbf15ae27ca85b55dfaa/maintainability)](https://codeclimate.com/github/eugene4ik/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/cbf15ae27ca85b55dfaa/test_coverage)](https://codeclimate.com/github/eugene4ik/frontend-project-46/test_coverage) [![Actions CI](https://github.com/eugene4ik/frontend-project-46/actions/workflows/actions.yml/badge.svg)](https://github.com/eugene4ik/frontend-project-46/actions/workflows/actions.yml)

## gendiff

Gendiff is designed to detect difference between two files and to highlight these differences using one of three supported output formates - Stylish (by default), JSON or Plain text.

## Installation

```sh
terminal
npm ci && sudo npm link
```

## Examples

#### Gendiff works both with flat or nested objects. Here are some examples of using gendiff with flat objects:

[Compairing two flat JSON files](https://asciinema.org/a/PadXNh9r4uHxD0TLNUA5bFoJs)

[Compairing two flat YAML files](https://asciinema.org/a/q8OPmczQgdiwD0uxsL5246Nko)

#### And here are examples of using gendiff with nested objects:

[Compairing two nested JSON files, output in Stylish format (by default)](https://asciinema.org/a/SIXOpLxM5XOJuJJ1wiQSCTGQa)

[Compairing two nested JSON files, output in Plain text format](https://asciinema.org/a/TiqvVI7RwBUgobG4tGgpGN7qn)

[Compairing two nested JSON files, output in JSON format](https://asciinema.org/a/pi9H2HHwWHloT98K3Sc7vNBST)

### Output formats

Depending on the desired output format, user can call gendiff with one of the formats:

```sh
Stylish: gendiff --format stylish filepath1 filepath2`

Plain text: gendiff --format plain filepath1 filepath2`

JSON: gendiff --format JSON filepath1 filepath2`
```

Also need to notice, calling **gendiff** without any format argument will call a **stylish** format output since it is used **by default**

### Filepaths

**Gendiff** uses both **absolute** and **relative** path formats. For example, to compare two files **file1.json** and **file2.json**
User can either enter:

```sh
 gendiff  ./__fixtures__/file1.json ./__fixtures__/file2.json
```

or enter

```sh
 gendiff /Users/mac/vs_code/hexlet-git/frontend-project-46/__fixtures__/file1.json /Users/mac/vs_code/hexlet-git/frontend-project-46/__fixtures__/file2.json
```

in a terminal

### System requirements:

To run this console game, you will need:

**Node.js:** Ensure that you have Node.js installed, version 12 or higher. Download Node.js

**npm:** Install npm (comes with Node.js). Instructions for installing npm

**Cross-Platform Compatibility:** This program is supported on all major operating systems (Windows, macOS, Linux).

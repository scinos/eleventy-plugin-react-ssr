# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixes

* Initialize the plugin only once
* Clear require cache on initialization so React components can be recompiled.

## [1.0.1] - 2022-05-14

### Fixes

Exclude processing `node_modules` (other than `node_modules/eleventy-plugin-react-ssr`). This was preventing 11ty to run `build --serve`

## [1.0.0] - 2022-05-11

### Added

First release

[unreleased]: https://github.com/scinos/eleventy-plugin-react-ssr/compare/1.0.1...HEAD
[1.0.1]: https://github.com/scinos/eleventy-plugin-react-ssr/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/scinos/eleventy-plugin-react-ssr/releases/tag/1.0.0

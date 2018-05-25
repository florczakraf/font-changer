# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]
- README file.

## [0.3.2] - 2018-05-25
### Added
- CHANGELOG file.

### Changed
- Reorganize project's tree to better reflect addon's structure.

### Fixed
- Travis should now upload built extension to GitHub releases on tags.

## [0.3.1] - 2018-05-23
### Added
- Node package to handle dependencies.
- Icons and screenshot for extension stores.
- Travis CI.
- Makefile to manage development scripts.
- LICENSE file.

### Changed
- CSS are now injected via extension's manifest instead of content script.

## [0.3.0] - 2018-05-21
### Added
- Popup with the list of clicked elements. User can now decide which element
should be updated.
- bumpversion to handle releasing.
- Linter (eslint) config.

## [0.2.0] - 2018-05-13
### Added
- Support for Google Chrome.

## [0.1.0] - 2018-05-10
### Added
- Support for Firefox.
- Change style of the clicked element's parent after activating it with click
on addon's icon.

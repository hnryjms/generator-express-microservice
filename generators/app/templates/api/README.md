## eframe Components
Folder to store packages related to eframe core components

## Requirements

[Node](https://nodejs.org)

- MacOS: `brew install node@10`
- Windows: Download and install from [here](https://nodejs.org/dist/v10.15.3/node-v10.15.3-x86.msi).

[Yarn](https://yarnpkg.com/en/)

- MacOS: `brew install yarn`
- Windows: Download and install from [here](https://yarnpkg.com/latest.msi)

For either system, we recommend using [nvm](https://github.com/creationix/nvm) to manage node versions on your system. If you have `nvm` installed on your machine you can simply run `nvm use` in the project root directory to switch to the correct version of node.

[Lerna](https://lerna.js.org/)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Let's start by installing Lerna globally with npm:
``` sh
$ npm install --global lerna
```
# Setup
## Create a new package
Set path to the desired folder and follow the below commands to get a boilerplate sample.
```sh
$ npm init ts-lerna-child-pkg folder-name
```
> Set the `name` key in `package.json` to your desired package name.

```.json
// package.json
{
 "name":"@bechtel/awesome-package" 
}
```

> `@bechtel/` is recommended [scope](#https://docs.npmjs.com/misc/scope) name for all packages
This command will install with all defaults that include entry file, test files, eslint...etc.

### Commands
Commands for [@bechtel/awesome-package](#create-new-package)
```sh
# install
$ yarn install

# yarn workspace standard command
$ yarn workspace <workspace_name> <command>

# add new dependencies
$ yarn workspace @bechtel/awesome-package add jest --dev

# remove dependencies
$ yarn workspace @bechtel/awesome-package remove jest

# yarn commands for individual packages
$ yarn workspace @bechtel/awesome-package run build # transpile ts file to js
$ yarn workspace @bechtel/awesome-package run test # execute tests
$ yarn workspace @bechtel/awesome-package run lint # check lint prompts
```
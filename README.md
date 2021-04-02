k8ty
====

Deploy apps to k8s quickly

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@k8ty-app/k8ty.svg)](https://npmjs.org/package/@k8ty-app/k8ty)
[![Downloads/week](https://img.shields.io/npm/dw/@k8ty-app/k8ty.svg)](https://npmjs.org/package/@k8ty-app/k8ty)
[![License](https://img.shields.io/npm/l/@k8ty-app/k8ty.svg)](https://github.com/k8ty-app/k8ty/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @k8ty-app/k8ty
$ k8ty COMMAND
running command...
$ k8ty (-v|--version|version)
@k8ty-app/k8ty/0.0.0 darwin-arm64 node-v15.12.0
$ k8ty --help [COMMAND]
USAGE
  $ k8ty COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`k8ty app:create`](#k8ty-appcreate)
* [`k8ty app:delete [NAME]`](#k8ty-appdelete-name)
* [`k8ty app:list`](#k8ty-applist)
* [`k8ty app:status [APP]`](#k8ty-appstatus-app)
* [`k8ty app:update [APP]`](#k8ty-appupdate-app)
* [`k8ty config:delete [ENV]`](#k8ty-configdelete-env)
* [`k8ty config:get [ENV]`](#k8ty-configget-env)
* [`k8ty config:list`](#k8ty-configlist)
* [`k8ty config:set [ENV] [VAL]`](#k8ty-configset-env-val)
* [`k8ty hello [FILE]`](#k8ty-hello-file)
* [`k8ty help [COMMAND]`](#k8ty-help-command)

## `k8ty app:create`

Create a new k8ty.app

```
USAGE
  $ k8ty app:create

OPTIONS
  -i, --image=image  The image of your app
  -p, --port=port    The container port you app runs on
```

_See code: [src/commands/app/create.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/app/create.ts)_

## `k8ty app:delete [NAME]`

Delete an app

```
USAGE
  $ k8ty app:delete [NAME]
```

_See code: [src/commands/app/delete.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/app/delete.ts)_

## `k8ty app:list`

List all apps

```
USAGE
  $ k8ty app:list
```

_See code: [src/commands/app/list.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/app/list.ts)_

## `k8ty app:status [APP]`

```
USAGE
  $ k8ty app:status [APP]
```

_See code: [src/commands/app/status.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/app/status.ts)_

## `k8ty app:update [APP]`

Set the value of a config variable

```
USAGE
  $ k8ty app:update [APP]

OPTIONS
  -i, --image=image  The image of your app
  -p, --port=port    The container port you app runs on
```

_See code: [src/commands/app/update.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/app/update.ts)_

## `k8ty config:delete [ENV]`

Remove a config variable

```
USAGE
  $ k8ty config:delete [ENV]

OPTIONS
  -a, --app=app  (required) The name of the app
```

_See code: [src/commands/config/delete.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/config/delete.ts)_

## `k8ty config:get [ENV]`

Get the value of a config variable

```
USAGE
  $ k8ty config:get [ENV]

OPTIONS
  -a, --app=app  (required) The name of the app
```

_See code: [src/commands/config/get.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/config/get.ts)_

## `k8ty config:list`

List the config variables for an app

```
USAGE
  $ k8ty config:list

OPTIONS
  -a, --app=app  (required) The name of the app
```

_See code: [src/commands/config/list.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/config/list.ts)_

## `k8ty config:set [ENV] [VAL]`

Set the value of a config variable

```
USAGE
  $ k8ty config:set [ENV] [VAL]

OPTIONS
  -a, --app=app  (required) The name of the app
```

_See code: [src/commands/config/set.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/config/set.ts)_

## `k8ty hello [FILE]`

describe the command here

```
USAGE
  $ k8ty hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ k8ty hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/k8ty-app/k8ty/blob/v0.0.0/src/commands/hello.ts)_

## `k8ty help [COMMAND]`

display help for k8ty

```
USAGE
  $ k8ty help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->

k8ty
====

Deploy apps to k8s quickly

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/k8ty.svg)](https://npmjs.org/package/k8ty)
[![Downloads/week](https://img.shields.io/npm/dw/k8ty.svg)](https://npmjs.org/package/k8ty)
[![License](https://img.shields.io/npm/l/k8ty.svg)](https://github.com/k8ty-app/k8ty/blob/master/package.json)

<!-- toc -->

* [Usage](#usage)
* [Commands](#commands)

<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g k8ty
$ k8ty COMMAND
running command...
$ k8ty (-v|--version|version)
k8ty/0.0.0 darwin-arm64 node-v15.11.0
$ k8ty --help [COMMAND]
USAGE
  $ k8ty COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

* [`k8ty hello [FILE]`](#k8ty-hello-file)
* [`k8ty help [COMMAND]`](#k8ty-help-command)

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

---
MVP: What does this do?

It deploys -ephemeral- docker images to a public
facing, https endpoint.

We need / pre-reqs:

* cert-manager
* LB / nginx ingress controller | cloud dependent
* A domain + wc redirect
* A docker registry
* A build system


k8s <==> k8ty mappings

| k8ty | k8s | ??? |
|------|------|-----|
| app    | namespace ||
| config | secret    ||

## app
list => list namespaces
delete => delete ns, tear it all down!
create => create a namespace

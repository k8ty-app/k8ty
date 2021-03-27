import {Command} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'
import * as util from 'util'
const Haikunator = require('haikunator')

export default class AppCreate extends Command {
  static description = 'create an app'

  async run() {
    const haikunator = new Haikunator({
      defaults: {
        tokenLength: 6,
      },
    })
    const name = haikunator.haikunate()
    K8ty.createNamespace(name)
    .then(_ => {
      return K8ty.createSecret(name)
    })
    .then(_ => {
      return K8ty.createDeployment(name, 80)
    })
    .then(_ => {
      return K8ty.createService(name)
    })
    .then(_ => {
      return K8ty.createIngress(name)
    })
    .catch(error => {
      this.log(`Unable to create k8ty.app ${name}! Maybe this will help?`)
      this.log(util.inspect(error))
    })
  }
}

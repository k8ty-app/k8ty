import {Command, flags} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'
import * as util from 'util'
const Haikunator = require('haikunator')

export default class AppCreate extends Command {
  static description = 'Create a new k8ty.app'

  static flags = {
    image: flags.string({char: 'i', description: 'The image of your app'}),
    port: flags.integer({char: 'p', description: 'The container port you app runs on'}),
  }

  async run() {
    const haikunator = new Haikunator({
      defaults: {
        tokenLength: 6,
      },
    })
    const name = haikunator.haikunate()
    const {flags} = this.parse(AppCreate)
    const img = flags.image ?? 'nginx'
    let port = flags.port ?? 80
    if (!flags.image && flags.port) {
      this.log('You have specified a port, but no image! The default port is being set to 80!')
      port = 80
    }

    K8ty.createNamespace(name)
    .then(_ => {
      return K8ty.createSecret(name)
    })
    .then(_ => {
      return K8ty.createDeployment(name, img, port)
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

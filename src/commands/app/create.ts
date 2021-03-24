import {Command} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'
import * as util from 'util'
import CreateAppResponse = K8ty.CreateAppResponse
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
    if (name) {
      K8ty.createApp(name)
      .then((response: CreateAppResponse) => {
        this.log(`Created k8ty.app ${response.body.metadata?.name}`)
      })
      .catch((error: CreateAppResponse) => {
        if (error.response.statusCode === 409) {
          this.error('That k8ty.app seems to already exist! Please check with app:list')
        } else {
          this.error(`Unable to create k8ty.app ${name}! Maybe this will help?`)
          this.log(util.inspect(error))
        }
      })
    }
  }
}

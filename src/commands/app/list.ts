import {Command} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'
import * as util from 'util'

export default class AppList extends Command {
  static description = 'List all apps'

  async run() {
    K8ty.coreClient.listNamespace(undefined,
      undefined,
      undefined,
      undefined,
      'k8ty.app=true'
    )
    .then(response => {
      response.body.items.map(ns => ns.metadata?.name).forEach(n => this.log(n))
    })
    .catch(error => {
      this.log('Unable to get a list of k8ty.apps! Maybe this will help?')
      this.log(util.inspect(error))
    })
  }
}

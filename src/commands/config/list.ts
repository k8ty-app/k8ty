import Command, {flags} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'

export default class ListConfig extends Command {
  static description = 'List the config variables for an app'

  static flags = {
    app: flags.string({char: 'a', description: 'The name of the app', required: true}),
  }

  async run() {
    const {flags} = this.parse(ListConfig)
    if (!(await K8ty.isValidApp(flags.app))) {
      this.log(`${flags.app} isn't a valid k8ty.app!`)
      return
    }
    K8ty.coreClient.readNamespacedSecret(flags.app, flags.app)
    .then(response => {
      const keys = Object.keys(response?.body?.data || {})
      if (keys.length === 0) {
        this.log(`There are no config variables set for ${flags.app}!`)
      } else {
        keys.forEach((str => this.log(str)))
      }
    })
  }
}

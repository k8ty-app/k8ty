import Command, {flags} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'

export default class DeleteConfig extends Command {
  static description = 'Remove a config variable'

  static flags = {
    app: flags.string({char: 'a', description: 'The name of the app', required: true}),
  }

  static args = [{name: 'ENV'}]

  async run() {
    const {args, flags} = this.parse(DeleteConfig)
    if (!(await K8ty.isValidApp(flags.app))) {
      this.log(`${flags.app} isn't a valid k8ty.app!`)
      return
    }
    const patch = [
      {
        op: 'remove',
        path: `/data/${args.ENV}`,
      },
    ]
    K8ty.coreClient.patchNamespacedSecret(
      flags.app,
      flags.app,
      patch,
      undefined,
      undefined,
      undefined,
      undefined,
      K8ty.patchOptions
    )
    .then(_ => {
      this.log(`Removed ${args.ENV} in ${flags.app}`)
    })
  }
}

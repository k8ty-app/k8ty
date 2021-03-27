import Command, {flags} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'

export default class SetConfig extends Command {
  static description = 'Set the value of a config variable'

  static flags = {
    app: flags.string({char: 'a', description: 'The name of the app', required: true}),
  }

  static args = [{name: 'ENV'}, {name: 'VAL'}]

  async run() {
    const {args, flags} = this.parse(SetConfig)
    const patch = [
      {
        op: 'replace',
        path: `/data/${args.ENV}`,
        value: Buffer.from(args.VAL, 'utf8').toString('base64'),
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
      K8ty.patchOptions)
    .then(_ => {
      this.log(`${args.ENV} set for ${flags.app}`)
    })
  }
}

import Command, {flags} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'

export default class GetConfig extends Command {
  static description = 'Get the value of a config variable'

  static flags = {
    app: flags.string({char: 'a', description: 'The name of the app', required: true}),
  }

  static args = [{name: 'ENV'}]

  async run() {
    const {args, flags} = this.parse(GetConfig)
    K8ty.coreClient.readNamespacedSecret(flags.app, flags.app)
    .then(response => {
      const env = response.body?.data?.[`${args.ENV}`]
      if (env) {
        const envStr = Buffer.from(env, 'base64').toString('utf8')
        this.log(`${args.ENV}: ${envStr}`)
      } else {
        this.log(`${args.ENV} is not set for ${flags.app}!`)
      }
    })
  }
}

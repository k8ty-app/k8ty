import Command, {flags} from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'

export default class UpdateApp extends Command {
  static description = 'Set the value of a config variable'

  static flags = {
    image: flags.string({char: 'i', description: 'The image of your app'}),
    port: flags.integer({char: 'p', description: 'The container port you app runs on'}),
  }

  static args = [{name: 'APP'}]

  async run() {
    const {args, flags} = this.parse(UpdateApp)
    if (!flags.image && !flags.port) {
      this.error('You must provide at least one flag to update!')
    }
    if (!(await K8ty.isValidApp(args.APP))) {
      this.log(`${args.APP} isn't a valid k8ty.app!`)
      return
    }

    const maybePortPatch = []
    if (flags.port) {
      maybePortPatch.push(
        {
          op: 'replace',
          path: '/spec/template/spec/containers/0/ports/0/containerPort',
          value: flags.port,
        },
      )
    }

    const maybeImagePatch = []
    if (flags.image) {
      maybeImagePatch.push(
        {
          op: 'replace',
          path: '/spec/template/spec/containers/0/image',
          value: flags.image,
        },
      )
    }

    const patch = [...maybePortPatch, ...maybeImagePatch]

    K8ty.appClient.patchNamespacedDeployment(
      args.APP,
      args.APP,
      patch,
      undefined,
      undefined,
      undefined,
      undefined,
      K8ty.patchOptions,
    )
    .then(_ => {
      this.log(`Update ${args.APP}!`)
    })
  }
}

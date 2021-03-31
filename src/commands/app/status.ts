import Command from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'

export default class StatusApp extends Command {
  static args =[{name: 'APP'}]

  async run() {
    const {args} = this.parse(StatusApp)
    if (!(await K8ty.isValidApp(args.APP))) {
      this.log(`${args.APP} isn't a valid k8ty.app!`)
      return
    }
    K8ty.appClient.readNamespacedDeploymentStatus(args.APP, args.APP)
    .then(response => {
      this.log(JSON.stringify(response.body.status, null, 2))
    })
  }
}

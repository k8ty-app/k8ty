import Command from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'

export default class DeleteApp extends Command {
 static description = 'Delete an app'

  static args = [{name: 'name'}]

  async run() {
    const {args} = this.parse(DeleteApp)
    if (args.name) {
      await K8ty.coreClient.readNamespace(args.name)
      .then(res =>  {
        return res.body.metadata?.labels?.['k8ty.app'] === 'true'
      })
      .then(async canDelete => {
        if (canDelete) {
          await K8ty.coreClient.deleteNamespace(args.name)
          .then(_ => this.log(`k8ty.app ${args.name} deleted!`))
          .catch(_ => {
            this.log(`Unable to delete ${args.name}`)
          })
        } else {
          this.log(`${args.name} exists, but is not a k8ty.app! Won't delete...`)
        }
      })
      .catch(_ => {
        this.log(`k8ty.app ${args.name} doesn't seem to exist!`)
      })
    } else {
      this._help()
    }
  }
}

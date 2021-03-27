import Command from '@oclif/command'
import {K8ty} from '../../k8ty/k8ty'
import * as util from 'util'

export default class DeleteApp extends Command {
 static description = 'Delete an app'

  static args = [{name: 'name'}]

  async run() {
    const {args} = this.parse(DeleteApp)
    if (args.name) {
      const canDelete = await K8ty.coreClient.readNamespace(args.name)
      .then(res => res.body.metadata?.labels?.['k8ty.app'] === 'true')
      .catch(error => {
        this.error(`k8ty.app ${args.name} doesn't seem to exist!`)
        this.log(util.inspect(error))
        return false
      })

      if (canDelete) {
        await K8ty.coreClient.deleteNamespace(args.name)
        .then(_ => this.log(`k8ty.app ${args.name} deleted!`))
        .catch(error => {
          this.error(`Unable to delete ${args.name}`)
          this.log(util.inspect(error))
        })
      } else {
        this.error(`${args.name} exists, but is not a k8ty.app! Won't delete...`)
      }
    } else {
      this._help()
    }
  }
}

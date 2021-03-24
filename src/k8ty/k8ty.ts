import * as k8s from '@kubernetes/client-node'
import * as http from 'http'
import {V1Namespace, V1NamespaceList, V1Status} from '@kubernetes/client-node'

export namespace K8ty {
  const kc = new k8s.KubeConfig()
  kc.loadFromDefault()
  export const client = kc.makeApiClient(k8s.CoreV1Api)

  export interface ListAppResponse  {
    response: http.IncomingMessage;
    body: V1NamespaceList;
  }

  export const listApps: () => Promise<ListAppResponse> = () => client.listNamespace(
    undefined,
    undefined,
    undefined,
    undefined,
    'k8ty.app=true'
  )

  export interface CreateAppResponse  {
    response: http.IncomingMessage;
    body: V1Namespace;
  }

  export const createApp: (name: string) => Promise<CreateAppResponse> = (name: string) => client.createNamespace({
    metadata: {
      name: name,
      labels: {
        'k8ty.app': 'true',
      },
    },
  })

  export interface ReadAppResponse  {
    response: http.IncomingMessage;
    body: V1Namespace;
  }
  export const readApp: (name: string) => Promise<ReadAppResponse> = (name: string) => client.readNamespace(name)

  export interface DeleteAppResponse  {
    response: http.IncomingMessage;
    body: V1Status;
  }

  export const deleteApp: (name: string) => Promise<DeleteAppResponse> = (name: string) => client.deleteNamespace(name)

}

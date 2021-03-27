import * as k8s from '@kubernetes/client-node'

export namespace K8ty {
  const kc = new k8s.KubeConfig()
  kc.loadFromDefault()
  export const coreClient = kc.makeApiClient(k8s.CoreV1Api)
  export const appClient = kc.makeApiClient(k8s.AppsV1Api)
  export const networkClient = kc.makeApiClient(k8s.NetworkingV1beta1Api)

  export const createNamespace =  (name: string) => coreClient.createNamespace({
    metadata: {
      name: name,
      labels: {
        'k8ty.app': 'true',
        'k8ty.app/name': name,
      },
    },
  })

  export const createSecret = (name: string) => coreClient.createNamespacedSecret(name, {
    metadata: {
      name: name,
      labels: {
        'k8ty.app': 'true',
        'k8ty.app/name': name,
      },
    },
  })

  export const createDeployment = (name: string, port?: number) => appClient.createNamespacedDeployment(name, {
    metadata: {
      name: name,
      labels: {
        'k8ty.app': 'true',
        'k8ty.app/name': name,
        app: name,
      },
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: {
          app: name,
        },
      },
      template: {
        metadata: {
          labels: {
            app: name,
          },
        },
        spec: {
          containers: [
            {
              name: name,
              image: 'nginx',
              imagePullPolicy: 'Always',
              stdin: true,
              tty: true,
              envFrom: [
                {
                  secretRef: {
                    name: name,
                  },
                },
              ],
              ports: [
                {
                  name: 'http',
                  containerPort: port ?? 80,
                  protocol: 'TCP',
                },
              ],
              livenessProbe: {
                initialDelaySeconds: 10,
                periodSeconds: 30,
                httpGet: {
                  path: '/',
                  port: 'http' as unknown as object,
                },
              },
              readinessProbe: {
                initialDelaySeconds: 10,
                periodSeconds: 30,
                httpGet: {
                  path: '/',
                  port: 'http' as unknown as object,
                },
              },
              resources: {
                limits: {
                  cpu: '500m',
                  memory: '1Gi',
                },
                requests: {
                  cpu: '250m',
                  memory: '250Mi',
                },
              },
            },
          ],
        },
      },
    },
  })

  export const createService = (name: string) => coreClient.createNamespacedService(name, {
    metadata: {
      name: name,
      labels: {
        'k8ty.app': 'true',
        'k8ty.app/name': name,
        app: name,
      },
    },
    spec: {
      type: 'ClusterIP',
      selector: {
        app: name,
      },
      ports: [
        {
          port: 80,
          name: 'http',
          protocol: 'TCP',
          targetPort: 'http' as unknown as object,
        },
      ],
    },
  })

  export const createIngress = (name: string) => networkClient.createNamespacedIngress(name, {
    metadata: {
      name: name,
      labels: {
        'k8ty.app': 'true',
        'k8ty.app/name': name,
      },
      annotations: {
        'kubernetes.io/ingress.class': 'nginx',
        'cert-manager.io/cluster-issuer': 'letsencrypt',
      },
    },
    spec: {
      tls: [
        {
          hosts: [`${name}.k8ty.app`],
          secretName: `${name}-tls`,
        },
      ],
      rules: [
        {
          host: `${name}.k8ty.app`,
          http: {
            paths: [
              {
                path: '/',
                backend: {
                  serviceName: name,
                  servicePort: 'http' as unknown as object,
                },
              },
            ],
          },
        },
      ],
    },
  })

  // const createK8tyrc = coreClient.createNamespacedConfigMap('', {})
  // const persistK8tyrc = Promise.resolve(false)

}

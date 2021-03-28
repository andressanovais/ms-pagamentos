import { ArmazenamentoChave, CredenciaisBD } from './armazenamento-chave'
import configs from '@/infra/helpers/configs'
import AWS from 'aws-sdk'

export class ParameterStoreAdapter implements ArmazenamentoChave {
  async obter (chave: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const ssm = new AWS.SSM({ region: configs.REGION })
      const params = {
        Name: chave,
        WithDecryption: true
      }

      ssm.getParameter(params, (err, data) => {
        if (err) {
          return reject(err)
        }

        return resolve(data.Parameter.Value)
      })
    })
  }

  async obterCredenciaisBD (): Promise<CredenciaisBD> {
    const credenciais = await this.obter('credenciais-mysql')
    return JSON.parse(credenciais)
  }
}

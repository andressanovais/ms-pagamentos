import { ArmazenamentoChave, Credenciais } from './armazenamento-chave'
import { REGION } from '@/infra/helpers'
import AWS from 'aws-sdk'

export class ParameterStore implements ArmazenamentoChave {
  async obter (chave: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const ssm = new AWS.SSM({ region: REGION })
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

  async obterCredenciaisBD (): Promise<Credenciais> {
    const credenciais = await this.obter('credenciais-mysql')
    return JSON.parse(credenciais)
  }
}

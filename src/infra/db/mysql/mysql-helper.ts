import mysql from 'mysql'
import { ArmazenamentoChave } from '@/infra/protocols/chaves'
import { Connection } from 'mysql/lib/Connection'

export const mySqlHelper = {
  conexao: null as Connection,

  async abrirConexao (armazenamentoChave: ArmazenamentoChave): Promise<void> {
    const credenciaisMySql = await armazenamentoChave.obterCredenciaisBD()

    this.conexao = await mysql.createConnection(credenciaisMySql)
  },

  async fecharConexao (): Promise<void> {
    await this.conexao.end()
    this.conexao = null
  },

  async query (query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.conexao.query(query, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }
}

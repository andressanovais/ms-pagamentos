import { CartaoRepository } from '@/data/db/mysql'
import { mySqlHelper } from './mysql-helper'
import mysql from 'mysql'

export class CartaoMysqlRepository implements CartaoRepository {
  private readonly queryGetLimiteDisponivel = 'SELECT LimiteDisponivel FROM Varejo.Cartao WHERE IdConta = ?;'

  async obterLimiteDisponivel (idConta: number): Promise<number> {
    const script = mysql.format(this.queryGetLimiteDisponivel, [idConta])
    const resultado = await mySqlHelper.query(script)

    return resultado[0].LimiteDisponivel
  }
}

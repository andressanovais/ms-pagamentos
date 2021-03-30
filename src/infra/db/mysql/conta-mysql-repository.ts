import { ContaRepository } from '@/data/db/mysql'
import { mySqlHelper } from './mysql-helper'
import mysql from 'mysql'

export class ContaMysqlRepository implements ContaRepository {
  private readonly queryGetSaldo = 'SELECT Saldo FROM Varejo.Conta WHERE Id = ?'

  async obterSaldo (id: number): Promise<number> {
    const script = mysql.format(this.queryGetSaldo, [id])
    const resultado = await mySqlHelper.query(script)

    return resultado[0].Saldo
  }
}

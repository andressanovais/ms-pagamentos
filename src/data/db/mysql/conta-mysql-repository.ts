import { ContaRepository } from '@/domain/db'
import { mySqlHelper } from '@/infra/db/mysql/mysql-helper'
import mysql from 'mysql'

export class ContaMysqlRepository implements ContaRepository {
  private readonly queryGetSaldo = 'SELECT Saldo FROM Varejo.Conta WHERE Id = ?'

  async obterSaldo (id: number): Promise<number> {
    const script = mysql.format(this.queryGetSaldo, [id])
    const resultado = await mySqlHelper.query(script)

    return resultado[0].Saldo
  }
}

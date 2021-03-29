import { DividaRepository } from '@/domain/db'
import { mySqlHelper } from '@/infra/db/mysql/mysql-helper'
import mysql from 'mysql'

export class DividaMysqlRepository implements DividaRepository {
  private readonly queryUpdateStatus = 'UPDATE Varejo.Divida SET Status = ? WHERE Id = ?;'

  async atualizarStatus (id: number, novoStatus: string): Promise<void> {
    const script = mysql.format(this.queryUpdateStatus, [novoStatus, id])
    await mySqlHelper.query(script)
  }
}

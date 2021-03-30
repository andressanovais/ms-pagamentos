import { DividaRepository } from '@/data/db/mysql'
import { mySqlHelper } from './mysql-helper'
import mysql from 'mysql'

export class DividaMysqlRepository implements DividaRepository {
  private readonly queryUpdateStatus = 'UPDATE Varejo.Divida SET Status = ?, DataFim = ? WHERE Id = ?;'

  async atualizarStatusDataFim (id: number, novoStatus: string, dataFim?: string): Promise<void> {
    const script = mysql.format(this.queryUpdateStatus, [novoStatus, dataFim, id])
    await mySqlHelper.query(script)
  }
}

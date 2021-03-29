import { BoletoRepository } from '@/domain/db'
import { mySqlHelper } from '@/infra/db/mysql/mysql-helper'
import mysql from 'mysql'

export class BoletoMySqlRepository implements BoletoRepository {
  private readonly queryCriarBoleto = 'INSERT INTO Varejo.Boleto SET ?'

  async criarBoleto (
    numeroDocumento: string,
    valor: number,
    dataEmissao: string,
    dataVencimento: string,
    idDivida: number
  ): Promise<void> {
    const script = mysql.format(this.queryCriarBoleto, {
      NumeroDocumento: numeroDocumento,
      Valor: valor,
      DataEmissao: dataEmissao,
      DataVencimento: dataVencimento,
      IdDivida: idDivida
    })
    await mySqlHelper.query(script)
  }
}

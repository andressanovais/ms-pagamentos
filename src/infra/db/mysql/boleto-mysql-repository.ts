import { BoletoRepository } from '@/domain/db'
import { mySqlHelper } from './mysql-helper'
import mysql from 'mysql'

export class BoletoMySqlRepository implements BoletoRepository {
  private readonly queryCriarBoleto = 'INSERT INTO Varejo.Boleto SET ?'

  async criarBoleto (
    numeroDocumento: string,
    valor: number,
    dataEmissao: string,
    dataVencimento: string,
    idDivida: number
  ): Promise<number> {
    const script = mysql.format(this.queryCriarBoleto, {
      NumeroDocumento: numeroDocumento,
      Valor: valor,
      DataEmissao: dataEmissao,
      DataVencimento: dataVencimento,
      IdDivida: idDivida
    })
    const resultado = await mySqlHelper.query(script)
    return resultado.insertId
  }
}

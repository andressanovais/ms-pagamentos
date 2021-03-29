import { ProcessadorPagamento } from '@/domain/usecases'
import { BoletoMySqlRepository, CartaoMysqlRepository, ContaMysqlRepository, DividaMysqlRepository } from '@/infra/db/mysql'
import { EmissorBoletoAdapter, ProcessadorPagamentoBusiness } from '@/data/usecases'

export const criarProcessadorPagamento = (): ProcessadorPagamento => {
  const boletoMySqlRepository = new BoletoMySqlRepository()
  const cartaoMySqlRepository = new CartaoMysqlRepository()
  const contaMySqlRepository = new ContaMysqlRepository()
  const dividaMySqlRepository = new DividaMysqlRepository()
  const emissorBoletoAdapter = new EmissorBoletoAdapter()

  return new ProcessadorPagamentoBusiness(
    boletoMySqlRepository,
    cartaoMySqlRepository,
    contaMySqlRepository,
    dividaMySqlRepository,
    emissorBoletoAdapter
  )
}

import { EfetivadorBoleto } from '@/domain/usecases'
import { EfetivadorBoletoBusiness } from '@/data/usecases/efetivador-boleto-business'
import { DividaMysqlRepository } from '@/infra/db/mysql'

export const criarEfetivadorBoleto = (): EfetivadorBoleto => {
  const dividaMySqlRepository = new DividaMysqlRepository()
  return new EfetivadorBoletoBusiness(dividaMySqlRepository)
}

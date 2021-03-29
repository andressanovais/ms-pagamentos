import { JoiValidatorAdapter } from '@/infra/validators/joi-validator-adapter'
import { criarEfetivadorBoleto } from '../usecases'
import { EfetivacaoBoletoController } from '@/presentation/controllers/efetivacao-boleto'

export const criarEfetivacaoBoletoController = (): EfetivacaoBoletoController => {
  const joiValidatorAdapter = new JoiValidatorAdapter()
  const efetivadorBoletoBusiness = criarEfetivadorBoleto()
  return new EfetivacaoBoletoController(joiValidatorAdapter, efetivadorBoletoBusiness)
}

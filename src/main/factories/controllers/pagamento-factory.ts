import { JoiValidatorAdapter } from '@/infra/validators/joi-validator-adapter'
import { PagamentoController } from '@/presentation/controllers/pagamento'

export const pagamentoControllerFactory = (): PagamentoController => {
  const joiValidatorAdapter = new JoiValidatorAdapter()
  const processadorPagamentoBusiness = new ProcessadorPagamentoBusiness()
  return new PagamentoController(joiValidatorAdapter, processadorPagamentoBusiness)
}

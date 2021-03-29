import { JoiValidatorAdapter } from '@/infra/validators/joi-validator-adapter'
import { PagamentoController } from '@/presentation/controllers/pagamento'
import { criarProcessadorPagamento } from '../usecases/processador-pagamento-factory'

export const criarPagamentoController = (): PagamentoController => {
  const joiValidatorAdapter = new JoiValidatorAdapter()
  const processadorPagamentoBusiness = criarProcessadorPagamento()
  return new PagamentoController(joiValidatorAdapter, processadorPagamentoBusiness)
}

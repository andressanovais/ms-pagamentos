import { PagamentoModel } from '@/domain/models'

export const ehPagamento = (data: any): data is PagamentoModel => {
  if ((data as PagamentoModel).formaPagamento) {
    return true
  } else {
    return false
  }
}

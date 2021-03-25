import { PagamentoModel } from '@/domain/models'

export interface ProcessadorPagamento {
  processar: (pagamento: PagamentoModel) => Promise<string>
}

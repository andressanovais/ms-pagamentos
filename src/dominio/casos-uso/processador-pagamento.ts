import { PagamentoModel } from '@/dominio/modelos'

export interface ProcessadorPagamento {
  processar: (pagamento: PagamentoModel) => Promise<string>
}

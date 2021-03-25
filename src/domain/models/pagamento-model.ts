export interface PagamentoModel {
  divida: Divida
  idConta: number
}

interface Divida {
  id: number
  valor: string
  formaPagamento: string
  ativa: boolean
}

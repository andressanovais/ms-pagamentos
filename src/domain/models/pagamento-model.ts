export interface PagamentoModel {
  divida: Divida
  idConta: number
}

interface Divida {
  id: number
  valor: number
  formaPagamento: string
}

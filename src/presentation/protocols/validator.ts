import { PagamentoModel, EfetivacaoBoletoModel } from '@/domain/models'

export interface Validator {
  validar: (dados: PagamentoModel | EfetivacaoBoletoModel) => RespostaValidacao
}

export class RespostaValidacao {
  sucesso: boolean
  erro: Error

  constructor (sucesso: boolean, erro?: Error) {
    this.sucesso = sucesso
    this.erro = erro
  }
}

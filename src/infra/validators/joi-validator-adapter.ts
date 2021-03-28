import Joi from 'joi'
import { Validator, RespostaValidacao } from '@/presentation/protocols'
import { PagamentoModel, EfetivacaoBoletoModel } from '@/domain/models'
import { ehPagamento } from '@/infra/helpers/verifica-pagamento'

export class JoiValidatorAdapter implements Validator {
  validar (dados: PagamentoModel | EfetivacaoBoletoModel): RespostaValidacao {
    const schema = this.selecionarSchema(dados)
    const { error } = schema.validate(dados)

    if (error) {
      return new RespostaValidacao(false, error)
    } else {
      return new RespostaValidacao(true)
    }
  }

  selecionarSchema (dados: PagamentoModel | EfetivacaoBoletoModel): Joi.ObjectSchema {
    if (ehPagamento(dados)) {
      return pagamentoSchema
    } else {
      return efetivacaoBoletoSchema
    }
  }
}

const pagamentoSchema = Joi.object().keys({
  idConta: Joi.number().positive().required(),
  divida: Joi.object().keys({
    id: Joi.number().positive().required(),
    valor: Joi.number().required(),
    formaPagamento: Joi.string().valid('DEBITO_CONTA', 'CREDITO', 'BOLETO').required()
  })
})

const efetivacaoBoletoSchema = Joi.object().keys({
})

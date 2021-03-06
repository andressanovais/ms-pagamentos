import Joi from 'joi'
import { Validator, RespostaValidacao } from '@/presentation/protocols'
import { PagamentoModel, EfetivacaoBoletoModel } from '@/domain/models'
import { ehPagamento } from '@/infra/helpers'

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
  id: Joi.number().positive().required(),
  valor: Joi.number().required(),
  formaPagamento: Joi.string().valid('DEBITO_CONTA', 'CREDITO', 'BOLETO').required(),
  idConta: Joi.number().positive().required()
})

const efetivacaoBoletoSchema = Joi.object().keys({
  idDivida: Joi.number().positive().required(),
  statusBoleto: Joi.string().valid('CONFIRMADO', 'VENCIDO').required(),
  dataPagamento: Joi.string().isoDate().required()
})

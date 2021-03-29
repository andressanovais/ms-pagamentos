import { HttpResponse, Controller, Validator } from '@/presentation/protocols'
import { badRequest, internalServerError, ok } from '@/presentation/helpers'
import { InternalServerError } from '@/presentation/erros'
import { EfetivadorBoleto } from '@/domain/usecases'
import { EfetivacaoBoletoModel } from '@/domain/models'

export class EfetivacaoBoletoController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly efetivadorBoleto: EfetivadorBoleto
  ) {}

  async handle (request: EfetivacaoBoletoModel): Promise<HttpResponse> {
    try {
      const resultadoValidacao = this.validator.validar(request)
      if (resultadoValidacao.erro) {
        return badRequest(resultadoValidacao.erro)
      }

      const mensagem = await this.efetivadorBoleto.efetivar(request)

      return ok(mensagem)
    } catch (erro) {
      return internalServerError(new InternalServerError())
    }
  }
}

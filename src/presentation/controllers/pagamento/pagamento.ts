import { HttpResponse, Controller, Validador } from '@/presentation/protocols'
import { badRequest, internalServerError, ok } from '@/presentation/helpers'
import { ProcessadorPagamento } from '@/domain/usecases'
import { PagamentoModel } from '@/domain/models'
import { InternalServerError } from '@/presentation/erros'

export class PagamentoController implements Controller {
  constructor (
    private readonly validador: Validador,
    private readonly processadorPagamento: ProcessadorPagamento
  ) {}

  async handle (request: PagamentoModel): Promise<HttpResponse> {
    try {
      const resultadoValidacao = this.validador.validar(request)
      if (resultadoValidacao.erro) {
        return badRequest(resultadoValidacao.erro)
      }

      const mensagem = await this.processadorPagamento.processar(request)

      return ok(mensagem)
    } catch (erro) {
      return internalServerError(new InternalServerError())
    }
  }
}

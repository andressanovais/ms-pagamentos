import { HttpRequest, HttpResponse } from '../../protocolos'
import { badRequest, internalServerError, ok } from '../../helpers'
import { InternalServerError, ParamInvalidosErro, ParamObrigatorioErro } from '../../erros'

export class PagamentoController implements Controller {
  constructor (
    private readonly validador: Validador,
    private readonly processadorPagamento: ProcessadorPagamento
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const resultadoValidacao = await this.validador.validar(httpRequest.body)
      if (resultadoValidacao.error) {
        return badRequest(resultadoValidacao.error)
      }
    } catch (erro) {
      return internalServerError(erro)
    }
  }
}

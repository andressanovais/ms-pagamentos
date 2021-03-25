import { HttpResponse, Controller, Validador } from '@/apresentacao/protocolos'
import { badRequest, internalServerError, ok } from '@/apresentacao/helpers'
import { ProcessadorPagamento } from '@/dominio/casos-uso'
import { InternalServerError } from '@/apresentacao/erros'

export class PagamentoController implements Controller {
  constructor (
    private readonly validador: Validador,
    private readonly processadorPagamento: ProcessadorPagamento
  ) {}

  async handle (request: PagamentoController.Request): Promise<HttpResponse> {
    try {
      const resultadoValidacao = await this.validador.validar(request)
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

export namespace PagamentoController {
  export type Request = {
    divida: Divida
    idConta: number
  }

  type Divida = {
    id: number
    valor: string
    formaPagamento: string
    ativa: boolean
  }
}

import { PagamentoModel } from '@/domain/models'
import { FormasPagamento, StatusDivida } from '@/data/protocols'
import { CartaoRepository, ContaRepository, DividaRepository, BoletoRepository } from '@/data/db/mysql'
import { ProcessadorPagamento, EmissorBoleto } from '@/domain/usecases'

export class ProcessadorPagamentoBusiness implements ProcessadorPagamento {
  private idConta: number
  private idDivida: number
  private valor: number
  private formaPagamento: string

  constructor (
    private readonly boletoRepository: BoletoRepository,
    private readonly cartaoRepository: CartaoRepository,
    private readonly contaRepository: ContaRepository,
    private readonly dividaRepository: DividaRepository,
    private readonly emissorBoleto: EmissorBoleto
  ) {}

  async processar (pagamento: PagamentoModel): Promise<string> {
    this.inicializarPropriedades(pagamento)

    const possuiValorDisponivel = await this.possuiValorDisponivel()
    if (possuiValorDisponivel) {
      if (this.formaPagamento === FormasPagamento.Boleto) {
        await this.emitirBoleto()
        await this.alterarStatusDivida(StatusDivida.AguardandoConfirmacaoBoleto)
        return 'Boleto emitido com sucesso'
      } else {
        await this.alterarStatusDivida(StatusDivida.PagamentoRealizado)
        return 'Divida paga com sucesso'
      }
    } else {
      await this.alterarStatusDivida(StatusDivida.PagamentoRecusado)
      return 'Pagamento recusado. Saldo insuficiente'
    }
  }

  inicializarPropriedades (pagamento: PagamentoModel): void {
    this.idDivida = pagamento.id
    this.valor = pagamento.valor
    this.formaPagamento = pagamento.formaPagamento
    this.idConta = pagamento.idConta
  }

  async possuiValorDisponivel (): Promise<boolean> {
    switch (this.formaPagamento) {
      case FormasPagamento.Credito:
        return this.possuiLimiteDisponivel()
      case FormasPagamento.DebitoConta:
        return this.possuiSaldoDisponivel()
      case FormasPagamento.Boleto:
        return true
    }
  }

  async possuiLimiteDisponivel (): Promise<boolean> {
    const limiteDisponivel = await this.cartaoRepository.obterLimiteDisponivel(this.idConta)
    return limiteDisponivel >= this.valor
  }

  async possuiSaldoDisponivel (): Promise<boolean> {
    const saldo = await this.contaRepository.obterSaldo(this.idConta)
    return saldo >= this.valor
  }

  async emitirBoleto (): Promise<void> {
    const { dataEmissao, dataVencimento } = this.obterDataEmissaoEVencimento()

    const numeroDocumento = this.emissorBoleto.gerarBoleto(this.valor, dataEmissao, dataVencimento)
    await this.boletoRepository.criarBoleto(numeroDocumento, this.valor, dataEmissao, dataVencimento, this.idDivida)
  }

  obterDataEmissaoEVencimento (): { dataEmissao: string, dataVencimento: string } {
    const dataVencimento = new Date()
    dataVencimento.setDate(dataVencimento.getDate() + 3)
    const dataVencimentoFormatada = dataVencimento.toLocaleDateString()

    const dataEmissaoFormatada = new Date().toLocaleDateString()

    return {
      dataEmissao: dataEmissaoFormatada,
      dataVencimento: dataVencimentoFormatada
    }
  }

  async alterarStatusDivida (status: string): Promise<void> {
    await this.dividaRepository.atualizarStatus(this.idDivida, status)
  }
}

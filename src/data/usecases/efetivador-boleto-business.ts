import { DividaRepository } from '@/data/db/mysql'
import { EfetivacaoBoletoModel } from '@/domain/models'
import { EfetivadorBoleto } from '@/domain/usecases'
import { StatusBoleto, StatusDivida } from '../protocols'

export class EfetivadorBoletoBusiness implements EfetivadorBoleto {
  private idDivida: number
  private statusBoleto: string
  private dataPagamento: string

  constructor (
    private readonly dividaRepository: DividaRepository
  ) {}

  async efetivar (boleto: EfetivacaoBoletoModel): Promise<string> {
    this.inicializarPropriedades(boleto)

    if (this.statusBoleto === StatusBoleto.Confirmado) {
      await this.alterarDivida(StatusDivida.PagamentoRealizado, this.dataPagamento)
      return 'Dívida paga com sucesso'
    } else {
      await this.alterarDivida(StatusDivida.EmAberto)
      return 'Boleto vencido. Necessária nova renegociação'
    }
  }

  inicializarPropriedades (boleto: EfetivacaoBoletoModel): void {
    this.idDivida = boleto.idDivida
    this.statusBoleto = boleto.statusBoleto
    this.dataPagamento = boleto.dataPagamento
  }

  async alterarDivida (status: string, dataFim?: string): Promise<void> {
    await this.dividaRepository.atualizarStatusDataFim(this.idDivida, status, dataFim)
  }
}

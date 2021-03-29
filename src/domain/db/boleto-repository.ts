export interface BoletoRepository {
  criarBoleto: (numeroDocumento: string, valor: number, dataEmissao: string, dataVencimento: string, idDivida: number) => Promise<number>
}

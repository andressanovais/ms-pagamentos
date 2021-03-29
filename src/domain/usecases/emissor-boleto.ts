export interface EmissorBoleto {
  gerarBoleto: (valor: number, dataEmissao: string, dataVencimento: string) => any
}

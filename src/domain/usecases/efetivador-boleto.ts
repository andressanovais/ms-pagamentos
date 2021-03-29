import { EfetivacaoBoletoModel } from '@/domain/models'

export interface EfetivadorBoleto {
  efetivar: (boleto: EfetivacaoBoletoModel) => Promise<string>
}

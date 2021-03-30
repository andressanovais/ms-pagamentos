export interface DividaRepository {
  atualizarStatusDataFim: (id: number, novoStatus: string, dataFim?: string) => Promise<void>
}

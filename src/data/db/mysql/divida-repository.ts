export interface DividaRepository {
  atualizarStatus: (id: number, novoStatus: string) => Promise<void>
}

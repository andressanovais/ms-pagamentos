export interface ContaRepository {
  obterSaldo: (id: number) => Promise<number>
}

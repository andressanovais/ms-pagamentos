export interface ArmazenamentoChave {
  obter: (chave: string) => Promise<any>
  obterCredenciaisBD: () => Promise<CredenciaisBD>
}

export interface CredenciaisBD {
  host: string
  user: string
  password: string
}

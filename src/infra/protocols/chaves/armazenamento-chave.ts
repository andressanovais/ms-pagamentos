export interface ArmazenamentoChave {
  obter: (chave: string) => Promise<any>
  obterCredenciaisBD: () => Promise<Credenciais>
}

export interface Credenciais {
  host: string
  user: string
  password: string
}

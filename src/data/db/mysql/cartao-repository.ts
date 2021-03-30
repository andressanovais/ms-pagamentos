export interface CartaoRepository {
  obterLimiteDisponivel: (idConta: number) => Promise<number>
}

import { Router } from 'express'
import { adaptarRota } from '@/main/adapters'
import { criarPagamentoController } from '@/main/factories'

export default (router: Router): void => {
  const pagamentoController = criarPagamentoController()
  router.patch('/pagamentos', adaptarRota(pagamentoController))
}

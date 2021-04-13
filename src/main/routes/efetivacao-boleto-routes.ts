import { Router } from 'express'
import { adaptarRota } from '@/main/adapters'
import { criarEfetivacaoBoletoController } from '@/main/factories'

export default (router: Router): void => {
  const efetivacaoBoletoController = criarEfetivacaoBoletoController()
  router.patch('/efetivacao-boletos', adaptarRota(efetivacaoBoletoController))
}

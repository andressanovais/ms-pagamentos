import { Router } from 'express'
import { adaptarRota } from '@/main/adapters'
import { criarEfetivacaoBoletoController } from '@/main/factories'

export default (router: Router): void => {
  router.post('./efetivacao-boleto', adaptarRota(criarEfetivacaoBoletoController()))
}

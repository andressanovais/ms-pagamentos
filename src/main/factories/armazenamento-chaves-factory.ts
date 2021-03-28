import { ArmazenamentoChave, ParameterStoreAdapter } from '@/infra/protocols/chaves'

export const criarArmazenamentoChave = (): ArmazenamentoChave => {
  return new ParameterStoreAdapter()
}

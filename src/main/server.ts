import { mySqlHelper } from '@/infra/db/mysql/mysql-helper'
import { criarArmazenamentoChave } from '@/main/factories'

const armazenamentoChave = criarArmazenamentoChave()

mySqlHelper.abrirConexao(armazenamentoChave)
  .then(async () => {
    const app = (await import('@/main/configs/app')).default
    app.listen(3000, () => console.log('Server running at http://localhost:3000'))
  })
  .catch(console.error)

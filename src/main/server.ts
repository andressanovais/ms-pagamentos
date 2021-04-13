import 'module-alias/register'
import { mySqlHelper } from '@/infra/db/mysql/mysql-helper'
import { criarArmazenamentoChave } from '@/main/factories'

const armazenamentoChave = criarArmazenamentoChave()

mySqlHelper.abrirConexao(armazenamentoChave)
  .then(async () => {
    const app = (await import('@/main/configs/app')).default
    app.listen(8080, () => console.log('Container port 8080'))
  })
  .catch(console.error)

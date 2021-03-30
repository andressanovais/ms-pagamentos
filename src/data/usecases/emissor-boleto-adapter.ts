import { EmissorBoleto } from '@/domain/usecases'
import { Bancos, Boletos, streamToPromise } from 'gerar-boletos/lib'

export class EmissorBoletoAdapter implements EmissorBoleto {
  gerarBoleto (valor: number, dataEmissao: string, dataVencimento: string): any {
    const modeloBoleto = {
      banco: new Bancos.Itau(),
      pagador: {
        nome: 'Nome fictício',
        registroNacional: '12345678',
        endereco: {
          logradouro: 'Rua X, 1',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estadoUF: 'SP',
          cep: '00000-000'
        }
      },
      instrucoes: [],
      beneficiario: {
        nome: 'Empresa Fictícia LTDA',
        cnpj: '43576788000191',
        dadosBancarios: {
          carteira: '09',
          agencia: '18455',
          agenciaDigito: '4',
          conta: '1277165',
          contaDigito: '1',
          nossoNumero: '00000000061',
          nossoNumeroDigito: '8'
        },
        endereco: {
          logradouro: 'Rua Y, 1',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estadoUF: 'SP',
          cep: '20030-030'
        }
      },
      boleto: {
        numeroDocumento: '1001',
        especieDocumento: 'DM',
        valor,
        datas: {
          vencimento: dataVencimento,
          processamento: dataEmissao,
          documentos: dataEmissao
        }
      }
    }

    const novoBoleto = new Boletos(modeloBoleto)
    novoBoleto.gerarBoleto()

    novoBoleto.pdfFile().then(async ({ stream }) => {
      await streamToPromise(stream)
    }).catch((error) => {
      return error
    })

    return modeloBoleto.boleto.numeroDocumento
  }
}

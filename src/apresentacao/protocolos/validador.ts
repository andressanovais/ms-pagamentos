export interface Validador {
  validar: (dados: any) => { sucesso: boolean, erro?: Error }
}

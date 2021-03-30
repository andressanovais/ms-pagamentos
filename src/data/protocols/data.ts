export const obterDataHoje = (): string => {
  const hoje = new Date()
  return formatarDataISO(hoje)
}

export const formatarDataISO = (data: Date): string => {
  return data.toISOString().substring(0, 10)
}

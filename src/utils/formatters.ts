export const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR');
};

export const formatarXP = (xp: number): string => {
  return xp.toLocaleString('pt-BR');
};

export const calcularNivel = (xp: number): number => {
  return Math.floor(xp / 500) + 1;
};

export const calcularProgressoNivel = (xp: number, nivel: number) => {
  const xpNivelAtual = (nivel - 1) * 500;
  const xpProximoNivel = nivel * 500;
  const progresso = ((xp - xpNivelAtual) / 500) * 100;
  return { xpProximoNivel, progresso };
};
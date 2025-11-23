export const calcularNivel = (xp: number): number => {
  return Math.floor(xp / 500) + 1;
};

export const calcularProgressoNivel = (xp: number, nivel: number) => {
  const xpNivelAtual = (nivel - 1) * 500;
  const xpProximoNivel = nivel * 500;
  const xpNecessario = xpProximoNivel - xp;
  const progresso = ((xp - xpNivelAtual) / 500) * 100;

  return { xpProximoNivel, xpNecessario, progresso };
};

export const calcularProgressoPercentual = (concluidos: number, total: number): number => {
  return total > 0 ? (concluidos / total) * 100 : 0;
};
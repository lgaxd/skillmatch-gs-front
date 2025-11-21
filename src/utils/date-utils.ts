export const getMesReferenciaAtual = (): string => {
    const now = new Date();
    const ano = now.getFullYear();
    const mes = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${ano}-${mes}`;
};
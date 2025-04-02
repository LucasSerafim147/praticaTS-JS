// src/utils/formatters.ts
export function formatarMoeda(valor) {
    if (valor === null || valor === undefined || isNaN(valor)) {
        return 'R$ 0,00';
    }
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
export function parseValorMonetario(valorFormatado) {
    const valorNumerico = parseFloat(valorFormatado.replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim());
    return isNaN(valorNumerico) ? 0 : valorNumerico;
}

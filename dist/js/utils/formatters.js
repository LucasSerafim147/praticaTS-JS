// src/utils/formatters.ts
export function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
export function aplicarMascaraMoeda(input) {
    // Guarda a posição original do cursor
    const posicaoOriginal = input.selectionStart || 0;
    const valorOriginal = input.value;
    // Remove todos os caracteres não numéricos
    let valor = input.value.replace(/\D/g, '');
    // Se estiver vazio, limpe o campo
    if (valor === '') {
        input.value = '';
        return;
    }
    // Adiciona os centavos (últimos dois dígitos)
    valor = valor.replace(/(\d)(\d{2})$/, '$1,$2');
    // Adiciona separadores de milhar
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    // Formata como moeda
    input.value = `R$ ${valor}`;
    // Ajusta a posição do cursor
    let novaPosicao = posicaoOriginal;
    const diferenca = input.value.length - valorOriginal.length;
    if (diferenca > 0) {
        novaPosicao += diferenca;
    }
    // Mantém o cursor em posição válida
    novaPosicao = Math.max(3, Math.min(novaPosicao, input.value.length));
    input.setSelectionRange(novaPosicao, novaPosicao);
}
export function removerMascaraMoeda(valorFormatado) {
    const valorNumerico = parseFloat(valorFormatado.replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.'));
    return isNaN(valorNumerico) ? 0 : valorNumerico;
}

// src/utils/mascaras.ts
export function aplicarMascaraMoeda(input) {
    // Remove todos os caracteres não numéricos
    let valor = input.value.replace(/\D/g, '');
    // Adiciona os centavos (últimos dois dígitos)
    valor = valor.replace(/(\d+)(\d{2})$/, '$1,$2');
    // Adiciona separadores de milhar
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    // Atualiza o valor do campo
    input.value = `R$ ${valor}`;
}
// Função para remover a formatação e retornar apenas números
export function removerMascaraMoeda(valorFormatado) {
    const valorNumerico = parseFloat(valorFormatado.replace('R$', '')
        .replace('.', '')
        .replace(',', '.'));
    return isNaN(valorNumerico) ? 0 : valorNumerico;
}

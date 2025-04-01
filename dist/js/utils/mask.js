export function aplicarMascaraMoeda(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/(\d+)(\d{2})$/, '$1,$2');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    input.value = `R$ ${valor}`;
}

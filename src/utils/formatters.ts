
export function formatarMoeda(valor: number) : string {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL"});
}


export function aplicarMascaraMaximo(input: HTMLInputElement, max: number) {
    input.addEventListener('input', () => {
        let value = input.value.replace(/\D/g, ''); // Remove não dígitos
        value = value.slice(0, 3); // Limita a 3 dígitos
        
        if (Number(value) > max) {
            value = max.toString();
        }
        
        input.value = value;
    });
}

export function aplicarMascaraNumero(valor: string, maxLength: number): string {
    // Remove tudo que não é dígito e limita ao tamanho máximo
    return valor.replace(/\D/g, '').slice(0, maxLength);
}

export function aplicarMascaraDecimal(valor: string): string {
    // Remove caracteres não numéricos exceto ponto decimal
    let cleaned = valor.replace(/[^\d,]/g, '');

    // Substitui vírgula por ponto para cálculo
    const decimalSeparator = ',';
    cleaned = cleaned.replace('.', decimalSeparator);

    // Garante apenas um separador decimal
    const parts = cleaned.split(decimalSeparator);
    if (parts.length > 1) {
        cleaned = parts[0] + decimalSeparator + parts.slice(1).join('').slice(0, 2);
    }

    return cleaned;
}
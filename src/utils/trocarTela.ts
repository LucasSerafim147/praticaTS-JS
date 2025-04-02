export function alternarDisplay(elemento: HTMLElement): void {
    elemento.classList.toggle('d-none');
    elemento.classList.toggle('d-block');
}

export function alternarTelas(telaAtual: HTMLElement, telaNova: HTMLElement): void {
    alternarDisplay(telaAtual);
    alternarDisplay(telaNova);
}
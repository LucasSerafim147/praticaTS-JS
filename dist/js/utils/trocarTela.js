export function alternarDisplay(elemento) {
    elemento.classList.toggle('d-none');
    elemento.classList.toggle('d-block');
}
export function alternarTelas(telaAtual, telaNova) {
    alternarDisplay(telaAtual);
    alternarDisplay(telaNova);
}

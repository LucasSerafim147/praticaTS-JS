export function alternarDisplay(elemento: HTMLElement): void {
    elemento.classList.toggle('d-none');
    elemento.classList.toggle('d-block');
}
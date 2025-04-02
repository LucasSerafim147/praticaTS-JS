import { alternarTelas } from "../utils/trocarTela.js";
export function configurarNavegacaoMobile() {
    const btnMobile = document.getElementById('btn-extrato');
    const telaPrincipal = document.getElementById('forms');
    const telaSecundaria = document.getElementById('extrato');
    if (btnMobile && telaPrincipal && telaSecundaria) {
        btnMobile.addEventListener('click', () => {
            alternarTelas(telaPrincipal, telaSecundaria);
        });
    }
}
document.addEventListener('DOMContentLoaded', configurarNavegacaoMobile);

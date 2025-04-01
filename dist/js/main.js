// src/main.ts
import { configurarFormulario } from "./components/forms.js";
import { TransacaoService } from "./services/TransacaoService.js";
import { aplicarMascaraMoeda } from "./utils/mask.js";
document.addEventListener("DOMContentLoaded", () => {
    // Configura máscara para o campo de valor
    const valorInput = document.getElementById('valor');
    if (valorInput) {
        valorInput.addEventListener('input', () => {
            aplicarMascaraMoeda(valorInput);
        });
    }
    // Inicializa o formulário e extrato
    configurarFormulario();
    TransacaoService.atualizarExtrato();
});

// src/main.ts
import { configurarFormulario } from "./js/components/forms.js";
import { TransacaoService } from "./js/services/TransacaoService.js";
import "./js/utils/mask.js";

document.addEventListener("DOMContentLoaded", () => {
    configurarFormulario();
    TransacaoService.atualizarExtrato();
});

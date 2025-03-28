// src/main.ts
import { configurarFormulario } from "./components/forms.js";
import { TransacaoService } from "./services/TransacaoService.js";

document.addEventListener("DOMContentLoaded", () => {
    configurarFormulario();
    TransacaoService.atualizarExtrato();
});
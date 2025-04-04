// src/main.ts
import { configurarFormulario } from "./forms.js";
import { TransacaoService } from "../services/TransacaoService.js";


export function inicializarAplicacao() {
    document.addEventListener("DOMContentLoaded", () => {
        configurarFormulario();
        TransacaoService.atualizarExtrato();
    });
}





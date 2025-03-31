// src/main.ts
import { configurarFormulario } from "./components/forms.js";
import { TransacaoService } from "./services/TransacaoService.js";
import { inicializarAplicacao } from "./components/mostrar.js";
import { Modal } from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
    configurarFormulario();
    TransacaoService.atualizarExtrato();
});






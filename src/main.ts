// src/main.ts
import { configurarFormulario } from "./components/forms.js";
import { TransacaoService } from "./services/TransacaoService.js";
import { mascara } from "./utils/mask.js";


document.addEventListener("DOMContentLoaded", () => {
   
    configurarFormulario();
    TransacaoService.atualizarExtrato();

});








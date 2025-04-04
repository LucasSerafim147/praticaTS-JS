// src/main.ts
import { configurarFormulario } from "./components/forms.js";
import { TransacaoService } from "./services/TransacaoService.js";
import "./utils/mask.js";
import  "./utils/formatters.js"


document.addEventListener("DOMContentLoaded", () => {
   
    configurarFormulario();
    TransacaoService.atualizarExtrato();


});








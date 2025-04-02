import Modal from 'bootstrap'
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { TransacaoService } from "../services/TransacaoService.js";
import { parseValorMonetario } from '../utils/formatters.js';

export function configurarFormulario(): void {
    const formulario = document.querySelector("form");
    
    if (!formulario) return;    

    formulario.addEventListener("submit", function(event: Event) {
        event.preventDefault();
        
        try {
            const tipoSelect = document.getElementById("transactionType") as HTMLSelectElement;
            const nomeInput = document.getElementById("mercadoria") as HTMLInputElement;
            const quantidadeInput = document.getElementById("quantidade") as HTMLInputElement;
            const valorInput = document.getElementById("valor") as HTMLInputElement;



            const modalElement = document.getElementById('staticBackdrop')
            
            const tipo = tipoSelect.value as TipoTransacao;
            const nome = nomeInput.value;
            const quantidade = parseFloat(quantidadeInput.value);


            
            const valor = parseValorMonetario(valorInput.value);

            if (!nome || isNaN(quantidade)) {
                alert("Por favor, preencha todos os campos corretamente!");
                return;
            }

            const novaTransacao: Transacao = {
                transacao: tipo,
                nome: nome,
                quantidade: quantidade,
                valor: valor
            };

            console.log(novaTransacao)
            TransacaoService.adicionar(novaTransacao);
            formulario.reset();

        } catch (error) {
            console.error("Erro ao processar transação:", error);
            alert("Ocorreu um erro ao processar a transação.");
        }
    });
}
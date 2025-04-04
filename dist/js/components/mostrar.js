import { TransacaoService } from "../services/TransacaoService.js";
import { parseValorMonetario } from '../utils/formatters.js';
export function configurarFormulario() {
    const formulario = document.querySelector("form");
    if (!formulario)
        return;
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        try {
            const tipoSelect = document.getElementById("transactionType");
            const nomeInput = document.getElementById("mercadoria");
            const quantidadeInput = document.getElementById("quantidade");
            const valorInput = document.getElementById("valor");
            const modalElement = document.getElementById('staticBackdrop');
            const tipo = tipoSelect.value;
            const nome = nomeInput.value;
            const quantidade = parseFloat(quantidadeInput.value);
            const valor = parseValorMonetario(valorInput.value);
            if (!nome || isNaN(quantidade)) {
                alert("Por favor, preencha todos os campos corretamente!");
                return;
            }
            const novaTransacao = {
                transacao: tipo,
                nome: nome,
                quantidade: quantidade,
                valor: valor
            };
            console.log(novaTransacao);
            TransacaoService.adicionar(novaTransacao);
            formulario.reset();
        }
        catch (error) {
            console.error("Erro ao processar transação:", error);
            alert("Ocorreu um erro ao processar a transação.");
        }
    });
}

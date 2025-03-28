import { TipoTransacao } from "../types/TipoTransacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { getItem, setItem } from '../utils/armazenador.js';
const tbodyExtrato = document.querySelector(".table-extrato tbody");
const saldoValor = document.querySelector(".saldo-valor");
function carregarTransacoes() {
    const transacoes = getItem("transacoes");
    if (transacoes)
        return transacoes;
    const defaultTransacoes = [
        { transacao: TipoTransacao.COMPRA, nome: "Arroz", valor: 25.50, quantidade: 2 },
        { transacao: TipoTransacao.VENDA, nome: "Feijão", valor: 15.00, quantidade: 1 }
    ];
    setItem("transacoes", defaultTransacoes);
    return defaultTransacoes;
}
function renderizarExtrato() {
    const transacoes = carregarTransacoes();
    let htmlLinhas = '';
    let total = 0;
    for (const transacao of transacoes) {
        const sinal = transacao.transacao === TipoTransacao.COMPRA ? '-' : '+';
        const classeSinal = transacao.transacao === TipoTransacao.COMPRA ? 'text-danger' : 'text-success';
        const multiplicador = transacao.transacao === TipoTransacao.COMPRA ? -1 : 1;
        total += multiplicador * transacao.valor;
        htmlLinhas += `
            <tr class="table-row">
                <td class="col-sign ${classeSinal}">${sinal}</td>
                <td class="col-mercadoria">${transacao.nome}</td>
                <td class="col-qtd">${transacao.quantidade}</td>
                <td class="col-valor text-end">${formatarMoeda(transacao.valor)}</td>
            </tr>
        `;
    }
    htmlLinhas += `
        <tr class="table-total">
            <td class="col-sign"></td>
            <td class="col-mercadoria fw-bold">TOTAL</td>
            <td class="col-qtd"></td>
            <td class="col-valor text-end fw-bold">${formatarMoeda(total)}</td>
        </tr>
    `;
    tbodyExtrato.innerHTML = htmlLinhas;
    saldoValor.textContent = formatarMoeda(total);
}
// Componente Extrato
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
};
// Chama a renderização ao carregar
renderizarExtrato();
export default ExtratoComponent;

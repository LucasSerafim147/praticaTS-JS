import { TipoTransacao } from "../types/TipoTransacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { getItem } from "../utils/armazenador.js";
const tbodyExtrato = document.querySelector(".table-extrato tbody");
const saldoValor = document.querySelector(".saldo-valor");
function carregarTransacoes() {
    const transacoes = getItem("transacoes");
    return transacoes || [];
}
function renderizarExtrato() {
    if (!tbodyExtrato || !saldoValor)
        return;
    const transacoes = carregarTransacoes();
    let htmlLinhas = '';
    let total = 0;
    transacoes.forEach(transacao => {
        const valorTotalItem = transacao.valor * transacao.quantidade;
        const operador = transacao.transacao === TipoTransacao.COMPRA ? -1 : 1;
        total += operador * valorTotalItem;
        htmlLinhas += `
            <tr class="table-row">
                <td class="col-sign ${transacao.transacao === TipoTransacao.COMPRA ? 'text-danger' : 'text-success'}">
                    ${transacao.transacao === TipoTransacao.COMPRA ? '-' : '+'}
                </td>
                <td class="col-mercadoria">${transacao.nome}</td>
                <td class="col-qtd">${transacao.quantidade}</td>
                <td class="col-valor text-end">${formatarMoeda(valorTotalItem)}</td>
            </tr>
        `;
    });
    tbodyExtrato.innerHTML = htmlLinhas;
    saldoValor.textContent = formatarMoeda(total);
}
export default {
    atualizar: () => renderizarExtrato()
};

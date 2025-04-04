import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { getItem, setItem } from "../utils/armazenador.js";

const tbodyExtrato = document.querySelector(".table-extrato tbody") as HTMLElement;
const saldoValor = document.querySelector(".saldo-valor") as HTMLElement;

function carregarTransacoes(): Transacao[] {
    const transacoes = getItem<Transacao[]>("transacoes");
    return transacoes || [];
}

function renderizarExtrato(): void {
    if (!tbodyExtrato || !saldoValor) return;

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
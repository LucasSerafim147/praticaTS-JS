// src/services/TransacaoService.ts
import { TipoTransacao } from "../types/TipoTransacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { getItem, setItem } from "../utils/armazenador.js";
const CHAVE_TRANSACOES = "finGuide_transacoes";
export class TransacaoService {
    static carregarTransacoes() {
        return getItem(CHAVE_TRANSACOES) || [];
    }
    static salvarTransacoes(transacoes) {
        setItem(CHAVE_TRANSACOES, transacoes);
    }
    static adicionar(transacao) {
        const transacoes = this.carregarTransacoes();
        // Calcula e armazena apenas o valor total
        const transacaoComTotal = {
            ...transacao,
            valor: transacao.quantidade * transacao.valor // Valor total
        };
        transacoes.push(transacaoComTotal);
        this.salvarTransacoes(transacoes);
        this.atualizarExtrato();
    }
    static remover(index) {
        const transacoes = this.carregarTransacoes();
        transacoes.splice(index, 1);
        this.salvarTransacoes(transacoes);
        this.atualizarExtrato();
    }
    static calcularSaldo() {
        const transacoes = this.carregarTransacoes();
        return transacoes.reduce((total, transacao) => {
            return transacao.transacao === TipoTransacao.VENDA
                ? total + transacao.valor // Valor total
                : total - transacao.valor;
        }, 0);
    }
    static atualizarExtrato() {
        const transacoes = this.carregarTransacoes();
        const corpoTabela = document.querySelector(".table-extrato tbody");
        const saldoElement = document.querySelector(".saldo-valor");
        if (!corpoTabela || !saldoElement)
            return;
        corpoTabela.innerHTML = '';
        transacoes.forEach((transacao, index) => {
            const linha = document.createElement("tr");
            linha.className = "table-row";
            const sinal = transacao.transacao === TipoTransacao.VENDA ? "text-success" : "text-danger";
            const simbolo = transacao.transacao === TipoTransacao.VENDA ? "+" : "-";
            linha.innerHTML = `
                <td class="col-sign ${sinal}">${simbolo}</td>
                <td class="col-mercadoria">${transacao.nome}</td>
                <td class="col-qtd">${transacao.quantidade}</td>
                <td class="col-valor text-end">${formatarMoeda(transacao.valor)}</td>
                <td class="col-action text-end">
                    <button class="btn btn-sm btn-outline-danger" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });
        // Linha de total
        const totalRow = document.createElement("tr");
        totalRow.className = "table-total";
        totalRow.innerHTML = `
            <td class="col-sign"></td>
            <td class="col-mercadoria fw-bold">TOTAL</td>
            <td class="col-qtd"></td>
            <td class="col-valor text-end fw-bold">${formatarMoeda(this.calcularSaldo())}</td>
            <td class="col-action"></td>
        `;
        corpoTabela.appendChild(totalRow);
        // Atualiza o saldo
        saldoElement.textContent = formatarMoeda(this.calcularSaldo());
        // Eventos dos botões de remover
        document.querySelectorAll(".btn-outline-danger").forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.currentTarget;
                const index = target.getAttribute("data-index");
                if (index) {
                    this.remover(parseInt(index));
                }
            });
        });
    }
}

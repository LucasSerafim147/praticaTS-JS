import { TipoTransacao } from "../types/TipoTransacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { getItem, setItem } from '../utils/armazenador.js';
// Debug 1: Verificar carregamento do módulo
console.log('[Extrato] Módulo carregado');
// Elementos com verificação robusta
const tbodyExtrato = document.querySelector(".table-extrato tbody");
const saldoValor = document.querySelector(".saldo-valor");
// Debug 2: Verificar elementos DOM
console.log('[Extrato] Elementos encontrados:', {
    tbodyExtrato: tbodyExtrato ? 'OK' : 'FALHOU',
    saldoValor: saldoValor ? 'OK' : 'FALHOU'
});
function carregarTransacoes() {
    // Debug 3: Verificar acesso ao armazenamento
    console.log('[Extrato] Carregando transações...');
    const transacoes = getItem("transacoes");
    // Debug 4: Verificar dados do storage
    console.log('[Extrato] Dados recuperados:', transacoes);
    if (transacoes?.length)
        return transacoes;
    const defaultTransacoes = [
        { transacao: TipoTransacao.COMPRA, nome: "Arroz", valor: 25.50, quantidade: 2 },
        { transacao: TipoTransacao.VENDA, nome: "Feijão", valor: 15.00, quantidade: 1 }
    ];
    // Debug 5: Verificar criação defaults
    console.log('[Extrato] Criando transações padrão:', defaultTransacoes);
    setItem("transacoes", defaultTransacoes);
    return defaultTransacoes;
}
function renderizarExtrato() {
    // Debug 6: Verificar chamada da renderização
    console.log('[Extrato] Iniciando renderização');
    if (!tbodyExtrato || !saldoValor) {
        console.error('[Extrato] Elementos não encontrados!');
        return;
    }
    try {
        const transacoes = carregarTransacoes();
        let htmlLinhas = '';
        let total = 0;
        // Debug 7: Verificar processamento
        console.log('[Extrato] Processando transações:', transacoes.length);
        transacoes.forEach((transacao, index) => {
            // Debug 8: Verificar item por item
            console.log(`[Extrato] Processando item ${index}:`, transacao);
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
        // Adiciona linha do total
        htmlLinhas += `
            <tr class="table-total">
                <td class="col-sign"></td>
                <td class="col-mercadoria fw-bold">TOTAL</td>
                <td class="col-qtd"></td>
                <td class="col-valor text-end fw-bold">${formatarMoeda(total)}</td>
            </tr>
        `;
        // Debug 9: Verificar HTML gerado
        console.log('[Extrato] HTML gerado:', htmlLinhas);
        tbodyExtrato.innerHTML = htmlLinhas;
        saldoValor.textContent = formatarMoeda(total);
        // Debug 10: Confirmação final
        console.log('[Extrato] Renderização concluída com sucesso');
    }
    catch (error) {
        console.error('[Extrato] Erro na renderização:', error);
    }
}
// Debug 11: Verificar registro do componente
console.log('[Extrato] Registrando componente');
const ExtratoComponent = {
    atualizar: () => {
        console.log('[Extrato] Chamada para atualizar');
        renderizarExtrato();
    }
};
// Debug 12: Verificar evento DOMContentLoaded
console.log('[Extrato] Registrando DOMContentLoaded');
document.addEventListener('DOMContentLoaded', () => {
    console.log('[Extrato] DOMContentLoaded disparado');
    renderizarExtrato();
});
export default ExtratoComponent;

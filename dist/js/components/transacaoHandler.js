import bootstrap from 'bootstrap';
export class TransacaoHandler {
    addButton;
    confirmationModal;
    modalTransacao;
    modalMercadoria;
    modalQuantidade;
    modalValor;
    confirmPurchaseBtn;
    constructor() {
        console.log('Inicializando TransacaoHandler...');
        // Seleção de elementos do DOM
        this.addButton = document.querySelector('button[data-bs-target="#staticBackdrop"]');
        this.confirmationModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        this.modalTransacao = document.getElementById('ModalTransacao');
        this.modalMercadoria = document.getElementById('ModalMercadoria');
        this.modalQuantidade = document.getElementById('ModalQuantidade');
        this.modalValor = document.getElementById('ModalValor');
        this.confirmPurchaseBtn = document.getElementById('confirmarCompra');
        // Verificações
        if (!this.addButton)
            console.error('Botão "Adicionar" não encontrado');
        if (!this.modalTransacao || !this.modalMercadoria || !this.modalQuantidade || !this.modalValor) {
            console.error('Elementos do modal não encontrados');
        }
        if (!this.confirmPurchaseBtn)
            console.error('Botão "confirmarCompra" não encontrado');
        this.setupEventListeners();
    }
    setupEventListeners() {
        // Evento do botão "Adicionar"
        if (this.addButton) {
            this.addButton.addEventListener('click', (event) => {
                console.log('Botão "Adicionar" clicado');
                event.preventDefault();
                const transacaoElement = document.getElementById('transactionType');
                const mercadoriaElement = document.getElementById('mercadoria');
                const quantidadeElement = document.getElementById('quantidade');
                const valorElement = document.getElementById('valor');
                if (!transacaoElement || !mercadoriaElement || !quantidadeElement || !valorElement) {
                    console.error('Erro: Campos do formulário não encontrados');
                    return;
                }
                const transacao = transacaoElement.value;
                const nome = mercadoriaElement.value;
                const quantidade = parseInt(quantidadeElement.value);
                const valor = parseFloat(valorElement.value);
                console.log('Valores capturados:', { transacao, nome, quantidade, valor });
                if (!transacao || !nome || isNaN(quantidade) || isNaN(valor)) {
                    console.warn('Validação falhou');
                    alert('Por favor, preencha todos os campos corretamente.');
                    return;
                }
                const transacaoData = { transacao, nome, quantidade, valor };
                this.fillModal(transacaoData);
            });
        }
        // Evento de confirmação no modal
        if (this.confirmPurchaseBtn) {
            this.confirmPurchaseBtn.addEventListener('click', () => {
                console.log('Confirmação clicada');
                alert('Transação confirmada com sucesso!');
                this.confirmationModal.hide();
                const form = document.querySelector('form');
                if (form)
                    form.reset();
            });
        }
    }
    fillModal(data) {
        console.log('Preenchendo modal com dados:', data);
        if (this.modalTransacao)
            this.modalTransacao.textContent = data.transacao;
        if (this.modalMercadoria)
            this.modalMercadoria.textContent = data.nome;
        if (this.modalQuantidade)
            this.modalQuantidade.textContent = data.quantidade.toString();
        const valorTotal = (data.quantidade * data.valor).toFixed(2);
        if (this.modalValor)
            this.modalValor.textContent = `R$ ${valorTotal}`;
    }
}

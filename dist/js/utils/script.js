import bootstrap from "bootstrap";
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando script...');
    // Elementos do formulário
    const form = document.querySelector('form');
    const addButton = form.querySelector('button[type="button"]');
    // Elementos do modal
    const modalElement = document.getElementById('staticBackdrop');
    if (!modalElement) {
        console.error('Modal não encontrado');
        return;
    }
    const modal = new bootstrap.Modal(modalElement);
    const modalTransacao = document.getElementById('ModalTransacao');
    const modalMercadoria = document.getElementById('ModalMercadoria');
    const modalQuantidade = document.getElementById('ModalQuantidade');
    const modalValor = document.getElementById('ModalValor');
    const confirmPurchaseBtn = document.getElementById('confirmarCompra');
    // Função para preencher o modal
    function fillModal(data) {
        console.log('Preenchendo modal com dados:', data);
        modalTransacao.textContent = data.transacao === 'compra' ? 'Compra' : 'Venda';
        modalMercadoria.textContent = data.nome;
        modalQuantidade.textContent = data.quantidade.toString();
        modalValor.textContent = `R$ ${(data.quantidade * data.valor).toFixed(2)}`;
    }
    // Evento do botão "Adicionar"
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Botão "Adicionar" clicado');
        // Obter valores do formulário
        const formData = new FormData(form);
        const transacao = formData.get('transactionType');
        const nome = formData.get('mercadoria');
        const quantidade = parseInt(formData.get('quantidade'));
        const valor = parseFloat(formData.get('valor'));
        console.log('Valores capturados:', { transacao, nome, quantidade, valor });
        // Validação
        if (!transacao || !nome || isNaN(quantidade) || isNaN(valor) || quantidade <= 0 || valor <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
        // Preencher e mostrar o modal
        fillModal({ transacao, nome, quantidade, valor });
        modal.show();
    });
    // Evento de confirmação
    confirmPurchaseBtn.addEventListener('click', () => {
        alert('Transação confirmada com sucesso!');
        modal.hide();
        form.reset();
    });
});

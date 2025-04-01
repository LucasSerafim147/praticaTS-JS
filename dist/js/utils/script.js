import bootstrap from "bootstrap";
const purchaseForm = document.getElementById('transactionType');
const confirmationModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
const modalProductName = document.getElementById('ModalMercadoria');
const modalQuantity = document.getElementById('ModalQuantidade');
const modalTotalPrice = document.getElementById('ModalValor');
const confirmPurchaseBtn = document.getElementById('confirmarCompra');
function fillModal(data) {
    modalProductName.textContent = data.nome;
    modalQuantity.textContent = data.quantidade.toString();
    const totalPrice = (data.quantidade * data.valor).toFixed(2);
    modalTotalPrice.textContent = `R$ ${totalPrice}`;
    confirmationModal.show(); // Abre o modal
}
// Evento de submissão do formulário
purchaseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Captura os valores do formulário
    const productName = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    // Validação básica
    if (!productName || isNaN(quantity) || isNaN(price)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    // Cria objeto com os dados
    const purchaseData = { productName, quantity, price };
    // Preenche e exibe o modal
    fillModal(purchaseData);
});
// Evento de confirmação final no modal
confirmPurchaseBtn.addEventListener('click', () => {
    alert('Compra confirmada com sucesso!');
    confirmationModal.hide(); // Fecha o modal
    purchaseForm.reset(); // Reseta o formulário
});

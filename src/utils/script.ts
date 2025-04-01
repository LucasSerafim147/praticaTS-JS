
import bootstrap from "bootstrap";
import { Transacao } from "../types/Transacao";


  const purchaseForm = document.getElementById('transactionType') as HTMLFormElement;
  const confirmationModal = new bootstrap.Modal(document.getElementById('staticBackdrop') as HTMLElement);
  const modalProductName = document.getElementById('ModalMercadoria') as HTMLSpanElement;
  const modalQuantity = document.getElementById('ModalQuantidade') as HTMLSpanElement;
  const modalTotalPrice = document.getElementById('ModalValor') as HTMLSpanElement;
  const confirmPurchaseBtn = document.getElementById('confirmarCompra') as HTMLButtonElement;
  
  
  function fillModal(data: Transacao): void {
    modalProductName.textContent = data.nome;
    modalQuantity.textContent = data.quantidade.toString();
    const totalPrice = (data.quantidade * data.valor).toFixed(2);
    modalTotalPrice.textContent = `R$ ${totalPrice}`;
    confirmationModal.show(); // Abre o modal
  }
  
  // Evento de submissão do formulário
  purchaseForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
  
    // Captura os valores do formulário
    const productName = (document.getElementById('productName') as HTMLInputElement).value;
    const quantity = parseInt((document.getElementById('quantity') as HTMLInputElement).value);
    const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
  
    // Validação básica
    if (!productName || isNaN(quantity) || isNaN(price)) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }
  
    // Cria objeto com os dados
    const purchaseData: PurchaseData = { productName, quantity, price };
  
    // Preenche e exibe o modal
    fillModal(purchaseData);
  });
  
  // Evento de confirmação final no modal
  confirmPurchaseBtn.addEventListener('click', () => {
    alert('Compra confirmada com sucesso!');
    confirmationModal.hide(); // Fecha o modal
    purchaseForm.reset(); // Reseta o formulário
  });
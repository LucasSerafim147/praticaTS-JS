"use strict";
const inputValor = document.querySelector('#valor');
inputValor.addEventListener('input', function (e) {
    let value = this.value.replace(/\D/g, '');
    let number = parseInt(value) / 100;
    if (!isNaN(number)) {
        this.value = number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
    else {
        this.value = '';
    }
    let len = this.value.length;
    this.setSelectionRange(len, len);
});
inputValor.addEventListener('blur', function (e) {
    if (this.value === '') {
        this.value = 'R$ 0,00';
    }
});
inputValor.addEventListener('focus', function (e) {
    if (this.value === 'R$ 0,00') {
        this.value = '';
    }
});


console.log("teste")
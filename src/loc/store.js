import * as module_modal from '../modules/modal';
import * as module_hero from '../modules/hero';
import * as module_seller from '../modules/seller';
import {
    santinoText
} from '../modules/text';
import {
    btnConstruct
} from '../modules/construct';
import {
    elemConstruct
} from '../modules/construct';


// Вывод локации магазина *
shop.addEventListener('click', function() {
    module_modal.showModal('modal-loc', 'shop-loc');
    // Диалоговое окно магазина *
    var dialogueBox = new elemConstruct({
        elemParent: '.modal-inner',
        elemClass: 'dialogue',
        elemTag: 'div',
        elemInner: `
        <p class="dialogue_article"><b>Сантино:</b> Продаю по полной цене, выкупаю за половину :)</p>
        <div class="btn-block btn-block_dialogue"></div>
        `
    });
    // Добавляем созданный элемент в разметку *
    dialogueBox.addElem();
    // Кнопка Товары *
    var showProduct = new btnConstruct({
        btnClass: 'show_product',
        btnText: 'Товары',
        btnParent: '.btn-block_dialogue'
    });
    showProduct.createBtn();
    // Кнопка Уйти *
    var leaveLoc = new btnConstruct({
        btnClass: 'modal-close_btn',
        btnText: 'Уйти',
        btnParent: '.btn-block_dialogue'
    });
    leaveLoc.createBtn();
    // Вывод товаров *
    var showProductBtn = document.querySelector('.show_product');
    showProductBtn.addEventListener('click', function(){
        module_seller.showProductList({
            productObj: module_seller.shopProduct
        });
        // Кнопка купить *
        var buyBtn = document.querySelector('.buy_btn');
        buyBtn.addEventListener('click', function(){
            module_seller.buyBtn({
                productObj: module_seller.shopProduct
            });
        });
        // Комментарии торговца к товарам *
        module_seller.sellerComment(santinoText);
    });
});

import {
    btnConstruct
} from './construct';
import {
    elemConstruct
} from './construct';

export function actLoader(text, typeText){
    // Кнопка уйти *
    function endWork(text){
        var start = new btnConstruct({
            btnClass: 'modal-close_btn',
            btnText: 'Уйти',
            btnParent: '.btn-block_dialogue'
        });
        start.createBtn();

        dialogue.innerHTML = text;
        document.querySelector('.load').classList.add('hide');
    }

    // Гифка с часами *
    var load = new elemConstruct({
        elemParent: '.modal-inner',
        elemClass: 'load',
        elemTag: 'div',
        elemInner: `<img src="img/hourglass.png" alt="">`
    });
    // Добавляем созданный элемент в разметку *
    load.addElem();

    // Диалоговое окно *
    var dialogueBox = new elemConstruct({
        elemParent: '.modal-inner',
        elemClass: 'dialogue',
        elemTag: 'div',
        elemInner: `
            <p class="dialogue_article" id="dialogue">${typeText} ...</p>
            <div class="btn-block btn-block_dialogue" id="btn_block"></div>
            `
    });
    // Добавляем созданный элемент в разметку *
    dialogueBox.addElem();

    setTimeout(endWork, 5000, text);

}

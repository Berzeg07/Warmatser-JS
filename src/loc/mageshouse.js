import {
    showModal
} from '../modules/modal';
import {
    btnConstruct
} from '../modules/construct';
import {
    elemConstruct
} from '../modules/construct';
import {
    questAdd
} from '../modules/journal';
import {
    dialogueEl
} from '../modules/dialogue';

runolv.addEventListener('click', function() {
    // Вывод локации *
    showModal('modal-loc','mage-loc_empty');
    // Диалоговое окно *
    dialogueEl();

    var textBlock = document.querySelector('.dialogue_article');
    textBlock.innerHTML = 'В доме никого нет ...';

    var start = new btnConstruct({
        btnClass: 'modal-close_btn',
        btnText: 'Уйти',
        btnParent: '.btn-block_dialogue'
    });
    start.createBtn();

    // Добавляем запись в журнал *
    questAdd({
        questName: 'Начало',
        questArticle: 'После моего убытия Рунольв исчез, странно ...'
    });
});

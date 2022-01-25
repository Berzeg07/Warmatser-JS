import * as module_modal from '../modules/modal';
import * as module_dialogue from '../modules/dialogue';
import {
    btnConstruct
} from '../modules/construct';
import {
    elemConstruct
} from '../modules/construct';
import {
    textObjRunolv
} from '../modules/text';

function startGame() {
    // Выводим стартовое окно *
    var classArr = ['modal', 'modal-show', 'journal'];
    // Формируем разметку стартого окна *
    var journalElem = new elemConstruct({
        elemParent: '#cont',
        elemClass: classArr,
        elemTag: 'div',
        elemInner: `
            <p class="journal-title">Начало</p>
            <div class="begin-img begin-img_start"><img src="img/bg-main.jpg"></div>
            <div class="start-article">
                <p>В голове мрак и сумятица, раскалывается затылок, последнее, что ты помнишь это горный перевал и неожиданный камнепад, дальше только тьма. Ты очнулся в кровати, кто то тебя вытащил из злополучного перевала, можно встать и осмотреться...</p>
            </div>
            <div class="button-box" style="text-align:center;"></div>
        `
    });
    // Добавляем созданный элемент в разметку *
    journalElem.addElem();
    // Кнопка Далее *
    var start = new btnConstruct({
        btnClass: 'start-game',
        btnText: 'Далее',
        btnParent: '.button-box'
    });
    start.createBtn();
    // Включаем затемнение фона *
    module_modal.overlayShow();
    // Переход от стартого окна к диалогу с Рунольвом *
    var start = document.querySelector('.start-game');
    // Индекс текущего объекта диалога *
    var currentObj = 0;
    // Начало игры, вывод локации Рунольва *
    start.addEventListener('click', function() {
        startRunolv();
        // Обработчик списка вопросов игрока *
        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList != 4) {
                    module_dialogue.showAnswear({
                        textObj: textObjRunolv,
                        textObjIndex: 0,
                        indexList: clickList
                    });
                } else {
                    currentObj = 1;
                    module_dialogue.dialogueStart({
                        textObj: textObjRunolv,
                        index: 1,
                        showTextNpc: true
                    });
                }
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (clickList == 0) {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjRunolv,
                        index: 0,
                        showTextNpc: false
                    });
                }
                if (clickList == 1) {
                    module_modal.deleteModal();
                }
            }
            // Конец диалогов *
        }
    });
    // Скрываем вступление и выводим окно с магом *
    function startRunolv() {
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'mage-loc', false);
        module_dialogue.dialogueEl();
        module_dialogue.dialogueStart({
            textObj: textObjRunolv,
            index: 0,
            showTextNpc: true
        });
    }
}

startGame();

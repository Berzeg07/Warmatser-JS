import * as module_modal from '../modules/modal';
import * as module_dialogue from '../modules/dialogue';

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
    dialogueNPC
} from '../modules/dialogue';
import {
    textObjFridrick
} from '../modules/text';
import {
    questMarkObj
} from '../modules/questMark';

function fridrickStart() {
    fridrick.addEventListener('click', function() {
        var currentObj = 0;
        // Вывод локации *
        module_modal.showModal('modal-loc', 'fridrick-loc', true);

        module_dialogue.dialogueEl();

        // Если уже посетили Фридрика *
        if (questMarkObj.visitFridrick) {
            currentObj = 2;
        }

        module_dialogue.dialogueStart({
            textObj: textObjFridrick,
            index: currentObj,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList == 0) {
                    currentObj = 1;
                    module_dialogue.dialogueStart({
                        textObj: textObjFridrick,
                        index: currentObj,
                        showTextNpc: true
                    });
                    questAdd({
                        questName: 'Пропавший помощник',
                        questArticle: 'Помощник Фридрика Джерард оказался вором и сбежал с золотом хозяина. Фридрик готов щедро заплатить за возврат сундука. Нужно найти безопасный способ пробраться в туманную лощину'
                    });
                    questAdd({
                        questName: 'Пропавший помощник',
                        questArticle: 'Фридрик договорился с Андреасом, теперь я могу тренироваться у него.'
                    });
                    // Активируем возможность тренировки у Андреаса *
                    questMarkObj.trainAndreas = true;
                    // Активируем пункт диалога в таверне (Вопрос о Бернарде)
                    questMarkObj.visitFridrick = true;

                } else {
                    module_modal.deleteModal();
                }
                return;
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (clickList != 4) {
                    module_dialogue.showAnswear({
                        textObj: textObjFridrick,
                        textObjIndex: currentObj,
                        indexList: clickList
                    });
                } else {
                    module_modal.deleteModal();
                }
            }
            // Индекс диалога 2 *
            if (currentObj == 2) {
                if (clickList == 0) {
                    module_modal.deleteModal();
                }
            }
        }
    });
}

fridrickStart();

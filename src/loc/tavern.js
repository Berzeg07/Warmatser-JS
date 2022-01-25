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
    actLoader
} from '../modules/action';
import {
    textObjSelina
} from '../modules/text';
import {
    questMarkObj
} from '../modules/questMark';
import {
    buyTheFood
} from '../modules/functions';
import {
    houseRent
} from '../modules/functions';

function tavernStart() {
    // Если не посетили Фридрика *
    var currentMark = 4;

    tavern.addEventListener('click', function() {
        var currentObj = 0;
        // Если посетили Фридрика добавляем новый пункт в диалоге *
        if (questMarkObj.visitFridrick) {
            var newQuestion = 'Где найти проводника в туманную лощину?';
            var heroQuestionArr = textObjSelina[1].action;
            heroQuestionArr.splice(4, 0, newQuestion);
            currentMark = 5;
        }
        // Вывод локации таверны *
        module_modal.showModal('modal-loc', 'tavern-loc');
        module_dialogue.dialogueEl();
        module_dialogue.dialogueStart({
            textObj: textObjSelina,
            index: 0,
            showTextNpc: true
        });
        // Обработчик списка вопросов игрока *
        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList == 0) {
                    currentObj = 1;
                    module_dialogue.dialogueStart({
                        textObj: textObjSelina,
                        index: currentObj,
                        showTextNpc: true
                    });
                }
                if (clickList == 1) {
                    currentObj = 2;
                    module_dialogue.dialogueStart({
                        textObj: textObjSelina,
                        index: currentObj,
                        showTextNpc: true
                    });
                }
                if (clickList == 2) {
                    var checkRent = questMarkObj.houseRenta;
                    if (!checkRent) {
                        currentObj = 3;
                        module_dialogue.dialogueStart({
                            textObj: textObjSelina,
                            index: currentObj,
                            showTextNpc: true
                        });
                    } else {
                        dialogue.innerHTML = 'Дом уже арендован, можно въезжать ';
                    }
                }
                if (clickList == 3) {
                    module_modal.deleteModal();
                }
                return;
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (clickList != currentMark) {
                    module_dialogue.showAnswear({
                        textObj: textObjSelina,
                        textObjIndex: currentObj,
                        indexList: clickList
                    });
                    if (clickList == 3) {
                        // Добавляем запись в журнал *
                        questAdd({
                            questName: 'Пропавший помощник',
                            questArticle: 'У местного зажиточного крестьянина пропал главный помощник и за расследование этого дела назначена награда. Ферма Фридрика находится на востоке'
                        });
                        gerhard.classList.remove('hide-loc');
                    }
                    if (clickList == 4) {
                        bernard.classList.remove('hide-loc');
                    }
                }

                if (clickList == currentMark) {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjSelina,
                        index: currentObj,
                        showTextNpc: false
                    });
                }
                return;
            }

            // Индекс диалога 2 *
            if (currentObj == 2) {
                if (clickList == 0) {
                    buyTheFood({
                        recoverHP: 50,
                        price: 50,
                        text: '(жаркое восстанавливает 50 здоровья)'
                    });
                }
                if (clickList == 1) {
                    buyTheFood({
                        recoverHP: 25,
                        price: 25,
                        text: '(рыба восстанавливает 25 здоровья)'
                    });
                }
                if (clickList == 2) {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjSelina,
                        index: currentObj,
                        showTextNpc: false
                    });
                }
                return;
            }
            // Индекс диалога 3 *
            if (currentObj == 3) {
                if (clickList == 0) {
                    houseRent({
                        price: 250
                    });
                } else {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjSelina,
                        index: currentObj,
                        showTextNpc: false
                    });
                }
                return;
            }
        }
    });
}

tavernStart();

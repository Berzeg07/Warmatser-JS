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
    textObjGuard
} from '../modules/text';
import {
    questMarkObj
} from '../modules/questMark';

function guardStart() {
    var guardQuest = false;
    guard.addEventListener('click', function() {
        var currentObj = 0;
        var checkGeorgQuest = questMarkObj.georgQuest;
        // Вывод локации Георга *
        module_modal.showModal('modal-loc', 'guard-loc');
        module_dialogue.dialogueEl();
        if (checkGeorgQuest) {
            var questionsArr = textObjGuard[0].action,
                newQuestion = 'У меня есть пропуск',
                checkArr = questionsArr.indexOf(newQuestion);
            if (checkArr == -1) {
                questionsArr.splice(2, 0, newQuestion);
                // questionsArr.pop();
                // questionsArr.push(newQuestion, 'Уйти');
            }
        }
        // Если уже прошли в город *
        if(guardQuest){
            module_dialogue.dialogueStart({
                textObj: textObjGuard,
                index: 2,
                showTextNpc: true
            });
            // Обработчик списка вопросов игрока *
            document.querySelector('.link-list').onclick = function(e) {
                var clickList = module_dialogue.linkTarget(this, e);
                if (clickList == 0) {
                    module_modal.deleteModal();
                }
            }
            return;
        }
        // Если еще не пустили в город *
        module_dialogue.dialogueStart({
            textObj: textObjGuard,
            index: 0,
            showTextNpc: true
        });
        // Добавляем запись в журнал *
        questAdd({
            questName: 'Начало',
            questArticle: 'В Хэртланд не пускают чужаков, нужно найти способ попасть в город'
        });
        // Обработчик списка вопросов игрока *
        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (!checkGeorgQuest) {
                    if (clickList != 2) {
                        module_dialogue.showAnswear({
                            textObj: textObjGuard,
                            textObjIndex: 0,
                            indexList: clickList
                        });
                    } else {
                        module_modal.deleteModal();
                    }
                } else {
                    if (clickList != 2 && clickList != 3) {
                        module_dialogue.showAnswear({
                            textObj: textObjGuard,
                            textObjIndex: 0,
                            indexList: clickList
                        });
                    }
                    if (clickList == 2) {
                        currentObj = 1;
                        module_dialogue.dialogueStart({
                            textObj: textObjGuard,
                            index: 1,
                            showTextNpc: true
                        });
                        guardQuest = true;
                        // Открываем доступные локации города *
                        horinis_loc.classList.remove("hide-loc");
                        // Добавляем запись в журнал *
                        questAdd({
                            questName: 'Начало',
                            questArticle: 'Я смог попасть в Хэртланд, нужно искать работу'
                        });
                    }
                    if (clickList == 3) {
                        module_modal.deleteModal();
                    }
                }
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (clickList == 0) {
                    module_modal.deleteModal();
                }
            }
        }
    });
}

guardStart();

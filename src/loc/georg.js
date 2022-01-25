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
    textObjGeorg
} from '../modules/text';
import {
    questMarkObj
} from '../modules/questMark';

function georgStart() {
    // Сюжетные метки *
    var work = false;
    var endGeorgQuest = false;
    // Вешаем обработчик на кнопку с локацией *
    georg.addEventListener('click', function() {
        var currentObj = 0;
        // Вывод локации Георга *
        module_modal.showModal('modal-loc', 'georg-loc');
        module_dialogue.dialogueEl();
        // Если уже отработали в поле *
        if (work) {
            if (!endGeorgQuest) {
                module_dialogue.dialogueStart({
                    textObj: textObjGeorg,
                    index: 3,
                    showTextNpc: true
                });
                document.querySelector('.link-list').onclick = function(e) {
                    var clickList = module_dialogue.linkTarget(this, e);
                    if (clickList == 0) {
                        module_modal.deleteModal();
                    }
                }
                endGeorgQuest = true;
                // Ставим флаг в объекте квестовых меток *
                questMarkObj.georgQuest = endGeorgQuest;
                // Добавляем запись в журнал *
                questAdd({
                    questName: 'Начало',
                    questArticle: 'Георг предоставил мне пропуск, который поможет пройти в город'
                });
            } else {
                module_dialogue.dialogueStart({
                    textObj: textObjGeorg,
                    index: 4,
                    showTextNpc: true
                });
                document.querySelector('.link-list').onclick = function(e) {
                    var clickList = module_dialogue.linkTarget(this, e);
                    if (clickList == 0) {
                        module_modal.deleteModal();
                    }
                }
            }
            return;
        }
        // Если еще не работали в поле георга *
        module_dialogue.dialogueStart({
            textObj: textObjGeorg,
            index: 0,
            showTextNpc: true
        });
        // Обработчик списка вопросов игрока *
        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList == 0 || clickList == 1) {
                    module_dialogue.showAnswear({
                        textObj: textObjGeorg,
                        textObjIndex: 0,
                        indexList: clickList
                    });
                }
                if (clickList == 3) {
                    module_modal.deleteModal();
                }
                if (clickList == 2) {
                    currentObj = 1;
                    module_dialogue.dialogueStart({
                        textObj: textObjGeorg,
                        index: 1,
                        showTextNpc: true
                    });
                    // Добавляем запись в журнал *
                    questAdd({
                        questName: 'Начало',
                        questArticle: 'В Хэртланд не пускают чужаков, нужно найти способ попасть в город'
                    });
                }
                return;
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (clickList == 0) {
                    currentObj = 2;
                    module_dialogue.dialogueStart({
                        textObj: textObjGeorg,
                        index: 2,
                        showTextNpc: true
                    });
                    // Добавляем запись в журнал *
                    questAdd({
                        questName: 'Начало',
                        questArticle: 'Георг поможет мне пройти в город, если я соберу его урожай'
                    });
                }
                if (clickList == 1) {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjGeorg,
                        index: 0,
                        showTextNpc: false
                    });
                }
                return;
            }
            // Индекс диалога 2 *
            if (currentObj == 2) {
                if (clickList == 0) {
                    module_modal.hideModalInner();
                    module_modal.showModal('modal-loc', 'job-loc', false);
                    actLoader('Работа окончена, можно уходить', 'Ты работаешь в поле');
                    work = true;
                } else {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjGeorg,
                        index: 0,
                        showTextNpc: false
                    });
                }
                return;
            }
        }
    });
}

georgStart();

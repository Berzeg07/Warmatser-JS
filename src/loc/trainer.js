import * as module_modal from '../modules/modal';
import * as module_dialogue from '../modules/dialogue';
import * as module_hero from '../modules/hero';
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
    textObjAndreas
} from '../modules/text';
import {
    questMarkObj
} from '../modules/questMark';
import {
    checkQuestItem
} from '../modules/functions';
import {
    goldTransact
} from '../modules/functions';

function andreasStart() {
    var laresQuestTaken = false;
    var laresQuestEnd = false;
    var trainCount = 0;
    andreas.addEventListener('click', function() {
        var currentObj = 0;
        // Если квест на гражданина взят у Гарольда добавляем новый пункт в вопросах игрока *
        var checkGaroldQuest = questMarkObj.garoldQuest;
        if (checkGaroldQuest && !laresQuestTaken) {
            var newQuestion = 'Ты можешь помочь мне стать гражданином Хэртланда?';
            var heroQuestionArr = textObjAndreas[1].action;
            heroQuestionArr.splice(4, 0, newQuestion);
        }

        // Вывод локации таверны *
        module_modal.showModal('modal-loc', 'andreas-loc');
        module_dialogue.dialogueEl();
        module_dialogue.dialogueStart({
            textObj: textObjAndreas,
            index: currentObj,
            showTextNpc: true
        });

        // Обработчик списка вопросов игрока *
        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (!laresQuestTaken && !laresQuestEnd || laresQuestTaken && laresQuestEnd) {
                    if (clickList == 0) {
                        if (!questMarkObj.trainAndreas) {
                            module_dialogue.showAnswear({
                                textObj: textObjAndreas,
                                textObjIndex: currentObj,
                                indexList: clickList
                            });
                        } else {
                            var checkGold = goldTransact({
                                transactNum: 200,
                                transactType: false
                            });
                            if (checkGold) {
                                if (trainCount < 5) {
                                    module_modal.showModal('modal-loc', 'train-loc', false);
                                    actLoader('Тренировка окончена, урон +1', 'Вы тренеруйтесь');
                                    module_hero.heroStats.heroDamage += 1;
                                    weaponDamage.innerHTML = module_hero.heroStats.heroDamage;
                                    trainCount++;
                                } else {
                                    dialogue.innerHTML = 'Ты уже достаточно силен, мне больше нечему учить тебя';
                                }
                            } else {
                                dialogue.innerHTML = 'Не достаточно монет для тренировки';
                            }
                        }
                    }
                    if (clickList == 1) {
                        currentObj = 1;
                        module_dialogue.dialogueStart({
                            textObj: textObjAndreas,
                            index: currentObj,
                            showTextNpc: false
                        });
                    }
                    if (clickList == 2) {
                        module_modal.deleteModal();
                    }
                    return;
                }
                if (clickList == 0) {
                    module_dialogue.showAnswear({
                        textObj: textObjAndreas,
                        textObjIndex: currentObj,
                        indexList: clickList
                    });
                }
                if (clickList == 1) {
                    currentObj = 1;
                    module_dialogue.dialogueStart({
                        textObj: textObjAndreas,
                        index: currentObj,
                        showTextNpc: false
                    });
                }
                if (clickList == 2) {
                    // Сдача квеста *
                    var check = checkQuestItem({
                        item: [{
                            itemName: 'Хвост крысы',
                            count: 3
                        }, {
                            itemName: 'Шкура варга',
                            count: 2
                        }]
                    });
                    if (check) {
                        currentObj = 2;
                        module_dialogue.dialogueStart({
                            textObj: textObjAndreas,
                            index: currentObj,
                            showTextNpc: true
                        });
                        laresQuestEnd = true;
                        // Отмечаем выполнение кв для доступа к товарам Гарольда *
                        questMarkObj.huntingQuest = laresQuestEnd;
                        // Добавляем запись в журнал *
                        questAdd({
                            questName: 'Гражданин Хэртланда',
                            questArticle: 'Я теперь гражданин Хэртланда'
                        });
                        // Удаляем пункт сдачи задания из объекта *
                        textObjAndreas[0].action.splice(2, 1);
                    } else {
                        dialogue.innerHTML = 'Условие не выполнено';
                    }
                }
                if (clickList == 3) {
                    module_modal.deleteModal();
                }
                return;
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                // Если квест на охоту еще не взят *
                if (checkGaroldQuest && !laresQuestTaken) {
                    if (clickList != 5) {
                        module_dialogue.showAnswear({
                            textObj: textObjAndreas,
                            textObjIndex: currentObj,
                            indexList: clickList
                        });
                        if (clickList == 4) {
                            // Добавляем запись в журнал *
                            questAdd({
                                questName: 'Гражданин Хэртланда',
                                questArticle: 'Андреас готов за меня поручиться, если я выполню его поручение (Добыть 3 хвоста болотной крысы и 2 шкуры варга)'
                            });
                        }
                    }
                    if (clickList == 5) {
                        currentObj = 0;
                        laresQuestTaken = true;
                        heroQuestionArr.splice(4, 1);

                        // Если квест взят добавляем новый пункт в главном меню *
                        var newQuestion_2 = 'Сдать задание (3 хвоста крысы, 2 шкуры варга)';
                        var heroQuestionArr_2 = textObjAndreas[0].action;
                        heroQuestionArr_2.splice(2, 0, newQuestion_2);

                        module_dialogue.dialogueStart({
                            textObj: textObjAndreas,
                            index: currentObj,
                            showTextNpc: false
                        });
                    }
                    return;
                }
                if (clickList != 4) {
                    module_dialogue.showAnswear({
                        textObj: textObjAndreas,
                        textObjIndex: currentObj,
                        indexList: clickList
                    });
                } else {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjAndreas,
                        index: currentObj,
                        showTextNpc: false
                    });
                }
                return;
            }
            // Индекс диалога 2 *
            if (currentObj == 2) {
                if (clickList == 0) {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjAndreas,
                        index: currentObj,
                        showTextNpc: false
                    });
                }
            }
        }
    });
}

andreasStart();

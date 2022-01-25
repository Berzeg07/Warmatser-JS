import * as module_modal from '../modules/modal';
import * as module_dialogue from '../modules/dialogue';
import * as module_hero from '../modules/hero';
import * as module_seller from '../modules/seller';

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
    textObjGarold
} from '../modules/text';
import {
    questMarkObj
} from '../modules/questMark';
import {
    findWithKey
} from '../modules/functions';

function forgeStart() {
    var garoldQuestTaken = false;
    // Проверка наличия материала для ковки *
    function checkItems() {
        var horn = findWithKey(module_hero.invItems, 'nameItem', 'Рог мракориса');
        var metal = findWithKey(module_hero.invItems, 'nameItem', 'Слиток стали');

        if (horn == -1 || metal == -1) {
            dialogue.innerHTML = 'Не хватает материалов для ковки';
            return false;
        } else {
            return true;
        }
    }
    // Кнопка на глобальной карте *
    garold.addEventListener('click', function() {
        var currentObj = 0;
        // Вывод локации *
        module_modal.showModal('modal-loc', 'garold-loc');
        module_dialogue.dialogueEl();
        module_dialogue.dialogueStart({
            textObj: textObjGarold,
            index: 0,
            showTextNpc: true
        });
        // Обработчик списка вопросов игрока *
        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList == 0) {
                    if (questMarkObj.huntingQuest) {
                        module_seller.showProductList({
                            productObj: module_seller.forgeProduct
                        });
                        // Кнопка купить *
                        var buyBtn = document.querySelector('.buy_btn');
                        buyBtn.addEventListener('click', function() {
                            var horn = findWithKey(module_hero.invItems, 'nameItem', 'Рог мракориса');
                            var metal = findWithKey(module_hero.invItems, 'nameItem', 'Слиток стали');
                            // Если не хватает предметов для ковки *
                            if (horn == -1 || metal == -1) {
                                dialogue.innerHTML = 'Не хватает материалов для ковки';
                                return;
                            }
                            // Уменьшаем счетчик предмета игрока *
                            module_hero.invItems[horn].countItem -= 1;
                            module_hero.invItems[metal].countItem -= 1;
                            // Если счетчик на 0, удаляем предмет из массива игрока *
                            if (module_hero.invItems[horn].countItem == 0) {
                                module_hero.invItems.splice(horn, 1);
                            }
                            // Если счетчик на 0, удаляем предмет из массива игрока. Повторно определяем индекс, так как индекс элемента сместился в массиве *
                            metal = findWithKey(module_hero.invItems, 'nameItem', 'Слиток стали');
                            if (module_hero.invItems[metal].countItem == 0) {
                                module_hero.invItems.splice(metal, 1);
                            }
                            // Обновляем список предметов *
                            module_hero.inventoryList(module_hero.invItems, 'inventory', 'hero_item');
                            // Кнопка продать (Будет удалена если нет предметов) *
                            if (module_hero.invItems.length == 0) {
                                var sellBtn = document.querySelector('.sell_btn');
                                sellBtn.remove();
                            }
                            // Покупка предмета *
                            module_seller.buyBtn({
                                productObj: module_seller.forgeProduct
                            });
                        });
                        return;
                    }
                    // Если кв на гражданина еще не выполнено *
                    module_dialogue.showAnswear({
                        textObj: textObjGarold,
                        textObjIndex: currentObj,
                        indexList: clickList
                    });
                    // Получаем кв на гражданина и добавляем новые пункты в диалоге *
                    if (!garoldQuestTaken) {
                        var newQuestion = ['Что нужно сделать, чтобы стать гражданином?', 'Ты можешь за меня поручиться?'];
                        var heroQuestionArr = textObjGarold[1].action;
                        heroQuestionArr.splice(3, 0, ...newQuestion);
                        // Добавляем запись в журнал *
                        questAdd({
                            questName: 'Гражданин Хэртланда',
                            questArticle: 'Гарольд изготовит мне особое оружие если я стану гражданином города. Чтобы стать гражданином, кто то из влиятельных жителей города должен за меня поручиться'
                        });
                        garoldQuestTaken = true;
                        questMarkObj.garoldQuest = garoldQuestTaken;
                    }
                }
                if (clickList == 1) {
                    currentObj = 1;
                    module_dialogue.dialogueStart({
                        textObj: textObjGarold,
                        index: currentObj,
                        showTextNpc: true
                    });
                }
                if (clickList == 2) {
                    module_modal.deleteModal();
                }
                return;
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (!garoldQuestTaken) {
                    if (clickList != 3) {
                        module_dialogue.showAnswear({
                            textObj: textObjGarold,
                            textObjIndex: currentObj,
                            indexList: clickList
                        });
                    } else {
                        currentObj = 0;
                        module_dialogue.dialogueStart({
                            textObj: textObjGarold,
                            index: currentObj,
                            showTextNpc: false
                        });
                    }
                } else {
                    if (clickList != 5) {
                        module_dialogue.showAnswear({
                            textObj: textObjGarold,
                            textObjIndex: currentObj,
                            indexList: clickList
                        });
                    } else {
                        currentObj = 0;
                        module_dialogue.dialogueStart({
                            textObj: textObjGarold,
                            index: currentObj,
                            showTextNpc: false
                        });
                    }
                }
                return;
            }
        }
    });
}

forgeStart();

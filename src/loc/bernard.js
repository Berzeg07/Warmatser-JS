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
    textObjBernard
} from '../modules/text';
import {
    questMarkObj
} from '../modules/questMark';
import {
    goldTransact
} from '../modules/functions';

function bernardStart() {
    bernard.addEventListener('click', function() {
        var currentObj = 0;

        // Вывод локации бернарда *
        module_modal.showModal('modal-loc', 'bernard-loc');
        module_dialogue.dialogueEl();
        module_dialogue.dialogueStart({
            textObj: textObjBernard,
            index: currentObj,
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
                        textObj: textObjBernard,
                        index: currentObj,
                        showTextNpc: true
                    });
                } else if (clickList == 1) {
                    if (!questMarkObj.haveMap) {
                        var goldCheck = goldTransact({
                            transactNum: 150,
                            transactType: false
                        });
                        if (goldCheck) {
                            dialogue.innerHTML = 'Карта куплена, теперь можно безопасно пройти в туманную лощину';
                            questMarkObj.haveMap = true;
                        } else {
                            dialogue.innerHTML = 'Не достаточно монет для покупки';
                        }
                    } else {
                        dialogue.innerHTML = 'Карта уже куплена';
                    }
                } else {
                    module_modal.deleteModal();
                }
                return;
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (clickList != 3) {
                    module_dialogue.showAnswear({
                        textObj: textObjBernard,
                        textObjIndex: currentObj,
                        indexList: clickList
                    });
                } else {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjBernard,
                        index: currentObj,
                        showTextNpc: false
                    });
                }
            }
        }
    });
}

bernardStart();

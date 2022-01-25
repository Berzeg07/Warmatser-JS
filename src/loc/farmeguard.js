import * as module_modal from '../modules/modal';
import * as module_dialogue from '../modules/dialogue';
import * as module_battle from '../modules/battle';
import * as module_hero from '../modules/hero';
import {
    enemyObj
} from '../modules/enemies';
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
    textObjGerhard
} from '../modules/text';
import {
    questMarkObj
} from '../modules/questMark';
import {
    goldTransact
} from '../modules/functions';
import {
    getAttr
} from '../modules/functions';


function gerhardStart() {
    // Битва с Герхардом *
    function gerhardBattle() {
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'fridrick_farm-loc', false);
        module_battle.battleContent({
            heroObj: module_hero.heroStats,
            enemyObj: enemyObj.gerhard,
            retreat: false
        });
        var atackBtn = document.querySelector('.atack');
        atackBtn.addEventListener('click', function() {
            var attr = getAttr('[key]', 'key');
            module_battle.battle({
                heroObj: module_hero.heroStats,
                enemyObj: enemyObj[attr]
            });
            var fightResult = module_battle.battleResult({
                enemyObj: enemyObj.gerhard
            });
            if (fightResult != undefined) {
                module_battle.battleResultShow({
                    buttonClass: 'modal-close_btn',
                    buttonText: 'Уйти'
                });
                if (!fightResult) {
                    battle_mess.innerHTML = 'Герхард избил тебя и искупал в помойной яме';

                } else {
                    var text = 'Ты навалял Герхарду по полной программе';
                    if (payGerhard) {
                        text = 'Ты навалял Герхарду по полной программе и вернул свои 100 монет';
                        var refundGold = goldTransact({
                            transactNum: 100,
                            transactType: true
                        });
                    }
                    battle_mess.innerHTML = text;
                    wonGerhard = true;
                }
                module_hero.heroUpdate();
            }
        });
    }
    // true если уже победили Герхарда в бою *
    var wonGerhard = false,
        payGerhard = false;
    gerhard.addEventListener('click', function() {
        var currentObj = 0;
        // Вывод локации *
        module_modal.showModal('modal-loc', 'gerhard-loc', true);

        module_dialogue.dialogueEl();

        if (wonGerhard) {
            module_dialogue.dialogueStart({
                textObj: textObjGerhard,
                index: 2,
                showTextNpc: true
            });
            document.querySelector('.link-list').onclick = function(e) {
                var clickList = module_dialogue.linkTarget(this, e);
                if (clickList == 0) {
                    module_modal.deleteModal();
                    job.classList.remove("hide-loc");
                    fridrick.classList.remove("hide-loc");
                }
            }
            return;
        }

        if (payGerhard) {
            module_dialogue.dialogueStart({
                textObj: textObjGerhard,
                index: 3,
                showTextNpc: true
            });
            document.querySelector('.link-list').onclick = function(e) {
                var clickList = module_dialogue.linkTarget(this, e);
                if (clickList == 0) {
                    gerhardBattle();
                }
                if (clickList == 1) {
                    module_modal.deleteModal();
                }
            }
            return;
        }

        module_dialogue.dialogueStart({
            textObj: textObjGerhard,
            index: 0,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList == 0) {
                    module_dialogue.showAnswear({
                        textObj: textObjGerhard,
                        textObjIndex: currentObj,
                        indexList: clickList
                    });
                } else if (clickList == 1) {
                    module_dialogue.dialogueStart({
                        textObj: textObjGerhard,
                        index: 1,
                        showTextNpc: true
                    });
                    currentObj = 1;
                } else {
                    module_modal.deleteModal();
                }
                return;
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (clickList == 0) {
                    var transact = goldTransact({
                        transactNum: 100,
                        transactType: false
                    });
                    if (!transact) {
                        module_dialogue.dialogueStart({
                            textObj: textObjGerhard,
                            index: 4,
                            showTextNpc: true
                        });
                        currentObj = 4;
                    } else {
                        payGerhard = true;
                        currentObj = 5;
                        module_dialogue.dialogueStart({
                            textObj: textObjGerhard,
                            index: currentObj,
                            showTextNpc: true
                        });
                        job.classList.remove("hide-loc");
                        fridrick.classList.remove("hide-loc");
                    }
                }
                if (clickList == 1) {
                    // Битва с Герхардом *
                    gerhardBattle();
                }
                if (clickList == 2) {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjGerhard,
                        index: currentObj,
                        showTextNpc: false
                    });
                }
                return;
            }

            // Индекс диалога 4,5*
            if (currentObj == 4 || currentObj == 5) {
                if (clickList == 0) {
                    module_modal.deleteModal();
                }
            }
        }
    });
}

gerhardStart();

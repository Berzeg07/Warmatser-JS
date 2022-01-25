import * as module_hero from '../modules/hero';
import * as module_battle from '../modules/battle';
import {
    showModal
} from '../modules/modal';
import {
    getAttr
} from '../modules/functions';
import {
    enemyObj
} from '../modules/enemies';

function forestBattle() {
    var forest = document.querySelectorAll('.forest-battle');
    for (var i = 0; i < forest.length; i++) {
        forest[i].addEventListener('click', function() {
            showModal('modal-loc', 'forest-loc', true);
            var enemy = this.id;
            module_battle.battleContent({
                heroObj: module_hero.heroStats,
                enemyObj: enemyObj[enemy],
                retreat: true
            });
            var atackBtn = document.querySelector('.atack');
            atackBtn.addEventListener('click', function() {
                var attr = getAttr('[key]', 'key');
                module_battle.battle({
                    heroObj: module_hero.heroStats,
                    enemyObj: enemyObj[attr]
                });
                var fightResult = module_battle.battleResult({
                    enemyObj: enemyObj[attr]
                });
                if (fightResult != undefined) {
                    module_battle.battleResultShow({
                        buttonClass: 'modal-close_btn',
                        buttonText: 'Уйти'
                    });
                    var lossHeroWeapon = module_battle.lossWeapon({
                        battleResult: fightResult
                    });
                    module_battle.battleResultText({
                        fightResult: fightResult,
                        enemyObj: enemyObj[attr],
                        lossWeapon: lossHeroWeapon,
                        resTextObj: module_battle.battleResObj
                    });
                }
                console.log('Враг: ' + enemyObj[attr].hitPoint);
                console.log('Герой: ' + module_hero.heroStats.heroHP);
                console.log(fightResult);
            });
        });
    }
}
forestBattle();

// document.addEventListener('click', function(e) {
//     if (e.target.classList.contains("atack")) {
//         var attr = getAttr('[key]', 'key');
//         module_battle.battle({
//             heroObj: module_hero.heroStats,
//             enemyObj: enemyObj[attr]
//         });
//         var fightResult = module_battle.battleResult({
//             enemyObj: enemyObj[attr]
//         });
//         if (fightResult != undefined) {
//             module_battle.battleResultShow({
//                 buttonClass: 'modal-close_btn',
//                 buttonText: 'Уйти'
//             });
//             var lossHeroWeapon = module_battle.lossWeapon({
//                 battleResult: fightResult
//             });
//             module_battle.battleResultText({
//                 fightResult: fightResult,
//                 enemyObj: enemyObj[attr],
//                 lossWeapon: lossHeroWeapon,
//                 resTextObj: module_battle.battleResObj
//             });
//         }
//         console.log('Враг: ' + enemyObj[attr].hitPoint);
//         console.log('Герой: ' + module_hero.heroStats.heroHP);
//         console.log(fightResult);
//     }
// });

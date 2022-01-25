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
    textObjFoggyHollowStart
} from '../modules/text';
import {
    textObjFinal
} from '../modules/text';
import {
    textObjFinalBad
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

function foggyHollowStart() {
    var orkDefeat = false;
    var meetOrk = false;

    var goodEndingText = `
        <p>Вы быстро собрали пожитки и выдвинулись к условленному месту для встречи с проводником. На месте уже ожидал проводник и это был тот самый Бернард, у которого ты купил карту топей.</p>
        <p>Дальше путь лежал через глубь болот. Через смертельные топи Бернард вел вас уверенно, пока вы не вышли из леса с южной стороны, к отдаленной части острова. Там на причале стояла не большая посудина с большим парусом.</p>
        <p>Оказалось, что Бернард тоже был в деле, это был их общий план по спасению из обреченного Хэртланда. Андреас был прав, через месяц, когда орки нагрянули в долину город быстро пал под натиском врага. Неизвестно смог ли покинть остров сам Андреас, как он и планировал, и что стало с Фридриком, не мог же он просто сидеть и дожидаться гибели, но это уже совсем другая история.</p>
        <p>В этом приключении ты остался жив сделав правильный выбор. Ты выкарабкался из трудной ситуации и обрел достойных друзей. На этом игра окончена, удачи игрок!</p>`;

    var defeatDjerard = `
        <p>Джерард нанес завершающий удар в сердце убийце Рунольва, выдернул меч и в гневе нанес еще один удар пронзив бездыханного врага насквозь. После чего он вернулся к телу своего друга и опустился рядом с ним на колени. Джерард выдернул кинжал из глаза Рунольва и откинул в сторону, он похоронил друга под тенью большого дерева и некотрое время стоял над могилой в удручающем молчании.</p>
        <p>- Спи спокойно друг мой, - сказал Джерард и покинул место битвы.</p>
        <p>Джерард встретился с проводником в условленном месте. Проводника звали Бернард, тот самый, что торговал картами лощины, он ждал двоих, но увидев мрачное лицо Джерарда понял все без слов.</p>
        <p>Они продолжили путь в глубь болот по тайным тропам, которые знал только Бернард, и через некоторое время вышли к берегу. Там стояла не большая галера, Джерард с Бернардом взошли на борт и отплыли к континенту.</p>
        <p>В этой истории ты сделал не верный выбор и потерпел неудачу, можешь попробовать начать игру заново и на этот раз сделать правильный выбор. Удачи игрок!</p>
    `;

    var badEndingtext = `
        <p>Бернард шел быстрым шагом, он опаздывал к условленному времени. Рунольв и Джерард ждали его в топях, только Бернард знал топь вдоль и поперек, чтобы провести их по тайной тропе и вывести с южной стороны болот. За это он получит 2000 золотых и судно на континент</p>

        <p>Бернард углубился в топь и остановился в оцепенении возле старой хижины. На траве лежало обезглавленное тело. Бернард узнал его, отпетый убийца Фридрика. Пройдя чуть дальше Бернард обнаружил еще одно тело под деревом. Воин сжимавший рукоять меча сидел на земле, прислонившись спиной к дереву, другой рукой он прижимал страшную рану в шее. Он весь истек кровью, его голова была низко опущена, воин был мертв. Бернард узнал его, это был тот кому он продал карту топей! Не повезло бедняге. Осмотрев тело, Бернард обнаружил сундук с кучей золота и он знал откуда эта все. Рунольв и Джерард были мертвы, как и тот кто забрал у них это золото!</p>

        <p>В такой ситуации Бернард долго думать не стал, он спешно прошел вглубь леса через болота по знакомым безопасным тропам и вышел на берег отдаленной части острова. На берегу стояла не большая посудина с парусом и веслами, которую Бернард пришвартовал сюда два дня назад. Он сел в нее и взял курс на континент, плыть всего полтора дня.</p>

        <p>У Бернарда теперь много денег, он в мыслях попращался со старой жизнью проводника, построит дом на континенте и заживет новой счастливой жизнью. Так закончилась это приключение игрок, к сожалению ты погиб в этой истории, возможно если бы ты сделал другой выбор, твоя судьба могла сложиться по другому...</p>
    `;

    // Первая концовка *
    function gameEnding(text) {
        module_modal.hideModalInner();
        // Выводим стартовое окно *
        var classArr = ['modal', 'modal-show', 'journal'];
        // Формируем разметку стартого окна *
        var journalElem = new elemConstruct({
            elemParent: '#cont',
            elemClass: classArr,
            elemTag: 'div',
            elemInner: `
                <p class="journal-title">Эпилог</p>
                <div class="begin-img"><img src="img/bg-main.jpg"></div>
                <div class="start-article">
                    ${text}
                </div>
                <div class="button-box" style="text-align:center;"></div>
            `
        });
        // Добавляем созданный элемент в разметку *
        journalElem.addElem();
        // Кнопка Далее *
        var start = new btnConstruct({
            btnClass: 'end-game',
            btnText: 'Начать заново',
            btnParent: '.button-box'
        });
        start.createBtn();
        var btnReload = document.querySelector('.end-game');
        btnReload.addEventListener('click', function() {
            window.location.reload();
        });
        // Включаем затемнение фона *
        module_modal.overlayShow();
    }

    // Вторая концовка *
    function badEnding() {
        var currentObj = 0;
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'kill-runolv', false);

        module_dialogue.dialogueEl();

        module_dialogue.dialogueStart({
            textObj: textObjFinalBad,
            index: currentObj,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList == 0) {
                    djerardBattle();
                }
            }
        }
    }

    // Встреча с убийцей *
    function killer() {
        var currentObj = 2;
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'killer-loc', false);

        module_dialogue.dialogueEl();

        module_dialogue.dialogueStart({
            textObj: textObjFinalBad,
            index: currentObj,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            killerBattle();
        }
    }

    function hutInner() {
        var currentObj = 4;
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'house_inner-loc', false);

        module_dialogue.dialogueEl();

        module_dialogue.dialogueStart({
            textObj: textObjFinalBad,
            index: currentObj,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            killer();
        }
    }

    // Победа над Джерардом *
    function killDjerard() {
        var currentObj = 1;
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'djerard-die-loc', false);

        module_dialogue.dialogueEl();

        module_dialogue.dialogueStart({
            textObj: textObjFinalBad,
            index: currentObj,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            // var clickList = module_dialogue.linkTarget(this, e);
            hutInner();
            // killer();
        }
    }

    // Победа над убийцей, конец игры *
    function defeatKiller() {
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'hero-die', false);
        module_dialogue.dialogueEl();

        module_dialogue.dialogueStart({
            textObj: textObjFinalBad,
            index: 3,
            showTextNpc: true
        });
        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            gameEnding(badEndingtext);
        }
    }

    // Битва с Убийцей *
    function killerBattle() {
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'hollow-loc', false);
        module_battle.battleContent({
            heroObj: module_hero.heroStats,
            enemyObj: enemyObj.killer,
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
                enemyObj: enemyObj.killer
            });
            if (fightResult != undefined) {
                defeatKiller();
            }
        });
    }

    // Битва с Джеардом *
    function djerardBattle() {
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'hollow-loc', false);
        module_battle.battleContent({
            heroObj: module_hero.heroStats,
            enemyObj: enemyObj.djerard,
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
                enemyObj: enemyObj.djerard
            });
            if (fightResult != undefined) {
                module_battle.battleResultShow({
                    buttonClass: 'next-action',
                    buttonText: 'Далее'
                });
                var btnNext = document.querySelector('.next-action');
                if (!fightResult) {
                    battle_mess.innerHTML = 'Джерард оказался сильнее, неожиданным и быстрым ударом он ранил тебя в бок, ты проиграл эту битву';
                    btnNext.addEventListener('click', function() {
                        gameEnding(defeatDjerard);
                    });
                } else {
                    battle_mess.innerHTML = 'Джерард оказался хорошим воином, но не достаточно сильным, чтобы победить тебя, ты выиграл эту схватку';
                    btnNext.addEventListener('click', function() {
                        killDjerard();
                    });
                }
            }
        });
    }

    // Битва с Орком *
    function orkBattle() {
        meetOrk = true;
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'cave-loc', false);
        module_battle.battleContent({
            heroObj: module_hero.heroStats,
            enemyObj: enemyObj.ork,
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
                enemyObj: enemyObj.ork
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
            if (fightResult) {
                orkDefeat = true;
            }
        });
    }
    // Финальные сцены *
    function finalAction() {
        var currentObj = 0;

        module_modal.showModal('modal-loc', 'final-loc', false);
        module_dialogue.dialogueEl();

        module_dialogue.dialogueStart({
            textObj: textObjFinal,
            index: currentObj,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList == 3) {
                    currentObj = 2;
                    module_dialogue.dialogueStart({
                        textObj: textObjFinal,
                        index: currentObj,
                        showTextNpc: true
                    });
                    return;
                }
                if (clickList == 4) {
                    currentObj = 1;
                    module_dialogue.dialogueStart({
                        textObj: textObjFinal,
                        index: currentObj,
                        showTextNpc: true
                    });
                    return;
                }
                module_dialogue.showAnswear({
                    textObj: textObjFinal,
                    textObjIndex: currentObj,
                    indexList: clickList
                });
                return;
            }
            // Индекс диалога 1 *
            if (currentObj == 1) {
                if (clickList == 0) {
                    // module_modal.deleteModal();
                    gameEnding(goodEndingText);
                    return;
                }
                // Плохая концовка *
                badEnding();
            }
            // Индекс диалога 2 *
            if (currentObj == 2) {
                if (clickList == 3) {
                    currentObj = 0;
                    module_dialogue.dialogueStart({
                        textObj: textObjFinal,
                        index: currentObj,
                        showTextNpc: false
                    });
                    return;
                }
                module_dialogue.showAnswear({
                    textObj: textObjFinal,
                    textObjIndex: currentObj,
                    indexList: clickList
                });
            }
        }
    }

    // Пещера с орком *
    function orcCave() {
        module_modal.hideModalInner();
        module_modal.showModal('modal-loc', 'cave-loc', false);
        module_dialogue.dialogueEl();

        var currentObj = 1;
        module_dialogue.dialogueStart({
            textObj: textObjFoggyHollowStart,
            index: currentObj,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            orkBattle();
        }
    }

    hollow.addEventListener('click', function() {
        var currentObj = 0;
        // Если победил Орка *
        if (orkDefeat) {
            currentObj = 2;
            module_modal.showModal('modal-loc', 'hollow-hut', false);
        } else {
            module_modal.showModal('modal-loc', 'hollow-loc', false);
        }
        // Если уже бились с орком, но еще не победил *
        if (meetOrk && !orkDefeat) {
            orkBattle();
            return;
        }

        module_dialogue.dialogueEl();

        module_dialogue.dialogueStart({
            textObj: textObjFoggyHollowStart,
            index: currentObj,
            showTextNpc: true
        });

        document.querySelector('.link-list').onclick = function(e) {
            var clickList = module_dialogue.linkTarget(this, e);
            // Индекс диалога 0 *
            if (currentObj == 0) {
                if (clickList == 0) {
                    if (questMarkObj.haveMap) {
                        orcCave();
                    } else {
                        dialogue.innerHTML = 'Ты угодил в трясину и едва не захлебнулся, здоровье на минимуме';
                        module_hero.heroStats.heroHP = 1;
                        module_hero.heroUpdate();
                    }
                } else {
                    module_modal.deleteModal();
                }
                return;
            }

            // Индекс диалога 2 *
            if (currentObj == 2) {
                finalAction();
            }
        }
    });
}

foggyHollowStart();

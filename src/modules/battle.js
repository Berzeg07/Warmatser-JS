import * as module_modal from '../modules/modal';
import * as module_hero from '../modules/hero';
import {
    btnConstruct
} from '../modules/construct';
import {
    elemConstruct
} from '../modules/construct';
import {
    findWithKey
} from '../modules/functions';
import {
    enemyObj
} from '../modules/enemies';

// Контет окна боя *
export function battleContent({
    heroObj,
    enemyObj,
    retreat
}) {
    // Возвращаем исходное хначение хитпоинтам врага *
    enemyObj.hitPoint = 100;
    // Объект с разметкой оружия *
    var battleItemObj = [{
            name: 'Пластинчатый доспех',
            tag: '<div class="hero-armor heavy-armor heavy-armor_battle"></div>'
        },
        {
            name: 'Дубинка',
            tag: '<div class="hero-weapon club club_battle"></div>'
        },
        {
            name: 'Кожаная броня',
            tag: '<div class="hero-armor leather-armor leather-armor_battle"></div>'
        },
        {
            name: 'Полуторный меч',
            tag: '<div class="hero-weapon sword sword_battle"></div>'
        },
        {
            name: 'Сокрушитель',
            tag: '<div class="hero-weapon axe axe_battle"></div>'
        },
        {
            name: 'Меч Беллиара',
            tag: '<div class="hero-weapon destroyer destroyer_battle"></div>'
        },
        {
            name: 'Панцирь Дракона',
            tag: '<div class="hero-armor dragon-armor dragon-armor_battle"></div>'
        }
    ];

    // Разметка битвы *
    var dialogueBox = new elemConstruct({
        elemParent: '.modal-inner',
        elemClass: 'battle-block',
        elemTag: 'div',
        elemInner: `
        <div class="modal-inner_item">
            <div class="modal-hero">
                <div class="modal-hero_inner">
                    ${heroObj.heroIMG}
                </div>
            </div>
            ${enemyObj.image}
            <div class="battle-options">
                <div class="battle-options_inner battle-options_action"></div>
                <div class="battle-options_flex">
                    <div class="battle-options_inner">
                        <ul class="battle-list">
                            <li><p class="battle-list_title">${heroObj.heroName}</p></li>
                            <li>
                                <b>Урон:</b>
                                <span>${heroObj.heroDamage}</span>
                            </li>
                            <li>
                                <b>Броня:</b>
                                <span>${heroObj.heroArmor}</span>
                            </li>
                            <li>
                                <b>Крит:</b>
                                <span>${heroObj.heroCrit + '%'}</span>
                            </li>
                            <li>
                                <b>Здоровье:</b>
                                <span id='battleHP'>${heroObj.heroHP}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="battle-options_inner">
                        <ul class="battle-list">
                            <li><p class="battle-list_title">${enemyObj.name}</p></li>
                            <li>
                                <b>Урон:</b>
                                <span>???</span>
                            </li>
                            <li>
                                <b>Броня:</b>
                                <span>???</span>
                            </li>
                            <li>
                                <b>Крит:</b>
                                <span>???</span>
                            </li>
                            <li>
                                <b>Здоровье:</b>
                                <span>???</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            `
    });
    // Добавляем созданный элемент в разметку *
    dialogueBox.addElem();

    // Оружие героя *
    var heroWeapon = heroObj.heroWeapon;
    // Броня героя *
    var heroArmor = heroObj.heroEquip;
    // Вывод экипировки *
    function equipShow(item, itemIndex) {
        var equipIMG = document.querySelector('.modal-hero_inner'),
            elArmor = document.createElement("div");
        item = battleItemObj[itemIndex].tag;
        elArmor.innerHTML = item;
        equipIMG.appendChild(elArmor);
    }
    // Получаем разметку оружия *
    var indexWeapon = findWithKey(battleItemObj, 'name', heroWeapon);
    if (indexWeapon != -1) {
        equipShow(heroWeapon, indexWeapon);
    }
    // Получаем разметку Брони *
    var indexArmor = findWithKey(battleItemObj, 'name', heroArmor);
    if (indexArmor != -1) {
        equipShow(heroArmor, indexArmor);
    }

    // Кнопка атаки *
    var atackButton = new btnConstruct({
        btnClass: 'atack',
        btnText: 'Атаковать',
        btnParent: '.battle-options_action'
    });
    atackButton.createBtn();

    // Кнопка отступить, если параметр true *
    if (retreat) {
        var leaveLoc = new btnConstruct({
            btnClass: 'modal-close_btn',
            btnText: 'Отступить',
            btnParent: '.battle-options_action'
        });
        leaveLoc.createBtn();
    }
}

// Атака *
export function battle({
    heroObj,
    enemyObj
}) {
    // Характеристики героя *
    var heroDamage = heroObj.heroDamage,
        heroHP = heroObj.heroHP,
        heroArmor = heroObj.heroArmor,
        heroCrit = heroObj.heroCrit,
        heroWeapon = heroObj.heroWeapon,
        heroEquip = heroObj.heroEquip;
    // Характеристики врага *
    // Снижаем атаку на показатель брони героя *
    var enemyDamage = enemyObj.damage - heroObj.heroArmor,
        enemyHP = enemyObj.hitPoint,
        enemyArmor = enemyObj.armor,
        enemyCrit = enemyObj.crit;
    // Имя врага *
    var enemyName = enemyObj.name;
    // Вероятность критического удара, диапазон от 1 до 100 *
    function CritChance() {
        var rand = 1 - 0.5 + Math.random() * (100 - 1 + 1)
        rand = Math.round(rand);
        return rand;
    }
    var heroCritChance = CritChance(),
        enemyCritChance = CritChance();
    // Если попадаем в диапазон увеличиваем силу атаки вдвое *
    if (heroCritChance <= heroCrit) {
        heroDamage = heroDamage * 2;
    }
    if (enemyCritChance <= enemyCrit) {
        enemyDamage = enemyDamage * 2;
    }
    // Вычитываем урон врагу *
    enemyHP = enemyHP - heroDamage;
    // Вычитываем урон герою *
    heroHP = heroHP - enemyDamage;
    // Минимальный порог здоровья героя единица *
    if (heroHP < 1) {
        heroHP = 1;
    }
    enemyObj.hitPoint = enemyHP;
    module_hero.heroStats.heroHP = heroHP;
    battleHP.innerHTML = heroHP;
    module_hero.heroUpdate();
}

// Результат боя, возвращаем true/false *
export function battleResult({
    enemyObj
}) {
    var winner;
    // Победа *
    if (enemyObj.hitPoint <= 0) {
        // Запрещаем отрицательное значение *
        enemyObj.hitPoint = 0;
        winner = true;
        return winner;
    }
    // Поражение *
    if (module_hero.heroStats.heroHP <= 1) {
        // Минимальный порог ХП героя единица *
        module_hero.heroStats.heroHP = 1;
        winner = false;
        return winner;
    }
}

// Вывод итога боя *
export function battleResultShow({
    buttonClass,
    buttonText
}) {
    var resultBlock = new elemConstruct({
        elemParent: '.battle-block',
        elemClass: ['overlay-battle','overlay-battle_show'],
        elemTag: 'div',
        elemInner: `
            <div class="battle-result">
                <p id="battle_mess"></p>
                <div class="btn-block" id="btn_block"></div>
            </div>
         `
    });
    // Добавляем созданный элемент в разметку *
    resultBlock.addElem();
    // Кнопка выхода после результата боя *
    var runaway = new btnConstruct({
        btnClass: buttonClass,
        btnText: buttonText,
        btnParent: '#btn_block'
    });
    runaway.createBtn();
}

// Текст итога боя *
export var battleResObj = {
    win: 'Ты победил',
    loss: 'Поражение! Ты тяжело ранен и чудом сумел скрыться '
};

// Итог боя *
export function battleResultText({
    fightResult,
    enemyObj,
    lossWeapon,
    resTextObj,
}) {
    // console.log(lossWeapon);
    var resText;
    if (fightResult) {
        resText = resTextObj.win;
        // Проверяем наличие охотничьего ножа у героя *
        var checkKnife = findWithKey(module_hero.invItems, 'nameItem', 'Охотничий нож');
        // Проверяем наличие лута у монстра *
        var lootItem = enemyObj.item;
        // Проверяем возможность лута *
        if (enemyObj != false && checkKnife != -1 && lootItem != undefined) {
            // Название лута *
            var loot = enemyObj.item.nameItem;
            // Проверяем наличие лута у героя *
            var checkLoot = findWithKey(module_hero.invItems, 'nameItem', loot);
            if (checkLoot != -1) {
                // Если такой лут имеется увеличиваем счетчик *
                module_hero.invItems[checkLoot].countItem += 1;
            } else {
                // Если такого лута нет, клонируем объект и добавляем в объект героя *
                var clone = {};
                // Клонируем добычу в аустой объект *
                for (var key in enemyObj.item) {
                    clone[key] = enemyObj.item[key];
                }
                // Добавляем предмет в инвентарь героя *
                module_hero.invItems.push(clone);
            }
            // Выводим результат о добыче *
            battle_mess.innerHTML = resText + ' (Добыча: ' + loot + ')';
            return;
        }
    } else {
        if (lossWeapon) {
            resText = resTextObj.loss + 'бросив свое оружие';
        } else {
            resText = resTextObj.loss;
        }
    }
    // var battleRes = document.querySelector('.overlay-battle');
    // battleRes.classList.add('overlay-battle_show');
    // Обновляем панель героя на карте *
    module_hero.heroUpdate();
    // Выводим результат если нет лута *
    battle_mess.innerHTML = resText;
}

// Потеря оружия при поражении *
export function lossWeapon({
    battleResult
}) {
    if (!battleResult) {
        var heroWeapon = module_hero.heroStats.heroWeapon,
            heroWeaponIndex = findWithKey(module_hero.invItems, 'nameItem', heroWeapon);
        if (heroWeaponIndex != -1) {
            // Удаляем оружие из рук героя *
            module_hero.heroStats.heroWeapon = 'Пусто';
            // Возвращаем исходную характеристику урона *
            module_hero.heroStats.heroDamage -= module_hero.invItems[heroWeaponIndex].propertiesItem;
            // Удаляем предмет из объекта героя *
            module_hero.invItems.splice(heroWeaponIndex, 1);
            return true;
        } else {
            return false;
        }
    }
    return false;
}

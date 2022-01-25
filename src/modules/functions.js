import * as module_hero from './hero';
import {
    questMarkObj
} from './questMark';
// Определяем индекс объекта в массиве по заданному ключу. Первым параметром передаем массив, где осуществляем поиск, второй параметр ключ, который ищем, третий значение этого ключа *
export function findWithKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return i;
        }
    }
    return -1;
}

// Получаем атрибут *
export function getAttr(element, attr) {
    var elem = document.querySelector(element),
        attr = elem.getAttribute(attr);
    return attr;
}

// Восстановление здоровья *
export function buyTheFood({
    recoverHP,
    price,
    text
}) {
    var heroHp = module_hero.heroStats.heroHP;
    if (module_hero.heroStats.heroGold < price || module_hero.heroStats.heroGold == 0) {
        dialogue.innerHTML = 'Недостаточно денег для покупки';
        return;
    }
    if (heroHp < 100) {
        heroHp += recoverHP;
    }
    if (heroHp > 100) {
        heroHp = 100;
    }
    module_hero.heroStats.heroHP = heroHp;
    dialogue.innerHTML = 'Ты хорошо пообедал ' + text;
    module_hero.heroStats.heroGold -= price;
    hitPoint.innerHTML = heroHp;
    hero_gold.innerHTML = module_hero.heroStats.heroGold;
}

// Аренда дома *
export function houseRent({
    price
}) {
    var heroGold = module_hero.heroStats.heroGold;
    if (heroGold < 250) {
        dialogue.innerHTML = 'Не достаточно денег для аренды ';
        return;
    }
    if (questMarkObj.houseRenta == true) {
        dialogue.innerHTML = 'Дом уже арендован, можно въезжать ';
        return;
    }
    dialogue.innerHTML = 'Дом арендован, теперь можешь отдыхать там в любое время ';
    heroGold -= 250;
    module_hero.heroStats.heroGold = heroGold;
    hero_gold.innerHTML = heroGold;
    questMarkObj.houseRenta = true;
    house.classList.remove("hide-loc");
}

// Проверка условий выполнения квеста *
/* Первый параметр item - передаем массив вида
    [{
            itemName: 'Хвост крысы',
            count: 1
        },
        {
            itemName: 'Шкура варга',
            count: 2
    }]
*/
export function checkQuestItem({
    item
}) {
    var heroInv = module_hero.invItems;
    var checkItemArr = [];
    var indexRemove = [];

    for (var i = 0; i < item.length; i++) {
        var itemName = item[i].itemName;
        var checkItem = findWithKey(heroInv, 'nameItem', itemName);
        checkItemArr.push(checkItem);
    }

    if (checkItemArr.indexOf(-1) != -1) {
        return false;
    }

    for (var i = 0; i < checkItemArr.length; i++) {
        var counter = checkItemArr[i];
        var countItemInv = module_hero.invItems[counter].countItem;
        var countItemQuest = item[i].count;
        if (countItemInv < countItemQuest) {
            return false;
        }
        module_hero.invItems[counter].countItem -= countItemQuest;

        if (module_hero.invItems[counter].countItem == 0) {
            indexRemove.push(counter);
        }
    }

    for (var i = indexRemove.length; i--;) {
        module_hero.invItems.splice(indexRemove[i], 1);
    }

    return true;
}

export function goldTransact({
    transactNum,
    transactType
}) {
    var heroGold = module_hero.heroStats.heroGold;

    if (!transactType) {
        if (heroGold >= transactNum) {
            heroGold -= transactNum;
            module_hero.heroStats.heroGold = heroGold;
            hero_gold.innerHTML = module_hero.heroStats.heroGold;
            return true;
        } else {
            return false;
        }
    }

    heroGold += transactNum;
    module_hero.heroStats.heroGold = heroGold;
    hero_gold.innerHTML = module_hero.heroStats.heroGold;
    return true;
}

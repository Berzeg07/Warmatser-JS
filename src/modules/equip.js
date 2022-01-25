import * as module_hero from './hero';
import {
    findWithKey
} from './functions';
import {
    elemConstruct
} from '../modules/construct';

export function equipItem(btn) {
    // Аргументом передаем блок для события *
    var btnEquip = document.querySelector(btn);
    // Начальные статы героя  урона и брони (без экипировки) *
    var originDamage = 10;
    var originArmor = 0;
    // Инициализируем событие *
    if (btnEquip != null) {
        btnEquip.addEventListener('click', function() {
            // Получаем значение выделенного чекбокса *
            var checkItem = document.querySelector('input[name = "hero_item"]:checked').value,
                // Получаем индекс элемента предмета выбранного для экипировки *
                index = findWithKey(module_hero.invItems, 'nameItem', checkItem),
                // Получаем тип предмета *
                checkType = module_hero.invItems[index].typeItem;
            // Проверка типа предмета *
            if (checkType == "Предмет") {
                // Если тип == предмет выводим оповещение *
                var dialogueBox = new elemConstruct({
                    elemParent: '.btn-block_inv',
                    elemClass: 'tooltip-inner',
                    elemTag: 'div',
                    elemInner: '<p>Данный предмет невозможно экипировать</p>'
                });
                // Добавляем созданный элемент в разметку *
                dialogueBox.addElem();
                // Удаляем оповещение спустя 2 сек *
                setTimeout(function() {
                    var el = document.querySelector('.tooltip-inner');
                    el.remove();
                }, 1500);
                // Выход из функции *
                return;
            }
            if (checkItem == module_hero.heroStats.heroWeapon || checkItem == module_hero.heroStats.heroEquip) {
                // Если тип == предмет выводим оповещение *
                var dialogueBox = new elemConstruct({
                    elemParent: '.btn-block_inv',
                    elemClass: 'tooltip-inner',
                    elemTag: 'div',
                    elemInner: '<p>Данный предмет уже экипирован</p>'
                });
                // Добавляем созданный элемент в разметку *
                dialogueBox.addElem();
                setTimeout(function() {
                    var el = document.querySelector('.tooltip-inner');
                    el.remove();
                }, 1500);
                return;
            }
            // Если тип урон добавляем к урону героя значение оружия *
            if (checkType == 'Урон') {
                module_hero.heroStats.heroDamage = originDamage;
                module_hero.heroStats.heroDamage += module_hero.invItems[index].propertiesItem;
                module_hero.heroStats.heroWeapon = checkItem;
                // Обновляем данные героя на глобальной карте *
                // Получаем класс предмета
                var weaponClass = module_hero.invItems[index].classItem;
                updateEquip({
                    elBaseClass: 'hero-weapon',
                    itemClass: weaponClass,
                    imageBlockId: 'heroWeapon',
                    propId: 'weaponDamage',
                    nameId: 'weaponEquip',
                    itemType: 'weapon'
                });
            }
            // Если тип броня добавляем к броне героя значение экипировки *
            if (checkType == 'Броня') {
                module_hero.heroStats.heroArmor = originArmor;
                module_hero.heroStats.heroArmor += module_hero.invItems[index].propertiesItem;
                module_hero.heroStats.heroEquip = checkItem;
                // Обновляем данные героя на глобальной карте *
                // Получаем класс предмета
                var armorClass = module_hero.invItems[index].classItem;
                updateEquip({
                    elBaseClass: 'hero-armor',
                    itemClass: armorClass,
                    imageBlockId: 'heroArmor',
                    propId: 'armorProp',
                    nameId: 'armorEquip',
                    itemType: 'armor'
                });
            }
        });
    }
}

// Функция смены экипировки на глобальной карте *

/*
Первый аргумент: базовый класс элемента для изображения оружия,
Второй аргумент: класс предмета, который экипирован,
Третий аргумент: ID блока изображения,
Четвертый аргумент: ID элемента с значением экипировки,
Пятый аргумент: ID элемента с названием экипировки на панели героя,
Шестой аргумент: передаем тип предмета. Возможно одно из двух значений: weapon/armor
*/

export function updateEquip({
    elBaseClass,
    itemClass,
    imageBlockId,
    propId,
    nameId,
    itemType
}) {
    var imageBlockId = document.getElementById(imageBlockId),
        propId = document.getElementById(propId),
        nameId = document.getElementById(nameId);
    imageBlockId.className = elBaseClass;
    imageBlockId.classList.add(itemClass);
    if (itemType == 'weapon') {
        propId.innerHTML = module_hero.heroStats.heroDamage;
        nameId.innerHTML = module_hero.heroStats.heroWeapon;
    }else{
        propId.innerHTML = module_hero.heroStats.heroArmor;
        nameId.innerHTML = module_hero.heroStats.heroEquip;
    }
}

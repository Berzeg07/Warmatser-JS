import {
    btnConstruct
} from './construct';
import {
    elemConstruct
} from './construct';
import {
    findWithKey
} from './functions';
import {
    equipItem
} from './equip';

// Массив с объектами предметов инвентаря *
export var invItems = [
    // {
    //     nameItem: 'Меч Беллиара',
    //     typeItem: 'Урон',
    //     priceItem: '1000',
    //     propertiesItem: 30,
    //     classItem: 'destroyer',
    //     countItem: 2
    // },
    // {
    //     nameItem: 'Сокрушитель',
    //     typeItem: 'Урон',
    //     priceItem: '1000',
    //     propertiesItem: 25,
    //     classItem: 'axe',
    //     countItem: 2
    // },
    // {
    //     nameItem: 'Кожаная броня',
    //     typeItem: 'Броня',
    //     priceItem: '1000',
    //     propertiesItem: 5,
    //     classItem: 'leather-armor',
    //     countItem: 2
    // },
    // {
    //     nameItem: 'Панцирь Дракона',
    //     typeItem: 'Броня',
    //     priceItem: '1000',
    //     propertiesItem: 15,
    //     classItem: 'dragon-armor',
    //     countItem: 2
    // },
    // {
    //     nameItem: 'Шкура варга',
    //     typeItem: 'Предмет',
    //     priceItem: 150,
    //     propertiesItem: 'Для продажи',
    //     countItem: 2
    // },
    // {
    //     nameItem: 'Рог мракориса',
    //     typeItem: 'Предмет',
    //     priceItem: 150,
    //     propertiesItem: 'Для продажи',
    //     countItem: 10
    // },
    // {
    //     nameItem: 'Слиток стали',
    //     typeItem: 'Предмет',
    //     priceItem: '110',
    //     propertiesItem: 'Ковка',
    //     countItem: 10
    // },
    // {
    //     nameItem: 'Хвост крысы',
    //     typeItem: 'Предмет',
    //     priceItem: 150,
    //     propertiesItem: 'Для продажи',
    //     countItem: 3
    // }
];

// Информационная панель героя *
export var heroStats = {
    heroName: 'Герой',
    heroDamage: 10,
    heroArmor: 0,
    heroCrit: 20,
    heroHP: 100,
    heroGold: 1000,
    heroWeapon: 'Пусто',
    heroEquip: 'Пусто',
    heroIMG: '<img src="img/hero.png" alt="герой">',
    heroInfoPanel: function() {
        // Информационная панель героя на глобальной карте *
        var heroInfo = new elemConstruct({
            elemParent: '.map-container',
            elemClass: 'hero-infobar',
            // elemClass: ['hero-infobar', 'test'],
            elemTag: 'div',
            elemInner: `
                <div class="hero-infobar_btn"></div>
                <ul class="hero-skill">
                    <li>
                        <span>Урон:</span>
                        <span id="weaponDamage">${this.heroDamage}</span>
                    </li>
                    <li>
                        <span>Броня:</span>
                        <span id="armorProp">${this.heroArmor}</span>
                    </li>
                    <li>
                        <span>Крит:</span>
                        <span>${this.heroCrit + '%'}</span>
                    </li>
                    <li>
                        <span>Здоровье:</span>
                        <span id="hitPoint">${this.heroHP}</span>
                    </li>
                    <li>
                        <span>Золото:</span>
                        <span id="hero_gold">${this.heroGold}</span>
                    </li>
                </ul>
                <ul class="hero-equip">
                    <li>
                        <span>Оружие:</span>
                        <span id="weaponEquip">${this.heroWeapon}</span>
                    </li>
                    <li>
                        <span>Доспех:</span>
                        <span id="armorEquip">${this.heroEquip}</span>
                    </li>
                </ul>
            `
        });
        // Добавляем созданный элемент в разметку *
        heroInfo.addElem();
    }
}

// Вывод информацонной панели с кнопками *
export function heroUpdate() {
    // Удаляем текущую разметку и инициализируем новую *
    var heroInfoBar = document.querySelector('.hero-infobar'),
        heroBlock = document.querySelector('.hero');
    if (heroInfoBar != null) {
        heroInfoBar.remove();
    }
    if (heroBlock != null) {
        heroBlock.remove();
    }
    // Стата героя *
    heroStats.heroInfoPanel();
    // Картинка героя *
    heroEquipImg();
    // Кнопки на панели героя *
    var journalBtn = new btnConstruct({
        btnClass: 'panel-journal_btn',
        btnText: 'Журнал',
        btnParent: '.hero-infobar_btn'
    });
    var invBtn = new btnConstruct({
        btnClass: 'panel-inv_btn',
        btnText: 'Инвентарь',
        btnParent: '.hero-infobar_btn'
    });
    // Добавляем кнопки в разметку *
    journalBtn.createBtn();
    invBtn.createBtn();
}

function heroEquipImg() {
    // Внешний вид героя на глобальной карте *
    var heroMain = new elemConstruct({
        elemParent: '.map-container',
        elemClass: 'hero',
        elemTag: 'div',
        elemInner: `
       <div class="hero-item">
           <span class="hero-name">Герой</span>
           <div class="hero-img">
               ${heroStats.heroIMG}
           </div>
           <div class="hero-armor" id="heroArmor"></div>
           <div class="hero-weapon" id="heroWeapon"></div>
       </div>
       `
    });
    // Добавляем созданный элемент в разметку *
    heroMain.addElem();
    equipClassAdd();
}
/* Добавляем классы для вывода изображений экипированого снаряжения */
function equipClassAdd() {
    // В зависимости от того, что надето меняем внешний вид героя *
    var indexWeapon = findWithKey(invItems, 'nameItem', heroStats.heroWeapon),
        indexArmor = findWithKey(invItems, 'nameItem', heroStats.heroEquip);
    if (indexWeapon != -1) {
        var classWeapon = invItems[indexWeapon].classItem;
        heroWeapon.classList.add(classWeapon);
    }
    if (indexArmor != -1) {
        var classArmor = invItems[indexArmor].classItem;
        heroArmor.classList.add(classArmor);
    }
}

/* Вывод списка предметов (аргументом принимаем массив, родительский элемент для вывода списка
 и атрибут name для группы радиокнопок) */
export function inventoryList(arr, parent, inpName) {
    var parentID = document.getElementById(parent);
    parentID.innerHTML = '';
    // Если нет предметов выводим 'Пусто'
    if (arr.length == 0) {
        var li = document.createElement('li');
        parentID.appendChild(li);
        li.innerHTML = `Пусто`;
    } else {
        for (var i = 0; i < arr.length; i++) {
            var type = arr[i].typeItem,
                name = arr[i].nameItem,
                price = arr[i].priceItem,
                prop = arr[i].propertiesItem,
                count = arr[i].countItem,
                counter = '';
            /* Проверяем есть ли счетчик предмета.
            Кол-во предметов будет выводится в инвентаре героя, но не будет у торговца*/
            if (count != undefined) {
                var counter = ' - <i>' + count + '</i> шт.';
            }
            var li = document.createElement('li');
            parentID.appendChild(li);
            li.innerHTML = `
                    <label> <input type="radio" value="${name}" name="${inpName}"> ${name} - <span>${price} </span>(${type}:<em>${prop}</em>)${counter}
                    </label>
                `;
        }
        // Отмечаем радиокнопку первого предмета *
        var heroItem = document.getElementsByName(inpName);
        heroItem[0].checked = true;
    }
}

// Вывод инвентаря на главной *
export function showInv() {
    // Проверка вывода, если окно выведено, удаляем элемент и формируем по новой *
    var checkElem = document.querySelector('.modal');
    // Проверяем элемент на null *
    if (checkElem != null) {
        checkElem.remove();
    }
    // Массив классов для выводимого окна *
    var classArr = ['modal', 'modal-show', 'inv-block'];
    var invElem = new elemConstruct({
        elemParent: '#cont',
        elemClass: classArr,
        elemTag: 'div',
        elemInner: `
            <p class="modal-title">Инвентарь
                <div class="modal-close modal-close_btn"></div>
            </p>
            <ul id="inventory"></ul>
            <div class="btn-block btn-block_inv"></div>
        `
    });
    // Добавляем созданный элемент в разметку *
    invElem.addElem();

    // Вывод предметов из массива героя *
    inventoryList(invItems, 'inventory', 'hero_item');

    // Проверка наличия предметов, если предмет в наличии добавляем кнопки экипировать/закрыть *
    var invListText = document.getElementById("inventory").textContent;
    if (invListText != 'Пусто') {
        var equipBtn = new btnConstruct({
            btnClass: 'equipBtn',
            btnText: 'Экипировать',
            btnParent: '.btn-block_inv'
        });
        var invBtn = new btnConstruct({
            btnClass: 'modal-close_btn',
            btnText: 'Закрыть',
            btnParent: '.btn-block_inv'
        });
        equipBtn.createBtn();
        invBtn.createBtn();
    }
    // Экипировать предмет *
    equipItem('.equipBtn');
}

// Вывод кошелька *
export function purse(parent) {
    var heroGold = heroStats.heroGold;
    var parentID = document.getElementById(parent);
    parentID.innerHTML = '';
    var li = document.createElement('li');
    parentID.appendChild(li);
    li.innerHTML = `
            <p>Золото: <span>${heroGold}</span></p>
        `;
}

// Обновление кошелька при покупке или продаже предметов *
export function purseUpdate(){
    hero_gold.innerHTML = heroStats.heroGold;
}

export function showInvOnMain() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains("panel-inv_btn")) {
            showInv();
        }
    });
}

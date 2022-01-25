import * as module_hero from './hero';
import {
    btnConstruct
} from './construct';
import {
    findWithKey
} from './functions';
import {
    elemConstruct
} from '../modules/construct';

// Товары кузнеца *
export var forgeProduct = [{
    nameItem: 'Меч Беллиара',
    typeItem: 'Урон',
    priceItem: '1000',
    propertiesItem: 30,
    classItem: 'destroyer'
},
{
    nameItem: 'Панцирь Дракона',
    typeItem: 'Броня',
    priceItem: '1000',
    propertiesItem: 15,
    classItem: 'dragon-armor'
}
];

// Товары продавца *
export var shopProduct = [{
    nameItem: 'Кожаная броня',
    typeItem: 'Броня',
    priceItem: '200',
    propertiesItem: 5,
    classItem: 'leather-armor'
},

{
    nameItem: 'Пластинчатый доспех',
    typeItem: 'Броня',
    priceItem: '600',
    propertiesItem: 10,
    classItem: 'heavy-armor'
},


{
    nameItem: 'Дубинка',
    typeItem: 'Урон',
    priceItem: '130',
    propertiesItem: 5,
    classItem: 'club'
},

{
    nameItem: 'Полуторный меч',
    typeItem: 'Урон',
    priceItem: '250',
    propertiesItem: 10,
    classItem: 'sword'
},

{
    nameItem: 'Сокрушитель',
    typeItem: 'Урон',
    priceItem: '500',
    propertiesItem: 15,
    classItem: 'axe'
},

{
    nameItem: 'Охотничий нож',
    typeItem: 'Предмет',
    priceItem: '120',
    propertiesItem: 'Охота'
},

{
    nameItem: 'Слиток стали',
    typeItem: 'Предмет',
    priceItem: '110',
    propertiesItem: 'Ковка'
}
];

// Комментарии продавца к товарам *
export function sellerComment(textObj) {
    var shopItem = document.getElementsByName('shop_item'),
        dialogueInner = document.querySelector('.dialogue_article');
    shopItem[0].checked = true;
    for (var i = 0; i < shopItem.length; i++) {
        shopItem[i].addEventListener('click', function () {
            var itemName = this.value;
            var getIndex = findWithKey(textObj, 'nameItem', itemName);
            dialogueInner.innerHTML = textObj[getIndex].text;
        });
    }
}

// Покупка предметов *
export function buyItem(arr, itemVal) {
    // Индекс объекта с купленным предметом *
    var index = findWithKey(arr, 'nameItem', itemVal);
    // Уменьшаем цену вдвое при перепродаже *
    var newPrice = arr[index].priceItem / 2;
    // Вспомогательный пустой объект для купленного предмета *
    var clone = {};
    // Клонируем покупку в пустой объект *
    for (var key in arr[index]) {
        clone[key] = arr[index][key];
    }
    // переопределяем цену *
    clone.priceItem = newPrice;
    // Стоимость предмета *
    var priceItem = arr[index].priceItem;
    // Кол-во золота героя *
    var heroGold = module_hero.heroStats.heroGold;
    // Проверка на возможность покупки *
    if (priceItem > heroGold) {
        var dialogueInner = document.querySelector('.dialogue_article');
        dialogueInner.innerHTML = `Не достаточно денег для покупки`;
    } else {
        // Вычитываем золото у героя *
        module_hero.heroStats.heroGold -= priceItem;
        // Обновляем кошелек внутри магазина *
        module_hero.purse('purse');
        // Обновляем кошелек на глобальной карте *
        module_hero.purseUpdate();
        // Проверка наличия предмета в инвентаре, увеличиваем счетчик *
        for (var i in module_hero.invItems) {
            if (module_hero.invItems[i].nameItem == itemVal) {
                module_hero.invItems[i].countItem += 1;
                module_hero.inventoryList(module_hero.invItems, 'inventory', 'hero_item');
                return;
            }
        }
        // Добавляем счетчик к новому предмету *
        clone.countItem = 1;
        // Добавляем купленный предмет в инвентарь героя *
        module_hero.invItems.push(clone);
        // Обновляем список предметов героя в магазине *
        module_hero.inventoryList(module_hero.invItems, 'inventory', 'hero_item');
    }
}

// При продаже экипированного предмета, обновляем данные игрока на глоабльной карте *
function sellEquip({
    itemName,
    itemProp,
    itemType
}) {
    var indexItem = findWithKey(shopProduct, 'nameItem', itemName);
    module_hero.heroStats[itemProp] -= shopProduct[indexItem].propertiesItem;
    module_hero.heroStats[itemType] = 'Пусто';
    module_hero.heroUpdate();
}

// Продажа предметов *
export function sellItem(itemVal) {
    var index = findWithKey(module_hero.invItems, 'nameItem', itemVal);
    if (index != -1) {
        // Уменьшаем счетчик предмета игрока
        module_hero.invItems[index].countItem -= 1;
        // Увеличичваем золото героя при продаже предмета
        module_hero.heroStats.heroGold += +module_hero.invItems[index].priceItem;
        // Обновляем счетчик проданного предмета *
        var checkRadio = document.querySelector('input[name = "hero_item"]'),
            checkRadioChecked = document.querySelector('input[name = "hero_item"]:checked');
        if (checkRadio != null) {
            var countEl = checkRadioChecked.parentElement.lastElementChild;
            countEl.innerHTML = module_hero.invItems[index].countItem;
        }
        // Если счетчик на 0, удаляем предмет из массива игрока
        if (module_hero.invItems[index].countItem == 0) {
            module_hero.invItems.splice(index, 1);
            // Если предмет экипирован
            var checkWeapon = document.getElementById("weaponEquip").textContent;
            var checkArmor = document.getElementById("armorEquip").textContent;

            if (checkWeapon == itemVal) {
                sellEquip({
                    itemName: itemVal,
                    itemProp: 'heroDamage',
                    itemType: 'heroWeapon'
                });
            }
            if (checkArmor == itemVal) {
                sellEquip({
                    itemName: itemVal,
                    itemProp: 'heroArmor',
                    itemType: 'heroEquip'
                });
            }
            // Обновляем список предметов
            module_hero.inventoryList(module_hero.invItems, 'inventory', 'hero_item');
        }
        // Кнопка продать (Будет удалена если нет предметов)
        if (module_hero.invItems.length == 0) {
            var sellBtn = document.querySelector('.sell_btn');
            sellBtn.remove();
        }
        // Обновляем кошелек внутри  магазина *
        module_hero.purse('purse');
        // Обновляем кошелек на глобальной карте *
        module_hero.purseUpdate();
    }
}

export function showProductList({
    productObj
}) {
    // Проверка элемента на существование *
    var checkEl = document.querySelector('.modal-item');
    if (checkEl != null) {
        return;
    }
    // Разметка товаров *
    var shopElements = new elemConstruct({
        elemParent: '.modal-inner',
        elemClass: 'modal-inner_item',
        elemTag: 'div',
        elemInner: `
        <!-- Товары магазина -->
        <div class="modal-item">
            <p class="modal-title">Товары</p>
            <ul id="shop_list"></ul>
            <div class="btn-block btn-block_seller"></div>
        </div>
        <!-- Предметы игрока -->
        <div class="modal-item">
            <p class="modal-title">Инвентарь</p>
            <ul id="inventory"></ul>
            <div class="btn-block btn-block_buyer"></div>
        </div>
        <!-- Кошелек игрока -->
        <div class="modal-item">
            <p class="modal-title">Кошелек</p>
            <ul id="purse"></ul>
        </div>
        `
    });
    // Добавляем созданный элемент в разметку *
    shopElements.addElem();
    // Вывод предметов магазина *
    module_hero.inventoryList(productObj, 'shop_list', 'shop_item');
    // Вывод предметов героя *
    module_hero.inventoryList(module_hero.invItems, 'inventory', 'hero_item');
    // Вывод кошелька героя *
    module_hero.purse('purse');
    // Кнопка купить *
    var buyBtn = new btnConstruct({
        btnClass: 'buy_btn',
        btnText: 'Купить',
        btnParent: '.btn-block_seller'
    });
    buyBtn.createBtn();
    // Кнопка продать *
    sellBtnShow();
}

// Показываем кнопку продать если инвентарь героя не пустой *
export function sellBtnShow() {
    var invListText = document.getElementById("inventory").textContent,
        checkBtn = document.querySelector('.sell_btn');
    if (invListText != 'Пусто' && checkBtn == null) {
        var sellBtn = new btnConstruct({
            btnClass: 'sell_btn',
            btnText: 'Продать',
            btnParent: '.btn-block_buyer'
        });
        sellBtn.createBtn();
    }
}

// Обработчик кнопки Купить *
export function buyBtn({
    productObj
}) {
    var checkBuyItem = document.querySelector('input[name = "shop_item"]:checked').value;
    buyItem(productObj, checkBuyItem);
    // Кнопка продать *
    sellBtnShow();
}

// Обработчик кнопки продать *
export function sellBtn() {
    var checkRadio = document.querySelector('input[name = "hero_item"]:checked');
    if (checkRadio == undefined) {
        var mess = document.querySelector('.dialogue_article');
        mess.innerHTML = 'Предмет для продажи не выбран';
        return;
    }
    var checkSellItem = checkRadio.value;
    sellItem(checkSellItem);
}
// Обработчик продажи доступен в глобальной области видимости *
document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('sell_btn')) {
        sellBtn();
    }
});

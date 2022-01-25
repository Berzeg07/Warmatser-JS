export var enemyObj = {
    // Болотная крыса *
    rat: {
        name: 'Крыса',
        damage: 12,
        armor: 0,
        crit: 10,
        hitPoint: 100,
        item: {
            nameItem: 'Хвост крысы',
            typeItem: 'Предмет',
            priceItem: 80,
            propertiesItem: 'Для продажи',
            countItem: 1
        },
        image: '<div class="modal-enemy rat-battle" key="rat"><img src="img/rat.png" alt="Болотная крыса"></div>'
    },
    // Варг *
    varg: {
        name: 'Варг',
        damage: 30,
        armor: 0,
        crit: 10,
        hitPoint: 100,
        item: {
            nameItem: 'Шкура варга',
            typeItem: 'Предмет',
            priceItem: 100,
            propertiesItem: 'Для продажи',
            countItem: 1
        },
        image: '<div class="modal-enemy varg-battle" key="varg"><img src="img/varg.png" alt="Варг"></div>'
    },
    // Василиск *
    vasilisk: {
        name: 'Василиск',
        damage: 40,
        armor: 0,
        crit: 10,
        hitPoint: 100,
        item: {
            nameItem: 'Рог мракориса',
            typeItem: 'Предмет',
            priceItem: 150,
            propertiesItem: 'Для продажи',
            countItem: 1
        },
        image: '<div class="modal-enemy vasilisk-battle" key="vasilisk"><img src="img/vasilisk.png" alt="Василиск"></div>'
    },
    // Герхард *
    gerhard: {
        name: 'Герхард',
        damage: 35,
        armor: 0,
        crit: 10,
        hitPoint: 100,
        image: '<div class="modal-enemy gerhard-battle" key="gerhard"><img src="img/gerhard.png" alt="Герхард"></div>'
    },
    // Орк *
    ork: {
        name: 'Орк',
        damage: 45,
        armor: 5,
        crit: 20,
        hitPoint: 100,
        image: '<div class="modal-enemy orc-battle" key="ork"><img src="img/orc.png" alt="Орк"></div>'
    },
    // Джерард *
    djerard: {
        name: 'Джерард',
        damage: 17,
        armor: 0,
        crit: 10,
        hitPoint: 100,
        image: '<div class="modal-enemy derek-battle" key="djerard"><img src="img/derek.png" alt="Дерек"></div>'
    },
    // Убийца *
    killer: {
        name: 'Убийца',
        damage: 17,
        armor: 0,
        crit: 20,
        hitPoint: 100,
        image: '<div class="modal-enemy killer-battle" key="killer"><img src="img/killer.png" alt="Убийца"></div>'
    }
}

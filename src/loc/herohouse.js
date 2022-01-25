import {
    heroStats
} from '../modules/hero';
import {
    showModal
} from '../modules/modal';
import {
    elemConstruct
} from '../modules/construct';
import {
    actLoader
} from '../modules/action';

house.addEventListener('click', function() {
    // Вывод локации *
    showModal('modal-loc', 'house-loc', false);
    var text = 'Ты хорошо отдохнул';
    if (heroStats.heroHP < 75) {
        text = 'Ты хорошо отдохнул, часть здоровья восстановлено';
        heroStats.heroHP = 75;
        hitPoint.innerHTML = heroStats.heroHP;
    }
    actLoader(text, 'Отдых');
});

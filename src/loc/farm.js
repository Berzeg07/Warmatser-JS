import {
    heroStats
} from '../modules/hero';
import {
    purseUpdate
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

function workFarm(){
    var count = 1;
    job.addEventListener('click', function() {
        count++;
        // Вывод локации *
        showModal('modal-loc', 'job-loc', false);
        if (count > 3) {
            var dialogueBox = new elemConstruct({
                elemParent: '.modal-inner',
                elemClass: 'dialogue',
                elemTag: 'div',
                elemInner: `
                <p class="dialogue_article"  id="dialogue">На данный момент нет работы ...</p>
                <div class="btn-block btn-block_dialogue" id=btn_block>
                    <button type="button" class="btn modal-close_btn">Уйти</button>
                </div>
                `
            });
            // Добавляем созданный элемент в разметку *
            dialogueBox.addElem();
            return;
        }
        actLoader('Работа окончена, ты заработал 50 монет', 'Ты работаешь в поле');
        heroStats.heroGold += 50;
        // Обновляем кошелек на глобальной карте *
        purseUpdate();
    });
}

workFarm();

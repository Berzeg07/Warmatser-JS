import {
    elemConstruct
} from './construct';
import {
    findWithKey
} from './functions';
import * as module_modal from './modal';


// Массив с данными журнала *
var questJournal = [{
    questTitle: 'Начало',
    questArticle: ['Добрый маг привел меня в чувство и дал не много денег. Нужно добраться до города и осмотреться, может подвернеться какое ни будь дельце']
}];

// Добавляем нового квеста в журнал *
export function questAdd({
    questName,
    questArticle
}) {
    // Проверяем наличие квеста, если есть, добавляем новый пункт в линейку прогресса *
    var index = findWithKey(questJournal, 'questTitle', questName);
    if (index != -1) {
        //Проверяем наличие описания квеста на случай повторных событий *
        var articleCheck = questJournal[index].questArticle.indexOf(questArticle);
        if (articleCheck == -1) {
            questJournal[index].questArticle.push(questArticle);
        }
        return;
    } else {
        // Если такого квеста нет вообще, формируем новый заголовок и описание в журнале *
        var questObj = [{}]
        questObj[0].questTitle = questName;
        questObj[0].questArticle = [questArticle];
        questJournal.push(questObj[0]);
    }
}

// questAdd({
//     questName: 'Гражданин Хориниса22',
//     questArticle: 'Новый пункт'
// });

export function journalList(arr, parent) {
    // Получаем родительский элемент для вставки контента *
    var parentID = document.getElementById(parent);
    parentID.innerHTML = '';
    // Проходим по содержимому массива со списком квестов *
    for (var i = 0; i < arr.length; i++) {
        // Создаем разметку *
        var elem = document.createElement('div');
        var title = document.createElement('p');
        var list = document.createElement('ul');
        elem.classList.add('quest-box');
        title.classList.add('quest-title');
        list.classList.add('journal-list');
        // Выводим заголовок квеста *
        title.innerHTML = arr[i].questTitle;
        elem.appendChild(title);
        // Вложенный цикл для перебора массива с описанием квеста *
        for (var j = 0; j < arr[i].questArticle.length; j++) {
            var li = document.createElement('li');
            li.innerHTML = '- ' + arr[i].questArticle[j];
            list.appendChild(li);
        }
        // Выводим список с описаниями *
        elem.appendChild(list);
        // Выводим контент внутри модального окна *
        parentID.appendChild(elem);
    }
}

// Вывод журнала *
function showJournal() {
    // Проверка вывода, если окно выведено, удаляем элемент и формируем по новой *
    var checkElem = document.querySelector('.modal');
    // Проверяем элемент на null *
    if (checkElem != null) {
        checkElem.remove();
    }
    // Массив классов для выводимого окна *
    var classArr = ['modal', 'modal-show', 'journal'];
    // Базовая разметка *
    var journalElem = new elemConstruct({
        elemParent: '#cont',
        elemClass: classArr,
        elemTag: 'div',
        elemInner: `
            <p class="journal-title">Журнал</p>
            <div class="modal-close modal-close_btn"></div>
            <div class="journal-item" id="journal-item"></div>
        `
    });
    // Добавляем созданный элемент в разметку *
    journalElem.addElem();
    // Достаем записи квестов из массива *
    journalList(questJournal, 'journal-item');
    // Включаем затемнение фона *
    module_modal.overlayShow();
}


// Обработчик на вывод журнала на главной *
export function handlerJournal(){
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains("panel-journal_btn")) {
            showJournal();
        }
    });
}

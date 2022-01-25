import {
    btnConstruct
} from './construct';
import {
    elemConstruct
} from './construct';

// Диалоговое окно *
export function dialogueEl() {
    var dialogueBox = new elemConstruct({
        elemParent: '.modal-inner',
        elemClass: 'dialogue',
        elemTag: 'div',
        elemInner: `
                <p class="dialogue_article" id="dialogue"></p>
                <div class="btn-block btn-block_dialogue">
                    <ul class="link-list" id="link_list"></ul>
                </div>
                `
    });
    // Добавляем созданный элемент в разметку *
    dialogueBox.addElem();
}

// Начало диалога *
export function dialogueStart({
    textObj,
    index,
    showTextNpc
}) {

    var parentID = document.getElementById('link_list');
    parentID.innerHTML = '';

    // showTextNpc принимает true или false если при возврате в предыдущее окно не хотим, чтобы обновлялся последний комментарий NPC *
    if (showTextNpc) {
        var parentIDTop = document.getElementById('dialogue'),
            textNPC,
            nameNpc,
            nameNpcIndex = textObj[index].npcName;

        if (nameNpcIndex != undefined) {
            nameNpc = nameNpcIndex;
        } else {
            nameNpc = textObj[0].npcName;
        }

        if (nameNpc != undefined) {
            textNPC = '<b>' + nameNpc + ':' + '</b> ' + textObj[index].textNPC;
        } else {
            textNPC = textObj[index].textNPC;
        }

        parentIDTop.innerHTML = textNPC;
    }
    // Получаем массив с вопросами игрока *
    var actionHero = textObj[index].action;
    // выводим элементы в разметку *
    for (var i = 0; i < actionHero.length; i++) {
        var li = document.createElement('li');
        parentID.appendChild(li);
        li.innerHTML = '- ' + actionHero[i];
    }
}

// Преобразовываем HTML collection в обычный массив *
export function linkTarget(parent, e) {
    var child = parent.children;
    var arr = [...child];
    // Получаем индекс элемента по которому произошел клик *
    var index = arr.indexOf(e.target);
    return index;
}

// Вывод ответов на вопросы героя *
export function showAnswear({
    textObj,
    textObjIndex,
    indexList
}) {
    var el = document.getElementById('dialogue'),
        textNPC,
        npcName,
        nameNpcIndex = textObj[textObjIndex].npcName;

    if (nameNpcIndex != undefined) {
        npcName = nameNpcIndex;
    } else {
        npcName = textObj[0].npcName;
    }

    textNPC = '<b>' + npcName + ':' + '</b> ' + textObj[textObjIndex].answearsNPC[indexList];
    el.innerHTML = textNPC;
}

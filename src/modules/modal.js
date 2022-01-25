// Вывод локаций, второй параметр не обязательный *
export function showModal(classBlock, bgLoc, close) {
    overlayShow();
    modalBase(classBlock, bgLoc, close);
}

// Вывод модального окна с базовой разметкой и фоном для локаций, без содержимого *
// Последний аргумент по умолчанию выводит крестик для закрытия окна, отмечаем false, чтобы не выводить крестик *
export function modalBase(classBlock, bgLoc, close) {
    // Проверяем открыто ли какое либо окно, если да, закрываем
    var getModal = document.querySelector('.modal');
    if (getModal != null) {
        getModal.remove();
    }
    // Создаем элемент окна
    var modal = document.createElement('div');
    // Фон не обязательный аргумент, проверяем наличие *
    if (bgLoc != undefined) {
        modal.classList.add('modal', 'modal-show', classBlock, bgLoc);
    } else {
        modal.classList.add('modal', 'modal-show', classBlock);
    }
    if (close == false) {
        modal.innerHTML = `<div class="modal-inner"></div>`
    } else {
        modal.innerHTML = `
        <div class="modal-inner">
            <!-- Крестик -->
            <div class="modal-close modal-close_btn"></div>
        </div>
    `
    }
    document.body.appendChild(modal);
}

// Закрытие всплывающих окон (класс modal-close_btn) *
export function hideModal() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains("modal-close_btn")) {
            deleteModal();
        }
    });
}

export function deleteModal(){
    var getModal = document.querySelector('.modal');
    getModal.remove();
    overlayHide();
}

export function hideModalInner(){
    var modal = document.querySelector('.modal');
    modal.classList.remove('modal-show');
}

// Затемнение заднего фона при выводе окон *
// Вывод
export function overlayShow() {
    overlay.classList.add('modal-show');
}
// Скрытие
export function overlayHide() {
    overlay.classList.remove('modal-show');
}

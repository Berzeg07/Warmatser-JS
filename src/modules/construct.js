// Конструктор блоков *
export function elemConstruct({
    elemParent,
    elemClass,
    elemTag,
    elemInner
}) {
    this.elemClass = elemClass;
    this.elemInner = elemInner;
    var parent = document.querySelector(elemParent);
    this.addElem = function() {
        var elem = document.createElement(elemTag),
            typeOfElem = typeof(this.elemClass);
        if (typeOfElem == 'object') {
            elem.classList.add(...this.elemClass);
        }else{
            elem.classList.add(this.elemClass);
        }
        elem.innerHTML = this.elemInner;
        parent.appendChild(elem);
    };
}

// Конструктор кнопок *
export function btnConstruct({
    btnClass,
    btnText,
    btnParent
}) {
    this.btnClass = btnClass;
    this.btnText = btnText;
    var parent = document.querySelector(btnParent);
    this.createBtn = function() {
        var btn = document.createElement('button'),
        typeOfElem = typeof(this.btnClass);
        if (typeOfElem == 'object') {
            btn.classList.add('btn', ...this.btnClass);
        }else{
            btn.classList.add('btn', this.btnClass);
        }
        btn.innerHTML = this.btnText;
        parent.appendChild(btn);
    };
}

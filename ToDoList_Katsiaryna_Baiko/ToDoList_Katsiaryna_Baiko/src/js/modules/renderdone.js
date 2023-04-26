// прописываем функцию рендера для третьей карточки

export function renderDone(obj, idx) {
    return ` 
    <div class="done__list__card" data-cardiddone='${(idx)}'>
        <span class="todo-span">ToDo</span>
        <div class="done__card__title">${(obj.title)}</div>
        <div class="done__card__description">
            <p>${(obj.description)}</p>
        </div>
        <div class="done__card__duedate">${(obj.duedate)}</div>
        <div class="done__card__action">
            <div class="done__action__author">${(obj.author)}</div>
            <div class="done__action__buttons">
                <button class="done__action__button-return">
                     <i class="fa-solid fa-reply"></i>
                </button>
                <button class="done__action__button-delete">
                     <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    </div>
    `;
}
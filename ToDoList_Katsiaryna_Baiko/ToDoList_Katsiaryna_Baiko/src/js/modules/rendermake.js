// используем функцию рендера, чтобы нашу карточку вывести в список задач
// для этого используем верству из html

export function renderMakeTodo(obj, idx) {
    return `
    <div class="make-todo__list__card" data-cardidmake='${(idx)}'>
        <span class="todo-span">ToDo</span>
        <div class="make-todo__card__title">${(obj.title)}</div>
        <div class="make-todo__card__description">
            <p>${(obj.description)}</p>
        </div>
        <div class="make-todo__card__duedate">${(obj.duedate)}</div>
        <div class="make-todo__card__action">
            <div class="make-todo__card__author">${(obj.author)}</div>
            <div class="make-todo__action__buttons">
                <button class="make-todo__action__button-delete" type="button">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="make-todo__action__button-forward" type="button">
                    <i class="fa-sharp fa-solid fa-share"></i>
                </button>
            </div>
        </div>
    </div>
  `;
}
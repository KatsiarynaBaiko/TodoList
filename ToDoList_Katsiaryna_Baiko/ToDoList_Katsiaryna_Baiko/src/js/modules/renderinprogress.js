// прописываем функцию рендера для второй карточки
// функцию renderMakeTodo не используем, так как у нас отличается верстка (количество кнопочек снизу)

export function renderinProgress(obj, idx) {
    return `
     <div class="inprogress__list__card" data-cardidinprogrees='${(idx)}'>
        <span class="todo-span">ToDo</span>
        <div class="inprogress__card__title">${(obj.title)}</div>
        <div class="inprogress__card__description">
            <p>${(obj.description)}</p>
        </div>
        <div class="inprogress__card__duedate">${(obj.duedate)}</div>
        <div class="inprogress__card__action">
            <div class="inprogress__action__author">${(obj.author)}</div>
            <div class="inprogress__action__buttons">
                 <button class="inprogress__action__button-return">
                    <i class="fa-solid fa-reply"></i>
                </button>
                <button class="inprogress__action__button-delete">
                    <i class="fa-solid fa-trash-can"></i>
                 </button>
                <button class="inprogress__action__button-forward">
                    <i class="fa-sharp fa-solid fa-share"></i>
                </button>
             </div>
        </div>
     </div>
    `;
}
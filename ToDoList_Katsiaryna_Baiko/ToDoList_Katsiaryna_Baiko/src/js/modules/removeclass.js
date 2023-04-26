// мы постоянно будем добавлять и удалять класс, 
// поэтому создаем функцию на добавление и удаление его
// передаем наш инпут (то есть элемент) и класс 


export function removeClass(elem, nameClass) {
    elem.classList.remove(nameClass);
}
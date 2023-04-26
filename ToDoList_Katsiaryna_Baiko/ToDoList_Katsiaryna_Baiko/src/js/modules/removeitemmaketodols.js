// Local Storage для makeTodo
// функция, которая очищает данные Local Storage
// также мы смотрим есть ли что-то в Local Storage 
// вызываем на кнопке удаления всех карточкек

export const REMOVEITEMMAKETODOLS = () => {
    localStorage.removeItem('makeTodoKeyLS');
}
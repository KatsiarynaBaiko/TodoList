// Local Storage для makeTodo
// функция, которая отвечает за сам Local Storage (за запись в Local Storage)
// вызываем ее в showTaskMakeTodo для записи в localStorage
// а также для кнопочек в карточке Delete и Forward

import { makeTodo } from "../app.js";

export const SETMAKETODOLS = () => {
    let makeTodoToJson = JSON.stringify(makeTodo);
    localStorage.setItem('makeTodoKeyLS', makeTodoToJson);
}

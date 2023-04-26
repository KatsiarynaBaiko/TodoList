// счетчик для количества задач maketodo
// запускается в функциях function showTaskMakeTodo
// function makeTodoForward и function makeTodoDelete

import { makeTodo } from "../app.js";

export let makeTodoCounter = document.querySelector('#make-todo__counter__count');

export function makeTodoCount() {
    makeTodo.length;
    makeTodoCounter.innerHTML = makeTodo.length;
}
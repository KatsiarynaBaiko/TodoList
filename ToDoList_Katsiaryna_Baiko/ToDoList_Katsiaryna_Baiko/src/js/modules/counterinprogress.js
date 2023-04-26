// счетчик для количества задач inProgress
// запускается в функциях function showTaskinProgrees
// function inProgressReturn, function inProgressForward и function inProgressDelete

import { inProgress } from "../app.js";

export let inProgressCounter = document.querySelector('#inprogress__counter__count');

export function inProgressCount() {
    inProgress.length;
    inProgressCounter.innerHTML = inProgress.length;
}
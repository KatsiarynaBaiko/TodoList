// счетчик для количества задач done
// запускается в функциях function showTaskDone, function doneReturn, function doneDelete

import { done } from "../app.js";

export let doneCounter = document.querySelector('#done__counter__count');

export function doneCount() {
    done.length;
    doneCounter.innerHTML = done.length;
}
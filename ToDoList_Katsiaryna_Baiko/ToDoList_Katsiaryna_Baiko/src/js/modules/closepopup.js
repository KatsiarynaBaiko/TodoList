// функцию, которая будет убирать класс с нашего popup => скрывает его

import { popup } from "../app.js";

export function closePopup() {
    popup.classList.remove('open');
}
// Local Storage для inProgress 

import { inProgress } from "../app.js";

export const setinProgressTodoLS = () => {
    let inProgressToJson = JSON.stringify(inProgress);
    localStorage.setItem('inProgressKeyLS', inProgressToJson);
}
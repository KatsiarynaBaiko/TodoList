// Local Storage для done

import { done } from "../app.js";

export const SETDONELS = () => {
    let doneToJson = JSON.stringify(done);
    localStorage.setItem('doneKeyLS', doneToJson);
}
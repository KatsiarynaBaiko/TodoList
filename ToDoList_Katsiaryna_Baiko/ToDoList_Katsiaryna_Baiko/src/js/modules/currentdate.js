// текущая дата через "." с "0"
export let headerDate = document.querySelector('#header__date');

export function currentDay() {
    let date = new Date();

    headerDate.innerHTML = `${addDate(date.getFullYear())}.${addDate(date.getMonth() + 1)}.${addDate(date.getDate())}`
}
currentDay()


export function addDate(num) {
    if (num >= 1 && num <= 9) {
        return '0' + num;
    }
    else {
        return num;
    }
}
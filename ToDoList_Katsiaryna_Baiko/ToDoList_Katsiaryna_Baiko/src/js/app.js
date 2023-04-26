
import { headerDate } from "./modules/currentdate.js";
import { currentDay } from "./modules/currentdate.js";
import { addDate } from "./modules/currentdate.js";
import { clearData } from "./modules/cleardata.js";
import { renderMakeTodo } from "./modules/rendermake.js";
import { renderinProgress } from "./modules/renderinprogress.js";
import { renderDone } from "./modules/renderdone.js";
import { makeTodoCounter } from "./modules/countermake.js";
import { makeTodoCount } from "./modules/countermake.js";
import { inProgressCounter } from "./modules/counterinprogress.js";
import { inProgressCount } from "./modules/counterinprogress.js";
import { doneCounter } from "./modules/counterdone.js";
import { doneCount } from "./modules/counterdone.js";
import { closePopup } from "./modules/closepopup.js";
import { SETMAKETODOLS } from "./modules/setmaketodols.js";
import { REMOVEITEMMAKETODOLS } from "./modules/removeitemmaketodols.js";
import { setinProgressTodoLS } from "./modules/setinprogresstodols.js";
import { removeIteminProgressLS } from "./modules/removeiteminprogressls.js";
import { SETDONELS } from "./modules/setdonels.js";
import { REMOVEITEMDONELS } from "./modules/removeitemdonels.js";
import { textMessage } from "./modules/textmessage.js";
import { addClass } from "./modules/addclass.js";
import { removeClass } from "./modules/removeclass.js";

// export тоже не должны быть внутри функции init, поэтому выносим их за ее пределы
export let popup = document.querySelector('#popup');
export let makeTodo = JSON.parse(localStorage.getItem('makeTodoKeyLS')) || [];
export let inProgress = JSON.parse(localStorage.getItem('inProgressKeyLS')) || [];
export let done = JSON.parse(localStorage.getItem('doneKeyLS')) || [];

function init() {

    //открытие pop-up по нажатию на кнопку
    let makeTodoBtnAdd = document.querySelector('#make-todo__buttons__button-add');
    // export let popup = document.querySelector('#popup');
    // let popupForm = document.querySelector('#popup-form');

    makeTodoBtnAdd.addEventListener('click', () => {
        popup.classList.add('open');
        // popupForm.classList.add ('open');
        // console.log (makeTodoBtnAdd);
    });

    // ----------------------------
    //валидация формы 

    // function validationVersionFirst() {
    //     // let popupForm = document.querySelector('#popup-form');
    //     // let popupTitle = document.querySelector('#popup-title');
    //     // let popupDescription = document.querySelector('#popup-description');
    //     // let popupAuthor = document.querySelector('#popup-author');
    //     // let popupDuedate = document.querySelector('#popup-duedate');

    //     // через document.form.elements (не срабатывает, так как в id есть -)
    //     // let popupTitle = form.elements.popup-title;
    //     // let popupDescription = form.elements.popup-description;
    //     // let popupAuthor = form.elements.popup-author; 
    //     // let popupDuedate = form.elements.popup-duedate; 

    //     // let popupMessageTitle = document.querySelector('#popup-form__message-for-title');
    //     // let popupMessageDescription = document.querySelector('#popup-form__message-for-description');
    //     // let popupMessageAuthor = document.querySelector('#popup-form__message-for-author');

    //     // popupForm.addEventListener('submit', (e) => {
    //     //     e.preventDefault (); //отменяет стандартное поведение формы, т.е. обновление
    //     //     popupTitleValidation ();
    //     //     popupDescriptionValidation ();
    //     //     popupAuthorValidation ();
    //     // })

    //     // let popupTitleValidation = () => {
    //     //     if (popupTitle.value === '') {
    //     //         popupMessageTitle.innerHTML = 'Title cannot be blank';
    //     //         // checkBlank.push(false);
    //     //     }
    //     //     else {
    //     //         // popupMessageTitle.innerHTML = '';
    //     //         // checkBlank.push(true);
    //     //     }
    //     // }

    //     // let popupDescriptionValidation = () => {
    //     //     if (popupDescription.value === '') {
    //     //         popupMessageDescription.innerHTML = 'Description cannot be blank';
    //     //         // checkBlank.push(false);
    //     //     }
    //     //     else {
    //     //         // popupMessageDescription.innerHTML = '';
    //     //         // checkBlank.push(true);
    //     //     }
    //     // }

    //     // let popupAuthorValidation = () => {
    //     //     if (popupAuthor.value === '') {
    //     //         popupMessageAuthor.innerHTML = 'Author cannot be blank';
    //     //         // checkBlank.push(false);
    //     //     }
    //     //     else {
    //     //         // popupMessageAuthor.innerHTML = '';
    //     //         // checkBlank.push(true);
    //     //     }
    //     // }

    //     // но у нас возникает баг, что пустые отвалидированные значения все равно сохдают объект
    //     // поэтому создаем новый массив и будем проверять есго на true false и выводить alert
    //     // и вставляем его значения в проверки checkBlank.push(false) or checkBlank.push(true);
    //     // само условие проверки пишем в function getData(e)
    //     // let checkBlank = [];
    // };

    // ----------- new validation -------

    // создадим объект в который поместим все наши текстовые сообщения при валидации
    // let textMessage (export)

    // деструктуризация объекта
    // let { enterTitle: enterTitle, enterDescription: enterDescription, enterAuthor: enterAuthor } = textMessage;
    let { enterTitle, enterDescription, enterAuthor } = textMessage;

    // console.log(enterTitle);
    // console.log(enterDescription);
    // console.log(enterAuthor);

    // функции на добавление и удаление класса
    // function addClass (export)
    // function removeClass (export)

    // прописываем две функции, которые взаимодействуют с нашими инпутами
    // первая - когда все хорошо
    // вторая - когда есть ошибка(не заполнены поля)
    // formControl - это условно наш popup-form___item

    function setSuccessFor(control) {
        const formControl = control.parentElement;
        addClass(formControl, 'success')
    };

    function setErrorFor(control, message) {
        const formControl = control.parentElement;
        const errorMessage = formControl.querySelector('small');
        addClass(formControl, 'error');
        errorMessage.innerHTML = message;
    };

    // получаем форму и элементы формы (инпуты)
    let popupForm = document.querySelector('#popup-form');
    let popupTitle = document.querySelector('#popup-title');
    let popupDescription = document.querySelector('#popup-description');
    let popupAuthor = document.querySelector('#popup-author');
    let popupDuedate = document.querySelector('#popup-duedate');

    // создаем функцию, в которой будем делать все наши проверки и вызываем ее в function getData
    // так как мы работаем с инпутами, то нам нужны их значения
    // также можно минимально обработать их с помощью trim
    // получаем нашего родителя popup-form___item в котором инпут лежит
    // вызываем ее в function getData
    function checkControls() {
        let popupTitleValue = popupTitle.value.trim();
        let popupDescriptionValue = popupDescription.value.trim();
        let popupAuthorValue = popupAuthor.value.trim();
        let popupDuedateValue = popupDuedate.value.trim();

        let formControls = document.querySelectorAll('.popup-form___item');
        // так как у нас получен псевдомассив, то мы его перебираем
        // навешиваем событие, если что-то в инпуте появляется (изменяется состояние инпута (называется событие 'input')), то изменяется класс 
        // и запускается функция с изменением класса 
        // и передаем el (это наш parent.Element) и вторым error (это наш nameClass)
        formControls.forEach((el) => {
            el.addEventListener('input', () => {
                removeClass(el, 'error');
                addClass(el, 'success');
            });
        });

        // теперь прописваем наши проверки
        // если пустая строка - вызываем функцию setErrorFor, 
        // передаем элемент с которым работаем - то есть popupTitle, а не его значение popupTitleValue 
        // и сообщение enterTitle: 'Title cannot be blank' => textMessage.enterTitle
        // если все хорошо - setSuccessFor

        if (popupTitleValue === '') {
            // setErrorFor(popupTitle, textMessage.enterTitle);  // до деструктуризации объекта
            setErrorFor(popupTitle, enterTitle); // после деструктуризации объекта
            checkBlank.push(false);
        } else {
            setSuccessFor(popupTitle);
            checkBlank.push(true);
        };

        if (popupDescriptionValue === '') {
            // setErrorFor(popupDescription, textMessage.enterDescription);  // до деструктуризации объекта
            setErrorFor(popupDescription, enterDescription); // после деструктуризации объекта
            checkBlank.push(false);
        } else {
            setSuccessFor(popupDescription);
            checkBlank.push(true);
        };

        if (popupAuthorValue === '') {
            // setErrorFor(popupAuthor, textMessage.enterAuthor); // до деструктуризации объекта
            setErrorFor(popupAuthor, enterAuthor); // после деструктуризации объекта
            checkBlank.push(false);
        } else {
            setSuccessFor(popupAuthor);
            checkBlank.push(true);
        };

        if (!checkBlank.includes(false, 0)) {
            let data = new GetDataTask(
                popupTitle.value,
                popupDescription.value,
                popupDuedate.value,
                popupAuthor.value,
                'todoing'); // первоначально стоял статус (..... false)

            makeTodo.push(data);
            console.log(makeTodo);
            clearData([popupTitle, popupDescription, popupAuthor, popupDuedate]);

            // checkBlank.splice(0);

            let controls = document.querySelectorAll('.popup-form___item');
            for (let el of controls) {
                removeClass(el, 'success');
            }
        }
        else {
            checkBlank.splice(0);
        }
        console.log(checkBlank);
    };

    // но у нас возникает баг, что пустые отвалидированные значения все равно сохдают объект
    // поэтому создаем новый массив и будем проверять его на true false 
    // и вставляем его значения в проверки checkBlank.push(false) or checkBlank.push(true);
    // само условие проверки пишем в function getData(e)
    let checkBlank = [];

    // ----------------------------
    // массивы, между которыми будут перемещаться таски
    // let makeTodo = [];
    // export let makeTodo = JSON.parse(localStorage.getItem('makeTodoKeyLS')) || [];
    // let inProgress = [];
    // export let inProgress = JSON.parse(localStorage.getItem('inProgressKeyLS')) || [];
    // let done = [];
    // export let done = JSON.parse(localStorage.getItem('doneKeyLS')) || [];

    //куда мы будем выводить данные
    let makeTodoList = document.querySelector('.make-todo__list');
    let inProgressList = document.querySelector('.inprogress__list');
    let doneList = document.querySelector('.done__list');

    // функция конструктор для сбора данных input 
    function GetDataTask(title, description, duedate, author, status) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.author = author;
        this.status = 'todoing';
        // status - после генерации объекта у него будет идентификатор,
        // что задание никуда не пошло дальше. 
        // При его изменении таск будет перемещаться между колонками
        // Status может быть различным, то есть его значение не зарезервировано. Может быть true, false, 'did'...
    };

    //навешиваем слушателя событий на форму
    popupForm.addEventListener('submit', getData);

    function getData(e) {
        e.preventDefault(); // отменяет стандартное поведение формы, т.е. обновление
        checkControls(); // функция с валидацией
        // popupTitleValidation(); //validationVersionFirst
        // popupDescriptionValidation(); //validationVersionFirst
        // popupAuthorValidation(); //validationVersionFirst

        // let data = new GetDataTask(popupTitle.value, popupDescription.value, popupDuedate.value, popupAuthor.value, false);
        // подставляем значения input из нашей формы
        // false - статус для изменения вдальнейшем
        // в итоге создан объект из формы
        // далее созданный объект пушим в массив
        // также передаем функцию для очистки input (в input указываем те инпуты, которые нужно очистить)
        // при валидации переместили в функцию  checkControls

        // makeTodo.push(data);  // при валидации переместили в функцию  checkControls
        // clearData([popupTitle, popupDescription, popupAuthor, popupDuedate]);  // при валидации переместили в функцию  checkControls
        showTaskMakeTodo();
        // console.log(data);
    };

    // ----------------------------
    //функция для очистки данных clearData (export)

    // ----------------------------
    // далее используем функцию рендера, чтобы нашу карточку вывести в список задач renderMakeTodo (export)
    // для этого используем верству из html

    // ----------------------------
    // функция, которая забирает данные из массива, запускает рендер и прорисовывает карточку
    // idx добавляем, чтобы удалять карточки по нему
    // функцию запускаем в function getData(e) после очистки, так как уже сформировали карточку и передаем ее далее
    // в результате возникает баг с перезаписью данные. Это исправляется за счет перезачистки '', которую вставляем вначале

    function showTaskMakeTodo() {
        makeTodoList.innerHTML = '';
        makeTodo.forEach((obj, idx) => {
            makeTodoList.innerHTML += renderMakeTodo(obj, idx);
        });

        // счетчик для количества тасков при добавлении
        makeTodoCount();

        // вызов функции для записи в Local Storage
        SETMAKETODOLS();

        //получаем кнопки для перемещение/удаления карточек из makeToDo
        let btnsMakeTodoForward = document.querySelectorAll('.make-todo__action__button-forward');
        let btnsMakeTodoDelete = document.querySelectorAll('.make-todo__action__button-delete');
        makeTodoForward(btnsMakeTodoForward);
        makeTodoDelete(btnsMakeTodoDelete);
    };

    // ----------------------------
    // дополнительно прописываем функционал кнопочек в форме
    // чтобы по нажатию она закрывалась 
    // для этого прописываем функцию, которая будет убирать класс с нашего popup => скрывать его
    // для Create навешиваем событие на форму popupForm.addEventListener('submit', closePopup) 
    // (т.к. у нас type=submit) и по click работает некорректно

    // function closePopup (export)

    let popupFormBtnX = document.querySelector('#popup-form__header__button-x');
    popupFormBtnX.addEventListener('click', closePopup);

    // let popupFormBtnCreate = document.querySelector('#popup-form__buttons__button-create');
    // popupFormBtnCreate.addEventListener('click', closePopup);
    // popupForm.addEventListener('submit', closePopup);

    let popupFormBtnCancel = document.querySelector('#popup-form__buttons__button-cancel');
    popupFormBtnCancel.addEventListener('click', closePopup);

    // ----------------------------
    // теория для кнопочек перемещения в карточках
    // function teoryForBtnsCard () {
    // // после того как сформированы карточки с тасками, то приступаем к их перемещению
    // // перещение/удаление будет осществляться по клику на кнопку
    // // поэтому получаем все кнопки, 
    // // но у нас их не существует (мы вырезали верстку), поэтому не можем получить их в глобальной области видимости
    // // => получаем их там, где функция function showTaskMakeTodo
    // // let btnsMakeTodoDelete = document.querySelectorAll ('.make-todo__action__button-delete');
    // // let btnsMakeTodoForward = document.querySelectorAll ('.make-todo__action__button-forward');

    // // для каждой кнопочки прописываем свою функцию, которая будет отвечать за свое и вызываем ее в showTaskMakeTodo
    // // для этого кнопки перебираем и вешаем слушателя событий+таргет(е)
    // // нам нужно вычислить элемент,к которому эта кнопка относится =>
    // // соединить наш массив [makeTodo]с кнопкой через index, чтобы удалять/перемещать нужные карточки
    // // для этого перебираем наш массив makeTodo.forEach и передаем obj, idx, так как работаем с ними
    // // => соединяем наш объект и кнопку через DOM (так как кнопка дочерний элемент нашeй карточки (то есть объекта)
    // // если нет вложенности - parentElement =>  if (e.tagret.parentElement.dataset.cardidmake == idx)
    // // если есть вложенность (то есть в div) метод closest => if (e.target.closest('.make-todo__list__card').dataset.cardidmake == idx)
    // // cardidmake - атрибут из функции-конструктора
    // // после вычисления объекта для движения меняем status, чтобы его перемащать
    // // после изменения статуса первоначально переносим в новый массив (то есть pushим его), а потом только удаляем. Иначе нечего будет переносить
    // // после проверки переноса удаляем объект из массива!! (=> makeTodo.splice(idx, 1), где передаем индекс и количество элементов, которые нам нужно удалить, те 1
    // // далее удаляем его из DOM дерева обращаяся к родителю "e.target.closest('.make-todo__list__card')" и вызываем метод remove
    // // но возникает баг, что индексы некорректно перезаписываются после удаления. 
    // // Это решается запуском функции showTaskMakeTodo (), которая в свою очередь запускает функию рендер
    // }

    // функционал кнопочки Forward в карточке
    function makeTodoForward(btnsMakeTodoForward) {
        btnsMakeTodoForward.forEach(btnMakeTodoForward => {
            btnMakeTodoForward.addEventListener('click', (e) => {
                makeTodo.forEach((obj, idx) => {
                    if (e.target.closest('.make-todo__list__card').dataset.cardidmake == idx) {
                        obj.status = 'inprogressing';
                        inProgress.push(obj);
                        makeTodo.splice(idx, 1);
                        e.target.closest('.make-todo__list__card').remove();
                        showTaskMakeTodo();
                        showTaskinProgrees(); // запустили функцию, чтобы показать передаваемые карточки в [inProgress]
                        makeTodoCount(); // счетчик для количества тасков при перемещении
                        SETMAKETODOLS(); //перезапись карточки в Local Storage
                    }
                });
                console.log(makeTodo);
                console.log(inProgress);
            });
        });
    };

    // прописываем функцию для кнопочки delete карточки в maketodo
    function makeTodoDelete(btnsMakeTodoDelete) {
        btnsMakeTodoDelete.forEach(btnmakeTodoDelete => {
            btnmakeTodoDelete.addEventListener('click', (e) => {
                makeTodo.forEach((obj, idx) => {
                    if (e.target.closest('.make-todo__list__card').dataset.cardidmake == idx) {
                        makeTodo.splice(idx, 1);
                        e.target.closest('.make-todo__list__card').remove();
                        showTaskMakeTodo();
                        makeTodoCount(); // счетчик для количества тасков при удалении
                        SETMAKETODOLS(); //перезапись карточки в Local Storage
                    }
                });
                console.log(makeTodo);
                console.log(inProgress);
            });

        });
    };

    // ----------------------------
    // прописываем функцию рендера для второй карточки: renderinProgress (export)
    // функцию renderMakeTodo не используем, так как у нас отличается верстка (количество кнопочек снизу)

    // ----------------------------
    // далее функция, которая забирает данные из массива (в который мы запушили, то есть inProgress), запускает рендер и прорисовывает карточку
    // idx добавляем, чтобы удалять карточки по нему
    // функцию запускаем в function makeTodoForward после showTaskMakeTodo(), так как там по нажатию кнопки переносим в массив inProgress
    // в function makeTodoForward был баг с перезаписью данные. Это исправляется за счет перезачистки '', которую вставляем вначале

    function showTaskinProgrees() {
        inProgressList.innerHTML = '';
        inProgress.forEach((obj, idx) => {
            inProgressList.innerHTML += renderinProgress(obj, idx);
        });

        // вызов функции для записи в Local Storage
        setinProgressTodoLS();

        // счетчик для количества тасков при добавлении
        inProgressCount();

        //получаем кнопки для перемещение/удаления карточек из inProgress
        let btnsinProgressReturn = document.querySelectorAll('.inprogress__action__button-return');
        let btnsinProgressDelete = document.querySelectorAll('.inprogress__action__button-delete');
        let btnsinProgressForward = document.querySelectorAll('.inprogress__action__button-forward');
        inProgressReturn(btnsinProgressReturn);
        inProgressDelete(btnsinProgressDelete);
        inProgressForward(btnsinProgressForward);
    };

    // ----------------------------
    // теория для кнопочек перемещения в карточках
    // function teoryForBtnsCard () {
    // // после того как получены карточки с тасками, то приступаем к их перемещению
    // // перещение/удаление будет осуществляться по клику на кнопку => поэтому получаем все кнопки, 
    // // но у нас их не существует (мы вырезали верстку), поэтому не можем получить их в глобальной области видимости
    // // => получаем их там, где функция function showTaskInProgrees
    // // для каждой кнопочки прописываем свою функцию, которая будет отвечать за свое и вызываем ее в showTaskInProgrees

    // // status для forward меняем на false
    // // но возникает баг, что индексы некорректно перезаписываются после удаления. 
    // // Это решается запуском функции showTaskinProgrees (), которая в свою очередь запускает функию рендер
    // // также запускаем функцию showTaskMakeTodo(), которая отвечает за рендер карточки, которую возвращаем в makeTodo
    // }

    // прописываем функцию для кнопочки return карточки в inProgress
    function inProgressReturn(btnsinProgressReturn) {
        btnsinProgressReturn.forEach(btninProgressReturn => {
            btninProgressReturn.addEventListener('click', (e) => {
                inProgress.forEach((obj, idx) => {
                    if (e.target.closest('.inprogress__list__card').dataset.cardidinprogrees == idx) {
                        obj.status = 'todoing';
                        makeTodo.push(obj);
                        inProgress.splice(idx, 1);
                        e.target.closest('.inprogress__list__card').remove();
                        showTaskinProgrees();
                        showTaskMakeTodo(); // запустили функцию, чтобы показать возвращаемые карточки в [maketodo]
                        inProgressCount(); // счетчик для количества тасков при перемещении
                        setinProgressTodoLS(); //перезапись карточки в Local Storage
                    }
                    console.log(inProgress);
                    console.log(makeTodo);
                });
            });
        });
    };

    // прописываем функцию для кнопочки delete карточки в inProgress
    function inProgressDelete(btnsinProgressDelete) {
        btnsinProgressDelete.forEach(btninProgressDelete => {
            btninProgressDelete.addEventListener('click', (e) => {
                inProgress.forEach((obj, idx) => {
                    if (e.target.closest('.inprogress__list__card').dataset.cardidinprogrees == idx) {
                        inProgress.splice(idx, 1);
                        e.target.closest('.inprogress__list__card').remove();
                        showTaskinProgrees();
                        inProgressCount(); // счетчик для количества тасков при удалении
                        setinProgressTodoLS(); //перезапись карточки в Local Storage
                    }
                    console.log(inProgress);
                    console.log(makeTodo);
                });
            });
        });
    };

    // прописываем функцию для кнопочки forward карточки в inProgress
    // forward передает в новый массив done
    // для передачи меняем status объекта на obj.status = 'did'
    function inProgressForward(btnsinProgressForward) {
        btnsinProgressForward.forEach(btninProgressForward => {
            btninProgressForward.addEventListener('click', (e) => {
                inProgress.forEach((obj, idx) => {
                    if (e.target.closest('.inprogress__list__card').dataset.cardidinprogrees == idx) {
                        obj.status = 'did';
                        done.push(obj);
                        inProgress.splice(idx, 1);
                        e.target.closest('.inprogress__list__card').remove();
                        showTaskinProgrees();
                        showTaskDone(); // запустили функцию, чтобы показать передаваемые карточки для [done]
                        inProgressCount(); // счетчик для количества тасков при перемещении
                        setinProgressTodoLS(); //перезапись карточки в Local Storage
                    }
                    console.log(inProgress);
                    console.log(makeTodo);
                    console.log(done);
                });
            });
        });
    };

    // ----------------------------
    // прописываем функцию рендера для третьей карточки: renderDone (export)

    // ----------------------------
    // далее функция, которая забирает данные из массива (в который мы запушили, то есть done), запускает рендер и прорисовывает карточку
    // idx добавляем, чтобы удалять карточки по нему
    // функцию запускаем в function inProgressForward после showTaskinProgrees (), так как там по нажатию кнопки переносим в массив one
    // в function makeTodoForward был баг с перезаписью данные. Это исправляется за счет перезачистки '', которую вставляем вначале

    function showTaskDone() {
        doneList.innerHTML = '';
        done.forEach((obj, idx) => {
            doneList.innerHTML += renderDone(obj, idx);
        });

        // вызов функции для записи в Local Storage
        SETDONELS();

        // счетчик для количества тасков при добавлении
        doneCount();

        //получаем кнопки для перемещение/удаления карточек из done
        let btnsDoneReturn = document.querySelectorAll('.done__action__button-return');
        let btnsDoneDelete = document.querySelectorAll('.done__action__button-delete');
        doneReturn(btnsDoneReturn);
        doneDelete(btnsDoneDelete);
    };

    // ----------------------------
    // после того как получены карточки с тасками, то приступаем к их перемещению
    // перещение/удаление будет осуществляться по клику на кнопку => поэтому получаем все кнопки
    // для каждой кнопочки прописываем свою функцию, которая будет отвечать за свое и вызываем ее в showTaskInProgrees

    // прописываем функцию для кнопочки forward карточки в done
    function doneReturn(btnsDoneReturn) {
        btnsDoneReturn.forEach(btnDoneReturn => {
            btnDoneReturn.addEventListener('click', (e) => {
                done.forEach((obj, idx) => {
                    if (e.target.closest('.done__list__card').dataset.cardiddone == idx) {
                        obj.status = 'inprogressing';
                        inProgress.push(obj);
                        done.splice(idx, 1);
                        e.target.closest('.done__list__card').remove();
                        showTaskDone();
                        showTaskinProgrees(); // запустили функцию, чтобы показать возвращаемые карточки в inProgress
                        doneCount(); // счетчик для количества тасков при перемещении
                        SETDONELS(); // перезапись карточки в Local Storage
                    }
                    console.log(inProgress);
                    console.log(makeTodo);
                    console.log(done);
                });
            });
        });
    };

    // прописываем функцию для кнопочки delete карточки в done
    function doneDelete(btnsDoneDelete) {
        btnsDoneDelete.forEach(btnDoneDelete => {
            btnDoneDelete.addEventListener('click', (e) => {
                done.forEach((obj, idx) => {
                    if (e.target.closest('.done__list__card').dataset.cardiddone == idx) {
                        done.splice(idx, 1);
                        e.target.closest('.done__list__card').remove();
                        showTaskDone();
                        doneCount(); // счетчик для количества тасков при удалении
                        SETDONELS(); // перезапись карточки в Local Storage
                    }
                    console.log(inProgress);
                    console.log(makeTodo);
                    console.log(done);
                });
            });
        });
    };

    // ----------------------------
    // счетчик для количества задач 
    // function counterTeory () {
    // // счетчик должен работать на увеличение и уменьшение
    // // на увеличение - когда добавляем задачую => вызываем в function showTaskMakeTodo():
    // // на уменьшение - когда удаляем и перемещаем задачу => вызываем в function makeTodoForward и function makeTodoDelete
    // // для счетчика объявляется новая переменная и ей присваивается 0, Далее ++ / --
    // // но у нас этот споcоб не работает, так как работаем с длинной массива и счетчик делаем через нее
    // }

    // function counterFirstIdea () {
    // // let makeTodoCounter = document.querySelector('#make-todo__counter__count');
    // // let makeTodoCount = 0;
    // // makeTodoCounter.innerHTML = makeTodoCount;

    // // function getMakeTodoCounterPlus () {
    // //     makeTodoCount++
    // //     makeTodoCounter.innerHTML = makeTodoCount;
    // //     console.log (makeTodoCount);
    // // };

    // // let makeTodoCountMinus = makeTodoCount;
    // // function getMakeTodoCounterMinus () {
    // //     makeTodoCountMinus--
    // //     makeTodoCounter.innerHTML = makeTodoCountMinus;
    // //     console.log (makeTodoCountMinus);
    // // };
    // }

    // ----------- new counter ----------- 
    // счетчик для количества задач maketodo (export)
    // счетчик для количества задач inProgress (export)
    // счетчик для количества задач done (export)

    // ----------------------------
    // удаление всех тасков сразу же в makeTodo
    // очищаем массив по нажатию кнопочки "make-todo__buttons__button-delete", которая рядям "+" (add)
    // очищаем массив с помощью метода splice: arr.splice (fromIndex, itemsToDelete, item1ToAdd, item2ToAdd, ...);
    // запускаем function showTaskMakeTodo
    let makeTodoBtnDeleteAll = document.querySelector('#make-todo__buttons__button-delete');
    makeTodoBtnDeleteAll.addEventListener('click', () => {
        // console.log(makeTodoBtnDeleteAll);
        makeTodo.splice(0, makeTodo.length);
        showTaskMakeTodo();
        REMOVEITEMMAKETODOLS(); // удаление всех карточек из Local Storage
    });

    // удаление всех тасков сразу же в карточке в inProgress
    // запускаем функцию showTaskinProgrees(), чтобы заново запустить рендер 
    let inProcessBtnDeleteAll = document.querySelector('#inprogress__process__button-delete');
    inProcessBtnDeleteAll.addEventListener('click', () => {
        // console.log (inProcessBtnDeleteAll);
        inProgress.splice(0, inProgress.length);
        showTaskinProgrees();
        removeIteminProgressLS(); // удаление всех карточек из Local Storage
    });

    // удаление всех тасков сразу же в карточке в done
    // запускаем функцию showTaskDone(), чтобы заново запустить рендер 

    let doneBtnDeleteAll = document.querySelector('#done__process__button-delete');
    doneBtnDeleteAll.addEventListener('click', () => {
        // console.log (doneBtnDeleteAll);
        done.splice(0, done.length);
        showTaskDone();
        REMOVEITEMDONELS(); // удаление всех карточек из Local Storage
    });


    // ----------------------------
    // Local Storage
    // function teoryLocalStorage () {
    // // Local Storage данные, которые в них записаны, сохраняются после обновления страницы
    // // Local Storage (key (ключ, понятный нам (записываем как угодно)),  'значение(передаем все что угодно')
    // // setItem(key, value) – сохранить пару ключ/значение.
    // // getItem(key) – получить данные по ключу key.
    // // removeItem(key) – удалить данные с ключом key.
    // // clear() – удалить всё.
    // // ключ и значение должны быть строками.
    // // JSON.stringify - для преобразования в строку и передачи
    // // JSON.parse - для преобрахования в JS и получения
    // // Local Storage будет 3, так как работаем с 3-мя разными массивами
    // // после каждого изменения (удаления, перемещения карточки нужно вызывать функции LS для обновления данных)
    // };

    // function teoryLocalStorageMakeTodo () {
    // // при записи в Local Storage:
    // // преобразуем массив в строку через JSON.stringify
    // // для этого создаем новую переменную let makeTodoToJson
    // // записываем данные в Local Storage('key', value) с помощью setItem, где
    // // ключ - makeTodoKeyLS и значение - массив makeTodo (содержится в переменной makeTodoToJson)
    // // ----
    // // при очистке Local Storage используем ключ и  метод removeItem
    // // создаем новую переменную и проверяем очистку Local Storage (в console.log будет null)
    // // ---
    // // также при работе с Local Storage всегда нужно смотреть есть ли что-то в массиве уже
    // // поэтому нашу запись let makeTodo = []; меняем на let makeTodo = JSON.parse(localStorage.getItem'makeTodoKeyLS')) || [];
    // //это необходимо для того, чтобы мы могли пользоваться тем, что уже есть в Local Storage
    // };

    // Local Storage для makeTodo (export)
    // import { SETMAKETODOLS } from "./modules/setmaketodols.js";
    // showTaskMakeTodo();
    // так как мы защищаем наш код с помощью функции init (помещаем весь код во внутрб этой функции)
    // то фариант выше не срабатывает, так как import должы быть вынесены 
    // это решается путем просто путем вызова этой функции
    // (которую мы проимпортировали, например SETMAKETODOLS ();)

    SETMAKETODOLS();
    showTaskMakeTodo();
    // import { REMOVEITEMMAKETODOLS } from "./modules/removeitemmaketodols.js";


    // Local Storage для inProgress (export)
    // import { setinProgressTodoLS } from "./modules/setinprogresstodols.js";
    // showTaskinProgrees();
    setinProgressTodoLS();
    showTaskinProgrees();
    // import { removeIteminProgressLS } from "./modules/removeiteminprogressls.js";


    // Local Storage для done (export)
    // import { SETDONELS } from "./modules/setdonels.js";
    // showTaskDone();
    SETDONELS();
    showTaskDone();
    // import { REMOVEITEMDONELS } from "./modules/removeitemdonels.js";

}
init();

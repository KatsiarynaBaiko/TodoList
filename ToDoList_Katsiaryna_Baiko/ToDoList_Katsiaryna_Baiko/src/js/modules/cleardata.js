//функция для очистки данных 

export function clearData(inputs) {
    inputs.forEach((input) => {
        input.value = '';
    });
}
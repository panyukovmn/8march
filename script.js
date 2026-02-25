function getUrlParams() {
    const params = {};
    const parser = new URLSearchParams(window.location.search);
    for (const [key, value] of parser) {
        params[key] = decodeURIComponent(value);
    }
    return params;
}

function getPatronymic(name, gender) {
    // Улучшенная логика для формирования отчества по имени и полу
    const upperName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    
    if (gender === 'male') {
        // Для мужских имен
        if (["а", "я"].includes(name.slice(-1).toLowerCase())) {
            return name.slice(0, -1) + "евич";
        } else {
            return name + "ович";
        }
    } else {
        // Для женских имен
        if (["а", "я"].includes(name.slice(-1).toLowerCase())) {
            return name.slice(0, -1) + "евна";
        } else {
            return name + "овна";
        }
    }
}

function displayGreeting() {
    const params = getUrlParams();
    const firstName = params.firstname || 'Иван';
    const lastName = params.lastname || 'Иванов';
    const patronymic = params.patronymic || '';
    const gender = params.gender || 'female'; // по умолчанию женский
    
    const prefix = gender === 'male' ? 'Уважаемый' : 'Уважаемая';
    
    const prefixElement = document.getElementById('greeting-prefix');
    const namePatronymicElement = document.getElementById('greeting-name-patronymic');
    
    prefixElement.textContent = `${prefix}`;
    // Проверяем, заданы ли имя и отчество
    if ((firstName.trim() === '' || firstName === 'Иван') && patronymic.trim() === '') {
        namePatronymicElement.textContent = 'коллега';
    } else if (patronymic.trim() === '') {
        namePatronymicElement.textContent = `${firstName}`;
    } else {
        namePatronymicElement.textContent = `${firstName} ${patronymic}`;
    }

}

// Вызываем функцию после загрузки страницы
window.addEventListener('load', displayGreeting);
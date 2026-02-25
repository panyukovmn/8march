function getUrlParams() {
    const params = {};
    const parser = new URLSearchParams(window.location.search);
    for (const [key, value] of parser) {
        params[key] = decodeURIComponent(value);
    }
    return params;
}

function getPatronymic(name, gender) {
    // Простая логика для формирования отчества по имени и полу
    const maleEndings = ['й', 'ь', 'р', 'н', 'в', 'с', 'д', 'т', 'л', 'к', 'п', 'г', 'б', 'з', 'м', 'ц', 'ч', 'ш', 'щ', 'ф', 'х'];
    const femaleEndings = ['а', 'я', 'ия', 'да', 'ра', 'ва', 'на', 'ма', 'ла', 'ка', 'га', 'за', 'са', 'ча', 'ша', 'жа'];
    
    const lastChar = name.slice(-1);
    const lastTwoChars = name.slice(-2);
    
    if (gender === 'male') {
        if (['а', 'я'].includes(lastChar)) {
            return name.slice(0, -1) + 'евич';
        } else {
            return name + 'ович';
        }
    } else {
        if (maleEndings.includes(lastChar)) {
            return name + 'овна';
        } else if (['а', 'я'].includes(lastChar)) {
            return name.slice(0, -1) + 'евна';
        } else if (femaleEndings.includes(lastTwoChars)) {
            return name + 'овна';
        } else {
            return name + 'овна';
        }
    }
}

function displayGreeting() {
    const params = getUrlParams();
    const firstName = params.firstname || 'Иван';
    const lastName = params.lastname || 'Иванов';
    const gender = params.gender || 'female'; // по умолчанию женский
    
    const patronymic = getPatronymic(firstName, gender);
    const prefix = gender === 'male' ? 'Уважаемый' : 'Уважаемая';
    
    const prefixElement = document.getElementById('greeting-prefix');
    const namePatronymicElement = document.getElementById('greeting-name-patronymic');
    
    prefixElement.textContent = `${prefix}`;
    namePatronymicElement.textContent = `${firstName} ${patronymic}`;
}

// Вызываем функцию после загрузки страницы
window.addEventListener('load', displayGreeting);
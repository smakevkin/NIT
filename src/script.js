import './styles/styles.styl'

const dogBreeds = [
  { id: 1, name: "Лабрадор-ретривер", size: "large", coat: "short", purpose: "companion", activity: "high", apartment: "no", country: "Канада", lifespan: "10-12 лет" },
  { id: 2, name: "Немецкая овчарка", size: "large", coat: "medium", purpose: "working", activity: "high", apartment: "no", country: "Германия", lifespan: "9-13 лет" },
  { id: 3, name: "Золотистый ретривер", size: "large", coat: "long", purpose: "companion", activity: "high", apartment: "no", country: "Великобритания", lifespan: "10-12 лет" },
  { id: 4, name: "Французский бульдог", size: "small", coat: "short", purpose: "companion", activity: "low", apartment: "yes", country: "Франция", lifespan: "10-12 лет" },
  { id: 5, name: "Бульдог", size: "medium", coat: "short", purpose: "companion", activity: "low", apartment: "yes", country: "Великобритания", lifespan: "8-10 лет" },
  { id: 6, name: "Такса", size: "small", coat: "short", purpose: "hunting", activity: "medium", apartment: "yes", country: "Германия", lifespan: "12-16 лет" },
  { id: 7, name: "Сибирский хаски", size: "large", coat: "medium", purpose: "working", activity: "high", apartment: "no", country: "Россия", lifespan: "12-14 лет" },
  { id: 8, name: "Пудель", size: "medium", coat: "curly", purpose: "companion", activity: "high", apartment: "yes", country: "Франция", lifespan: "12-15 лет" },
  { id: 9, name: "Бигль", size: "small", coat: "short", purpose: "hunting", activity: "high", apartment: "yes", country: "Великобритания", lifespan: "12-15 лет" },
  { id: 10, name: "Ротвейлер", size: "large", coat: "short", purpose: "guard", activity: "medium", apartment: "no", country: "Германия", lifespan: "8-10 лет" },
  { id: 11, name: "Йоркширский терьер", size: "small", coat: "long", purpose: "companion", activity: "medium", apartment: "yes", country: "Великобритания", lifespan: "13-16 лет" },
  { id: 12, name: "Доберман", size: "large", coat: "short", purpose: "guard", activity: "high", apartment: "no", country: "Германия", lifespan: "10-12 лет" },
  { id: 13, name: "Немецкий дог", size: "giant", coat: "short", purpose: "companion", activity: "medium", apartment: "no", country: "Германия", lifespan: "6-8 лет" },
  { id: 14, name: "Австралийская овчарка", size: "medium", coat: "medium", purpose: "shepherd", activity: "high", apartment: "no", country: "США", lifespan: "12-15 лет" },
  { id: 15, name: "Померанский шпиц", size: "small", coat: "long", purpose: "companion", activity: "medium", apartment: "yes", country: "Германия", lifespan: "12-16 лет" },
  { id: 16, name: "Ши-тцу", size: "small", coat: "long", purpose: "companion", activity: "low", apartment: "yes", country: "Китай", lifespan: "10-16 лет" },
  { id: 17, name: "Бостон-терьер", size: "small", coat: "short", purpose: "companion", activity: "medium", apartment: "yes", country: "США", lifespan: "11-13 лет" },
  { id: 18, name: "Мопс", size: "small", coat: "short", purpose: "companion", activity: "low", apartment: "yes", country: "Китай", lifespan: "12-15 лет" },
  { id: 19, name: "Боксер", size: "large", coat: "short", purpose: "guard", activity: "high", apartment: "no", country: "Германия", lifespan: "10-12 лет" },
  { id: 20, name: "Такса миниатюрная", size: "small", coat: "short", purpose: "hunting", activity: "medium", apartment: "yes", country: "Германия", lifespan: "12-16 лет" },
  { id: 21, name: "Чихуахуа", size: "small", coat: "short", purpose: "companion", activity: "medium", apartment: "yes", country: "Мексика", lifespan: "12-20 лет" },
  { id: 22, name: "Мальтийская болонка", size: "small", coat: "long", purpose: "companion", activity: "low", apartment: "yes", country: "Мальта", lifespan: "12-15 лет" },
  { id: 23, name: "Колли", size: "large", coat: "long", purpose: "shepherd", activity: "high", apartment: "no", country: "Шотландия", lifespan: "12-14 лет" },
  { id: 24, name: "Кокер-спаниель", size: "medium", coat: "long", purpose: "hunting", activity: "high", apartment: "yes", country: "Великобритания", lifespan: "12-15 лет" },
  { id: 25, name: "Вельш-корги", size: "small", coat: "medium", purpose: "shepherd", activity: "high", apartment: "yes", country: "Уэльс", lifespan: "12-15 лет" },
  { id: 26, name: "Самоед", size: "large", coat: "long", purpose: "working", activity: "high", apartment: "no", country: "Россия", lifespan: "12-14 лет" },
  { id: 27, name: "Акита-ину", size: "large", coat: "medium", purpose: "guard", activity: "medium", apartment: "no", country: "Япония", lifespan: "10-13 лет" },
  { id: 28, name: "Бассет-хаунд", size: "medium", coat: "short", purpose: "hunting", activity: "low", apartment: "yes", country: "Франция", lifespan: "10-12 лет" },
  { id: 29, name: "Мастиф", size: "giant", coat: "short", purpose: "guard", activity: "low", apartment: "no", country: "Великобритания", lifespan: "6-10 лет" },
  { id: 30, name: "Бордер-колли", size: "medium", coat: "medium", purpose: "shepherd", activity: "high", apartment: "no", country: "Великобритания", lifespan: "12-15 лет" },
  { id: 31, name: "Питбуль", size: "medium", coat: "short", purpose: "companion", activity: "high", apartment: "no", country: "США", lifespan: "12-14 лет" },
  { id: 32, name: "Шарпей", size: "medium", coat: "short", purpose: "guard", activity: "low", apartment: "yes", country: "Китай", lifespan: "8-12 лет" },
  { id: 33, name: "Веймаранер", size: "large", coat: "short", purpose: "hunting", activity: "high", apartment: "no", country: "Германия", lifespan: "10-13 лет" },
  { id: 34, name: "Кавалер-кинг-чарльз-спаниель", size: "small", coat: "long", purpose: "companion", activity: "medium", apartment: "yes", country: "Великобритания", lifespan: "9-14 лет" },
  { id: 35, name: "Бернский зенненхунд", size: "giant", coat: "long", purpose: "working", activity: "medium", apartment: "no", country: "Швейцария", lifespan: "7-10 лет" },
  { id: 36, name: "Чау-чау", size: "medium", coat: "long", purpose: "guard", activity: "low", apartment: "yes", country: "Китай", lifespan: "9-12 лет" },
  { id: 37, name: "Далматин", size: "large", coat: "short", purpose: "companion", activity: "high", apartment: "no", country: "Хорватия", lifespan: "10-13 лет" },
  { id: 38, name: "Английский сеттер", size: "large", coat: "medium", purpose: "hunting", activity: "high", apartment: "no", country: "Великобритания", lifespan: "10-12 лет" },
  { id: 39, name: "Ирландский волкодав", size: "giant", coat: "wire", purpose: "hunting", activity: "medium", apartment: "no", country: "Ирландия", lifespan: "6-8 лет" },
  { id: 40, name: "Португальская водяная собака", size: "medium", coat: "curly", purpose: "working", activity: "high", apartment: "yes", country: "Португалия", lifespan: "11-13 лет" },
  { id: 41, name: "Скай-терьер", size: "small", coat: "long", purpose: "hunting", activity: "medium", apartment: "yes", country: "Шотландия", lifespan: "12-14 лет" },
  { id: 42, name: "Афганская борзая", size: "large", coat: "long", purpose: "hunting", activity: "high", apartment: "no", country: "Афганистан", lifespan: "12-14 лет" },
  { id: 43, name: "Басенджи", size: "small", coat: "short", purpose: "hunting", activity: "high", apartment: "yes", country: "Центральная Африка", lifespan: "13-14 лет" },
  { id: 44, name: "Китайская хохлатая", size: "small", coat: "hairless", purpose: "companion", activity: "medium", apartment: "yes", country: "Китай", lifespan: "13-15 лет" },
  { id: 45, name: "Лхаса апсо", size: "small", coat: "long", purpose: "companion", activity: "medium", apartment: "yes", country: "Тибет", lifespan: "12-15 лет" },
  { id: 46, name: "Ньюфаундленд", size: "giant", coat: "long", purpose: "working", activity: "medium", apartment: "no", country: "Канада", lifespan: "8-10 лет" },
  { id: 47, name: "Папильон", size: "small", coat: "long", purpose: "companion", activity: "high", apartment: "yes", country: "Франция", lifespan: "13-15 лет" },
  { id: 48, name: "Родезийский риджбек", size: "large", coat: "short", purpose: "hunting", activity: "high", apartment: "no", country: "Зимбабве", lifespan: "10-12 лет" },
  { id: 49, name: "Сенбернар", size: "giant", coat: "long", purpose: "working", activity: "low", apartment: "no", country: "Швейцария", lifespan: "8-10 лет" },
  { id: 50, name: "Вести", size: "small", coat: "long", purpose: "hunting", activity: "high", apartment: "yes", country: "Шотландия", lifespan: "12-16 лет" }
];

// Функция для перевода значений на русский язык
function translateValue(key, value) {
  const translations = {
    size: {
      "small": "Маленькие",
      "medium": "Средние", 
      "large": "Крупные",
      "giant": "Гигантские"
    },
    coat: {
      "short": "Короткая",
      "long": "Длинная",
      "curly": "Курчавая",
      "wire": "Жесткая",
      "hairless": "Без шерсти"
    },
    purpose: {
      "companion": "Компаньон",
      "hunting": "Охотничья",
      "working": "Рабочая",
      "guard": "Охранная",
      "shepherd": "Пастушья"
    },
    activity: {
      "low": "Низкий",
      "medium": "Средний",
      "high": "Высокий"
    },
    apartment: {
      "yes": "Да",
      "no": "Нет"
    }
  };
  
  return translations[key] && translations[key][value] ? translations[key][value] : value;
}

function renderTable(breeds) {
  const tableBody = document.querySelector('tbody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  breeds.forEach(breed => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${breed.id}</td>
      <td>${breed.name}</td>
      <td>${translateValue('size', breed.size)}</td>
      <td>${translateValue('coat', breed.coat)}</td>
      <td>${translateValue('purpose', breed.purpose)}</td>
      <td>${translateValue('activity', breed.activity)}</td>
      <td>${translateValue('apartment', breed.apartment)}</td>
      <td>${breed.country}</td>
      <td>${breed.lifespan}</td>
    `;
    tableBody.appendChild(row);
  });
}

function applyFilters() {
  const sizeFilter = document.getElementById('sizeFilter').value;
  const coatFilter = document.getElementById('coatFilter').value;
  const purposeFilter = document.getElementById('purposeFilter').value;
  const activityFilter = document.getElementById('activityFilter').value;
  const apartmentFilter = document.getElementById('apartmentFilter').value;

  let filteredBreeds = dogBreeds.filter(breed => {
    return (sizeFilter === 'all' || breed.size === sizeFilter) &&
           (coatFilter === 'all' || breed.coat === coatFilter) &&
           (purposeFilter === 'all' || breed.purpose === purposeFilter) &&
           (activityFilter === 'all' || breed.activity === activityFilter) &&
           (apartmentFilter === 'all' || breed.apartment === apartmentFilter);
  });

  renderTable(filteredBreeds);
}

document.addEventListener('DOMContentLoaded', function() {
  renderTable(dogBreeds);

  document.getElementById('sizeFilter').addEventListener('change', applyFilters);
  document.getElementById('coatFilter').addEventListener('change', applyFilters);
  document.getElementById('purposeFilter').addEventListener('change', applyFilters);
  document.getElementById('activityFilter').addEventListener('change', applyFilters);
  document.getElementById('apartmentFilter').addEventListener('change', applyFilters);

  const sortButton = document.querySelector('input[type="button"]');
  if (sortButton) {
    sortButton.addEventListener('click', applyFilters);
  }
});
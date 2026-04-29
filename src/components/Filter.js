export const initialFilters = {
  name: '',
  size: 'all',
  coat: 'all',
  purpose: 'all',
  activity: 'all',
  apartment: 'all',
  country: '',
  lifeFrom: '',
  lifeTo: ''
};

const Filter = ({ filters, setFilters, resetFilters }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <fieldset>
      <legend>Фильтры для поиска</legend>

      <label>
        Название породы:
        <input name="name" type="text" value={filters.name} onChange={handleChange} />
      </label>
      <br />

      <label>
        Размер породы:
        <select name="size" value={filters.size} onChange={handleChange}>
          <option value="all">Все размеры</option>
          <option value="маленькая">Маленькие</option>
          <option value="средняя">Средние</option>
          <option value="крупная">Крупные</option>
          <option value="гигантская">Гигантские</option>
        </select>
      </label>
      <br />

      <label>
        Тип шерсти:
        <select name="coat" value={filters.coat} onChange={handleChange}>
          <option value="all">Любой тип</option>
          <option value="короткая">Короткая</option>
          <option value="длинная">Длинная</option>
          <option value="курчавая">Курчавая</option>
          <option value="жесткая">Жесткая</option>
          <option value="без шерсти">Без шерсти</option>
        </select>
      </label>
      <br />

      <label>
        Назначение:
        <select name="purpose" value={filters.purpose} onChange={handleChange}>
          <option value="all">Все назначения</option>
          <option value="компаньон">Компаньон</option>
          <option value="охотничья">Охотничья</option>
          <option value="рабочая">Рабочая</option>
          <option value="охранная">Охранная</option>
          <option value="пастушья">Пастушья</option>
        </select>
      </label>
      <br />

      <label>
        Уровень активности:
        <select name="activity" value={filters.activity} onChange={handleChange}>
          <option value="all">Любой уровень</option>
          <option value="низкая">Низкий</option>
          <option value="средняя">Средний</option>
          <option value="высокая">Высокий</option>
        </select>
      </label>
      <br />

      <label>
        Подходит для квартиры:
        <select name="apartment" value={filters.apartment} onChange={handleChange}>
          <option value="all">Все</option>
          <option value="да">Да</option>
          <option value="нет">Нет</option>
        </select>
      </label>
      <br />

      <label>
        Страна происхождения:
        <input name="country" type="text" value={filters.country} onChange={handleChange} />
      </label>
      <br />

      <label>
        Продолжительность жизни от:
        <input name="lifeFrom" type="number" value={filters.lifeFrom} onChange={handleChange} />
      </label>
      <br />

      <label>
        Продолжительность жизни до:
        <input name="lifeTo" type="number" value={filters.lifeTo} onChange={handleChange} />
      </label>
      <br />

      <input type="button" value="Очистить фильтр" onClick={resetFilters} />
    </fieldset>
  );
};

export default Filter;

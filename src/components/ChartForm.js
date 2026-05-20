const CATEGORICAL_FIELDS = [
  'Размер',
  'Тип шерсти',
  'Назначение',
  'Активность',
  'Для квартиры',
  'Страна происхождения',
];

export const initialChartConfig = {
  chartType: 'bar',
  groupField: 'Размер',
  valueField: 'count',
  visible: false,
};

const ChartForm = ({ config, setConfig }) => {
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <fieldset className="chart-form">
      <legend>Настройка диаграммы</legend>

      <label>
        Показать диаграмму:
        <input
          type="checkbox"
          name="visible"
          checked={config.visible}
          onChange={handleChange}
        />
      </label>

      {config.visible && (
        <div className="chart-form-options">
          <label>
            Тип диаграммы:
            <select name="chartType" value={config.chartType} onChange={handleChange}>
              <option value="bar">Столбчатая</option>
              <option value="scatter">Точечная</option>
            </select>
          </label>
          <br />

          <label>
            Группировать по полю:
            <select name="groupField" value={config.groupField} onChange={handleChange}>
              {CATEGORICAL_FIELDS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            Отображаемое значение:
            <select name="valueField" value={config.valueField} onChange={handleChange}>
              <option value="count">Количество пород</option>
              <option value="avgLife">Средняя продолжительность жизни (лет)</option>
            </select>
          </label>

        </div>
      )}
    </fieldset>
  );
};

export default ChartForm;

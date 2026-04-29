const SortPanel = ({ fields, sortRules, setSortRules, resetSort }) => {
  const changeRule = (index, key, value) => {
    const nextRules = sortRules.map((rule, ruleIndex) => (
      ruleIndex === index ? { ...rule, [key]: value } : rule
    ));
    setSortRules(nextRules);
  };

  return (
    <fieldset>
      <legend>Сортировка</legend>
      {sortRules.map((rule, index) => (
        <div className="sort-row" key={index}>
          <span>{index + 1} уровень:</span>
          <select value={rule.field} onChange={(event) => changeRule(index, 'field', event.target.value)}>
            <option value="">Не выбрано</option>
            {fields.map((field) => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
          <select value={rule.direction} onChange={(event) => changeRule(index, 'direction', event.target.value)}>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>
      ))}
      <input type="button" value="Очистить сортировку" onClick={resetSort} />
    </fieldset>
  );
};

export default SortPanel;

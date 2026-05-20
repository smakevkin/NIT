import { useEffect, useMemo, useState } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter, { initialFilters } from './Filter.js';
import SortPanel from './SortPanel.js';
import ChartForm, { initialChartConfig } from './ChartForm.js';
import Charts from './Charts.js';

const emptySortRules = [
  { field: '', direction: 'asc' },
  { field: '', direction: 'asc' },
  { field: '', direction: 'asc' }
];

const getLifeBounds = (value) => {
  const numbers = String(value).match(/\d+/g)?.map(Number) || [0, 0];
  return {
    min: numbers[0] ?? 0,
    max: numbers[1] ?? numbers[0] ?? 0,
    avg: ((numbers[0] ?? 0) + (numbers[1] ?? numbers[0] ?? 0)) / 2
  };
};

const getSortValue = (row, field) => {
  if (field === 'Продолжительность жизни') {
    return getLifeBounds(row[field]).avg;
  }
  return row[field];
};

const compareValues = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b), 'ru', { numeric: true, sensitivity: 'base' });
};

const Table = ({ data, amountRows = 10, usePagination = true }) => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [sortRules, setSortRules] = useState(emptySortRules);
  const [chartConfig, setChartConfig] = useState(initialChartConfig);

  const fields = Object.keys(data[0]);

  const filteredData = useMemo(() => {
    return data.filter((dog) => {
      const life = getLifeBounds(dog['Продолжительность жизни']);
      const lifeFrom = filters.lifeFrom === '' ? -Infinity : Number(filters.lifeFrom);
      const lifeTo = filters.lifeTo === '' ? Infinity : Number(filters.lifeTo);

      return dog['Название породы'].toLowerCase().includes(filters.name.toLowerCase())
        && (filters.size === 'all' || dog['Размер'] === filters.size)
        && (filters.coat === 'all' || dog['Тип шерсти'] === filters.coat)
        && (filters.purpose === 'all' || dog['Назначение'] === filters.purpose)
        && (filters.activity === 'all' || dog['Активность'] === filters.activity)
        && (filters.apartment === 'all' || dog['Для квартиры'] === filters.apartment)
        && dog['Страна происхождения'].toLowerCase().includes(filters.country.toLowerCase())
        && life.min >= lifeFrom
        && life.max <= lifeTo;
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    const activeRules = sortRules.filter((rule) => rule.field !== '');
    const result = [...filteredData];

    result.sort((first, second) => {
      for (const rule of activeRules) {
        const firstValue = getSortValue(first, rule.field);
        const secondValue = getSortValue(second, rule.field);
        const compare = compareValues(firstValue, secondValue);

        if (compare !== 0) {
          return rule.direction === 'asc' ? compare : -compare;
        }
      }
      return 0;
    });

    return result;
  }, [filteredData, sortRules]);

  useEffect(() => {
    setActivePage(1);
  }, [filters, sortRules]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / Number(amountRows)));
  const startIndex = (activePage - 1) * Number(amountRows);
  const currentRows = usePagination
    ? sortedData.slice(startIndex, startIndex + Number(amountRows))
    : sortedData;

  const resetFilters = () => setFilters(initialFilters);
  const resetSort = () => setSortRules(emptySortRules);

  return (
    <>
      <Filter filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
      <SortPanel fields={fields} sortRules={sortRules} setSortRules={setSortRules} resetSort={resetSort} />
      <ChartForm config={chartConfig} setConfig={setChartConfig} />

      <table border="1" width="100%">
        <TableHead head={fields} />
        <TableBody body={currentRows} />
      </table>

      {usePagination && (
        <div className="pagination">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
            <span
              key={page}
              className={page === activePage ? 'page-number active' : 'page-number'}
              onClick={() => setActivePage(page)}
            >
              {page}
            </span>
          ))}
        </div>
      )}

      {chartConfig.visible && (
        <Charts data={filteredData} config={chartConfig} />
      )}
    </>
  );
};

export default Table;

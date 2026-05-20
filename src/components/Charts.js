import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

const COLORS = [
  '#4a90d9',
  '#50c878',
  '#ff6b6b',
  '#ffd700',
  '#9b59b6',
  '#e67e22',
  '#1abc9c',
  '#e74c3c',
  '#3498db',
  '#f39c12',
];

const parseAvgLife = (value) => {
  const nums = String(value).match(/\d+/g)?.map(Number) || [0];
  return nums.length >= 2 ? (nums[0] + nums[1]) / 2 : nums[0];
};

const groupData = (data, groupField, valueField) => {
  const groups = {};

  data.forEach((dog) => {
    const key = dog[groupField] ?? 'Н/Д';
    if (!groups[key]) {
      groups[key] = { name: key, count: 0, lifetimeSum: 0 };
    }
    groups[key].count++;
    groups[key].lifetimeSum += parseAvgLife(dog['Продолжительность жизни']);
  });

  return Object.values(groups)
    .sort((a, b) => String(a.name).localeCompare(String(b.name), 'ru'))
    .map((g, i) => ({
      name: g.name,
      x: i,
      value:
        valueField === 'count'
          ? g.count
          : Math.round((g.lifetimeSum / g.count) * 10) / 10,
    }));
};

const CustomBarTooltip = ({ active, payload, valueLabel }) => {
  if (active && payload && payload.length) {
    const d = payload[0]?.payload;
    return (
      <div className="chart-tooltip">
        <strong>{d?.name}</strong>
        <div>
          {valueLabel}: <b>{d?.value}</b>
        </div>
      </div>
    );
  }
  return null;
};

const CustomScatterTooltip = ({ active, payload, valueLabel, chartData }) => {
  if (active && payload && payload.length) {
    const d = payload[0]?.payload;
    return (
      <div className="chart-tooltip">
        <strong>{d?.name}</strong>
        <div>
          {valueLabel}: <b>{d?.value}</b>
        </div>
      </div>
    );
  }
  return null;
};

const Charts = ({ data, config }) => {
  const { chartType, groupField, valueField } = config;

  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        Нет данных для построения диаграммы (попробуйте изменить фильтры)
      </div>
    );
  }

  const chartData = groupData(data, groupField, valueField);
  const valueLabel =
    valueField === 'count' ? 'Количество пород' : 'Ср. продолж. жизни (лет)';
  const yAxisLabel = valueField === 'count' ? 'Кол-во' : 'Лет';
  const title =
    chartType === 'bar' ? 'Столбчатая диаграмма' : 'Точечная диаграмма';

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">
        {title}: «{groupField}» → «{valueLabel}»
        <span className="chart-count">
          ({data.length} {data.length === 1 ? 'порода' : data.length < 5 ? 'породы' : 'пород'})
        </span>
      </h3>

      {chartType === 'bar' && (
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={chartData}
            margin={{ top: 16, right: 30, left: 20, bottom: 90 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              angle={-40}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                offset: -4,
                style: { fontSize: 12 },
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomBarTooltip valueLabel={valueLabel} />} />
            <Bar dataKey="value" name={valueLabel} radius={[4, 4, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartType === 'scatter' && (
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 16, right: 30, left: 20, bottom: 90 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[-0.5, chartData.length - 0.5]}
              tickCount={chartData.length}
              tickFormatter={(v) => {
                const idx = Math.round(v);
                return chartData[idx]?.name ?? '';
              }}
              angle={-40}
              textAnchor="end"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="value"
              label={{
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                offset: -4,
                style: { fontSize: 12 },
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              content={
                <CustomScatterTooltip
                  valueLabel={valueLabel}
                  chartData={chartData}
                />
              }
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter data={chartData} name={valueLabel}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Charts;

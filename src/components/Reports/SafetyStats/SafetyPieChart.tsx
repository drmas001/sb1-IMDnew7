import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SafetyData {
  type: string;
  count: number;
  color: string;
  description: string;
}

interface SafetyPieChartProps {
  data: SafetyData[];
}

const SafetyPieChart: React.FC<SafetyPieChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-4">Distribution by Type</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ type, count }) => `${type}: ${count}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [
                <div key="tooltip" className="space-y-1">
                  <div>{value} patients</div>
                  <div className="text-xs text-gray-500">{props.payload.description}</div>
                </div>,
                name
              ]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.5rem'
              }}
            />
            <Legend 
              formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SafetyPieChart;
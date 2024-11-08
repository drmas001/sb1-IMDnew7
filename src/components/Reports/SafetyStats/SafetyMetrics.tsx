import React from 'react';
import { Shield, Activity, Clock } from 'lucide-react';

interface SafetyMetricsProps {
  total: number;
  safetyRate: number;
  averageStay: number;
}

const SafetyMetrics: React.FC<SafetyMetricsProps> = ({ total, safetyRate, averageStay }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Shield className="h-4 w-4 text-indigo-600" />
            <p className="text-sm font-medium text-indigo-600">Safety Admissions</p>
          </div>
          <p className="text-2xl font-bold text-indigo-900">{total}</p>
          <p className="text-xs text-indigo-600">Currently active</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Activity className="h-4 w-4 text-green-600" />
            <p className="text-sm font-medium text-green-600">Safety Rate</p>
          </div>
          <p className="text-2xl font-bold text-green-900">{safetyRate}%</p>
          <p className="text-xs text-green-600">of total admissions</p>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-1">
          <Clock className="h-4 w-4 text-blue-600" />
          <p className="text-sm font-medium text-blue-600">Average Stay Duration</p>
        </div>
        <p className="text-2xl font-bold text-blue-900">{averageStay} days</p>
        <p className="text-xs text-blue-600">for safety admissions</p>
      </div>
    </div>
  );
};

export default SafetyMetrics;
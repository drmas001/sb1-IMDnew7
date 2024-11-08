import React from 'react';
import { Shield } from 'lucide-react';
import { usePatientStore } from '../../stores/usePatientStore';
import SafetyPieChart from './SafetyStats/SafetyPieChart';
import SafetyMetrics from './SafetyStats/SafetyMetrics';
import SafetyTypeList from './SafetyStats/SafetyTypeList';
import SafetyLegend from './SafetyStats/SafetyLegend';
import { COLORS, SAFETY_DESCRIPTIONS } from './SafetyStats/constants';
import { filterSafetyAdmissions, calculateAverageStayDuration } from './SafetyStats/utils';

interface SafetyAdmissionStatsProps {
  dateFilter: {
    startDate: string;
    endDate: string;
    period: string;
  };
}

const SafetyAdmissionStats: React.FC<SafetyAdmissionStatsProps> = ({ dateFilter }) => {
  const { patients } = usePatientStore();

  const getSafetyData = () => {
    const filtered = filterSafetyAdmissions(patients, dateFilter.startDate, dateFilter.endDate, 'active');

    const counts = {
      emergency: 0,
      observation: 0,
      'short-stay': 0
    };

    filtered.forEach(patient => {
      const activeAdmission = patient.admissions?.find(admission => 
        admission.status === 'active' &&
        admission.safety_type
      );
      if (activeAdmission?.safety_type) {
        counts[activeAdmission.safety_type as keyof typeof counts]++;
      }
    });

    return Object.entries(counts).map(([key, value]) => ({
      type: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      count: value,
      color: COLORS[key as keyof typeof COLORS],
      description: SAFETY_DESCRIPTIONS[key as keyof typeof SAFETY_DESCRIPTIONS]
    }));
  };

  const data = getSafetyData();
  const total = filterSafetyAdmissions(patients, dateFilter.startDate, dateFilter.endDate, 'active').length;
  const activeTotal = patients.filter(patient =>
    patient.admissions?.some(admission =>
      admission.status === 'active' &&
      new Date(admission.admission_date) >= new Date(dateFilter.startDate) &&
      new Date(admission.admission_date) <= new Date(dateFilter.endDate)
    )
  ).length;
  const safetyRate = activeTotal > 0 ? Math.round((total / activeTotal) * 100) : 0;
  const averageStay = calculateAverageStayDuration(patients, dateFilter.startDate, dateFilter.endDate);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Shield className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Safety Admission Statistics</h2>
            <p className="text-sm text-gray-500">Active safety admissions overview</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SafetyPieChart data={data} />
        
        <div className="space-y-6">
          <SafetyMetrics
            total={total}
            safetyRate={safetyRate}
            averageStay={averageStay}
          />
          
          <SafetyTypeList data={data} total={total} />
          <SafetyLegend />
        </div>
      </div>
    </div>
  );
};

export default SafetyAdmissionStats;
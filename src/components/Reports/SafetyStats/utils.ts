import { Patient } from '../../types/patient';

export const filterSafetyAdmissions = (
  patients: Patient[],
  startDate: string,
  endDate: string,
  status: 'active' | 'discharged' | undefined = undefined
) => {
  return patients.filter(patient =>
    patient.admissions?.some(admission =>
      admission.safety_type &&
      (status ? admission.status === status : true) &&
      new Date(admission.admission_date) >= new Date(startDate) &&
      new Date(admission.admission_date) <= new Date(endDate)
    )
  );
};

export const calculateAverageStayDuration = (
  patients: Patient[],
  startDate: string,
  endDate: string
) => {
  const safetyAdmissions = filterSafetyAdmissions(patients, startDate, endDate, 'discharged');

  if (safetyAdmissions.length === 0) return 0;

  const totalDays = safetyAdmissions.reduce((sum, patient) => {
    const admission = patient.admissions?.find(a => 
      a.safety_type && 
      a.status === 'discharged' && 
      a.discharge_date
    );
    if (admission) {
      const admissionDate = new Date(admission.admission_date);
      const dischargeDate = new Date(admission.discharge_date!);
      return sum + Math.ceil((dischargeDate.getTime() - admissionDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return sum;
  }, 0);

  return Math.round(totalDays / safetyAdmissions.length);
};
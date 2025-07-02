import type { HealthParameter } from "@/ai/flows/flag-abnormal-values";

export const getMockHealthData = (): HealthParameter[] => [
  { name: 'Hemoglobin A1c', value: '6.8', unit: '%', normalRange: '4.0 - 5.6' },
  { name: 'Total Cholesterol', value: '210', unit: 'mg/dL', normalRange: '< 200' },
  { name: 'LDL Cholesterol', value: '140', unit: 'mg/dL', normalRange: '< 100' },
  { name: 'HDL Cholesterol', value: '45', unit: 'mg/dL', normalRange: '>= 40' },
  { name: 'Triglycerides', value: '160', unit: 'mg/dL', normalRange: '< 150' },
  { name: 'Blood Glucose', value: '110', unit: 'mg/dL', normalRange: '70 - 99' },
  { name: 'Vitamin D', value: '25', unit: 'ng/mL', normalRange: '30 - 100' },
  { name: 'TSH', value: '4.1', unit: 'mIU/L', normalRange: '0.4 - 4.0' },
  { name: 'White Blood Cell Count', value: '8.5', unit: 'x10^9/L', normalRange: '4.5 - 11.0' },
];

export const getMockTrendData = () => {
    const data = [
      { date: 'Jan 2023', 'Blood Glucose': 105, 'Total Cholesterol': 220, 'Hemoglobin A1c': 6.5 },
      { date: 'Apr 2023', 'Blood Glucose': 102, 'Total Cholesterol': 215, 'Hemoglobin A1c': 6.2 },
      { date: 'Jul 2023', 'Blood Glucose': 115, 'Total Cholesterol': 205, 'Hemoglobin A1c': 6.4 },
      { date: 'Oct 2023', 'Blood Glucose': 108, 'Total Cholesterol': 200, 'Hemoglobin A1c': 6.1 },
      { date: 'Jan 2024', 'Blood Glucose': 110, 'Total Cholesterol': 210, 'Hemoglobin A1c': 6.8 },
    ];
    return data;
};

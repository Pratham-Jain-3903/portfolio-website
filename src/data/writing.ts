export type WritingStatus = 'approved' | 'needs-copy';

export type WritingEntry = {
  id: string;
  url: string;
  status: WritingStatus;
  title?: string;
  date?: string;
  excerpt?: string;
};

export const writingEntries: readonly WritingEntry[] = [
  {
    id: 'iiit-raichur-7274800882293092352',
    url: 'https://www.linkedin.com/posts/iiitraichur_iiitraichur-iiitr-iiitr-activity-7274800882293092352-2oK6?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0',
    status: 'needs-copy',
  },
  {
    id: 'amazon-ml-challenge-7243848942486966272',
    url: 'https://www.linkedin.com/posts/pratham-jain-56682620a_amazonmlchallenge-machinelearning-visionlanguage-activity-7243848942486966272-BL4d?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0',
    status: 'needs-copy',
  },
  {
    id: 'google-genai-exchange-7317445686927544321',
    url: 'https://www.linkedin.com/posts/pratham-jain-56682620a_google-genaiexchange-googlecloud-activity-7317445686927544321-mb2B?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0',
    status: 'needs-copy',
  },
  {
    id: 'classrooms-real-world-7295481131729117184',
    url: 'https://www.linkedin.com/posts/pratham-jain-56682620a_from-classrooms-to-real-world-impact-activity-7295481131729117184-6egB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADUozZ4BLGo-pv19AgZuZXbWiYOrD-5x_R0',
    status: 'needs-copy',
  },
];

export const publicWritingEntries = writingEntries.filter(
  (entry) => entry.status === 'approved'
);

export const linkedInPostUrls = writingEntries.map(({ url }) => url);
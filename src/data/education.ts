export type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  cgpa: string;
  year?: string;
  activities?: string;
  skills?: readonly string[];
};

export const educationEntries = [
  {
    id: 'iim-visakhapatnam-mba',
    degree: 'Master of Business Administration - MBA, Business Administration and Management, General',
    institution: 'Indian Institute of Management Visakhapatnam',
    cgpa: '4.0 / 4.0',
    year: 'Jan 2026 - Jan 2028',
    activities: '',
    skills: [],
  },
  {
    id: 'iiit-raichur-btech',
    degree: 'Bachelor of Technology - BTech, Computer Science and Engineering, Finance',
    institution: 'Indian Institute of Information Technology, Raichur',
    cgpa: '8.31 / 10.0',
    year: 'Dec 2021 - Apr 2025',
    activities: 'Public Relations Head | CODESOC (Programming) | Google Developer Student Club | Electrogeeks (Electronics & Robotics) | Finspiration (Financial Literacy) | E-Cell, IIIT Raichur',
    skills: ['HTML', 'Research', 'Public Speaking', 'Leadership', 'Python', 'Machine Learning'],
  },
] satisfies readonly EducationEntry[];
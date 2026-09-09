export type VolunteerExperienceEntry = {
  id: string;
  role: string;
  company: string;
  duration: string;
  category?: string;
  description?: string;
  logoUrl?: string;
  location?: string;
  skills?: readonly string[];
};

export const volunteerExperienceEntries = [
  {
    id: 'rims-database-developer',
    role: 'Database Developer',
    company: 'Raichur Institute of Medical Sciences',
    duration: 'Aug 2024 - Present 10 months',
    category: 'Science and Technology',
    description: 'Identified and Addressed Key Challenges: Discovered that the Pathology Department at RIMS relied on physical storage for medical records, leading to difficulties in searching and accessing relevant slides due to the high cost and inefficiency of physical archives. Developed Digital Solution: Designed and implemented a comprehensive digital archive system using MongoDB and Streamlit. This solution was aimed at transitioning the pathology department from expensive physical storage to a…Show more',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6i3ntEYZoC5TD0DDAUM43iIKY0SbKU91ZJA&s',
  },
  {
    id: 'national-service-scheme-volunteer',
    role: 'Student Volunteer',
    company: 'National Service Scheme',
    duration: 'Dec 2021 - Present 3 years 6 months',
    logoUrl: 'https://students.iiitr.ac.in/assets/images/club/nss-inverted.png',
  },
  {
    id: 'iiit-raichur-public-relations',
    role: 'Head of Public Relations',
    company: 'Indian Institute of Information Technology, Raichur',
    duration: 'Sep 2022 - Present 2 years 9 months',
    category: 'Education',
    logoUrl: 'https://students.iiitr.ac.in/assets/images/logo/logo_white.png',
  },
  {
    id: 'ecell-student-mentor',
    role: 'Student Mentor',
    company: 'E-Cell, IIIT Raichur',
    duration: 'Nov 2024 - Present 7 months',
    category: 'Economic Empowerment',
    logoUrl: 'https://students.iiitr.ac.in/assets/images/club/E_cell_logo.jpg',
  },
  {
    id: 'epoch-iit-hyderabad-member',
    role: 'Member',
    company: 'Epoch, IIT Hyderabad',
    duration: 'Jan 2024 - Apr 2025 · 1 yr 4 mos',
    category: 'Clubs',
    location: 'Hyderabad, Telangana, India · Hybrid',
    description: 'Participated in data science workshops and collaborative projects focusing on applied machine learning and data analysis.',
    skills: ['Data Science', 'Applied Machine Learning', 'Python'],
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/IIT_Hyderabad_Logo.svg',
  },
  {
    id: 'lambda-iit-hyderabad-member',
    role: 'Member',
    company: 'Lambda, IIT Hyderabad',
    duration: 'Jan 2024 - Apr 2025 · 1 yr 4 mos',
    category: 'Clubs',
    location: 'Hyderabad, Telangana, India · Hybrid',
    description: 'Contributed to community learning sessions and project collaborations around data science and ML topics.',
    skills: ['Data Science', 'Applied Machine Learning'],
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/IIT_Hyderabad_Logo.svg',
  },
] satisfies readonly VolunteerExperienceEntry[];
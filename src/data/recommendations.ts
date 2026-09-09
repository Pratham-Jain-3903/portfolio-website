export type Recommendation = {
  id: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
  recommendation: string;
  pullQuote: string;
};

export const recommendations = [
  {
    id: 'shruti-jaiswal',
    name: 'Shruti Jaiswal',
    title: 'Artificial Intelligence Specialist',
    relationship: 'Mentor',
    date: 'January 2025',
    pullQuote: 'His dedication to understanding data preprocessing, feature engineering, and ML algorithms was truly commendable.',
    recommendation: 'I had the pleasure of mentoring Pratham on a project focused on developing a breast cancer prediction models. His dedication to understanding the complexities of data preprocessing, feature engineering, and machine learning algorithms was truly commendable. Pratham demonstrated excellent problem-solving skills, a keen eye for detail, and a collaborative spirit throughout the project.\n\nHis ability to translate theoretical knowledge into a practical and impactful solution was impressive. I am confident that Pratham will excel in his future endeavors and make significant contributions to any team he is part of.',
  },
  {
    id: 'suresh-chavhan',
    name: 'Suresh Chavhan',
    title: 'Assistant Professor, IISER Thiruvananthapuram',
    relationship: 'Professor & PRO',
    date: 'October 2024',
    pullQuote: 'Exceptional in content creation, planning, and executing tasks efficiently. His design skills and coding expertise are commendable.',
    recommendation: 'I had the opportunity to work closely with Mr. Pratham from October 2022 to October 2024, in my roles as PRO, course instructor, and project guide. Pratham is exceptional in content creation, planning, and executing tasks efficiently. His design skills and coding expertise, particularly in the IoT and computer network labs, are commendable.\n\nAdditionally, his ability to generate high-quality reports is outstanding, showcasing his attention to detail and professionalism. It has been a pleasure to guide him, and I am confident he will continue to achieve great success.',
  },
  {
    id: 'jahnvi-tiwari',
    name: 'Jahnvi Tiwari',
    title: 'Assistant Professor, IIIT Raichur',
    relationship: 'Project Guide',
    date: 'October 2024',
    pullQuote: 'Strong work ethic, thorough understanding of his subjects, and impressive knowledge of AI and Machine Learning.',
    recommendation: 'I am pleased to recommend Pratham Jain, who has completed two projects under my supervision. Pratham has consistently demonstrated a strong work ethic, a thorough understanding of his subjects, and an impressive knowledge of AI and Machine Learning. He approaches his work with diligence and enthusiasm, and his ability to grasp complex concepts and apply them effectively is commendable.',
  },
  {
    id: 'mitalee-agrawal',
    name: 'Mitalee Agrawal',
    title: 'LinkedIn Top PR Voice | e4m 40 under 40',
    relationship: 'Mentor',
    date: 'October 2024',
    pullQuote: 'His leadership and focus on soft skills like critical thinking, creativity, and collaboration are truly commendable.',
    recommendation: "It has been a great experience working with Pratham as the Student PR Council Head, leading a team of over 20 members. His leadership and focus on soft skills like critical thinking, creativity, and collaboration have truly commendable. Pratham's adaptability, attention to detail, problem-solving abilities, and communication skills have kept the team motivated and organized. I am confident this experience will be a key differentiator in any role he takes on in the future.",
  },
] satisfies readonly Recommendation[];
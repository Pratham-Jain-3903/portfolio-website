export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  duration: string;
  location?: string;
  projectTitle?: string;
  projectDuration?: string;
  logoUrl?: string;
  responsibilities: readonly string[];
  skills?: readonly string[];
  isParent?: boolean;
  parentCompany?: string;
};

export function groupExperiencesByCompany(
  experiences: readonly ExperienceEntry[]
): Map<string, ExperienceEntry[]> {
  const companies = new Map<string, ExperienceEntry[]>();

  experiences.forEach((experience) => {
    const companyName = experience.parentCompany || experience.company;
    const companyExperiences = companies.get(companyName) ?? [];

    companyExperiences.push(experience);
    companies.set(companyName, companyExperiences);
  });

  companies.forEach((companyExperiences, companyName) => {
    companyExperiences.sort((first, second) => {
      const firstStart = new Date(first.duration.split(' - ')[0]);
      const secondStart = new Date(second.duration.split(' - ')[0]);

      return secondStart.getTime() - firstStart.getTime();
    });
    companies.set(companyName, companyExperiences);
  });

  return companies;
}
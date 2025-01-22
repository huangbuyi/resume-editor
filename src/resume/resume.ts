export interface Resume {
  name: string;
  title: string;
  profilePicture?: string;
  infos: Info[];
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  interests: string[];
  introduction: string;
}

export interface Info {
  label: string;
  value: string | number;
  icon?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  projects?: Project[];
}

export interface Project {
  name: string;
  title: string;
  excerpt: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const DateFormat = 'YYYY-MM';


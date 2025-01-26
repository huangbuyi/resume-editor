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

export interface ResumeData {
  name?: string;
  title?: string;
  profilePicture?: string;
  infos?: Omit<Info, 'id'>[];
  skills?: Omit<Skill, 'id'>[];
  experiences?: Omit<Experience, 'id'>[];
  educations?: Omit<Education, 'id'>[];
  projects?: Omit<Project, 'id'>[];
  interests?: string[];
  introduction?: string;
  version: number;
}

export interface Info {
  id: number;
  label: string;
  value: string | number;
  icon?: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
}

export interface Experience {
  id: number;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  projects?: Project[];
}

export interface Project {
  id: number;
  name: string;
  title: string;
  excerpt: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const DateFormat = 'YYYY-MM';


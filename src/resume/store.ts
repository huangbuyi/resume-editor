import { create} from 'zustand';
import { Education, Experience, Info, Project, Resume, ResumeData, Skill } from './resume';
import demo from './demo.json';

export interface ResumeStore extends Resume {
  load: (data: ResumeData) => void;

  setName: (name: string) => void;
  setTitle: (title: string) => void;
  setIntroduction: (introduction: string) => void;
  setProfilePicture: (profilePicture: string) => void;

  addProject: (project: Omit<Project, 'id'>) => void;
  addInterest: (interest: string) => void;
  addInfo: (info: Omit<Info, 'id'>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;

  removeInfo: (index: number) => void;
  removeSkill: (index: number) => void;
  removeExperience: (index: number) => void;
  removeEducation: (index: number) => void;
  removeProject: (index: number) => void;
  removeInterest: (index: number) => void;

  setInfo: (index: number, info: Partial<Info>) => void;
  setSkill: (index: number, skill: Partial<Skill>) => void;
  setExperience: (index: number, experience: Partial<Experience>) => void;
  setEducation: (index: number, education: Partial<Education>) => void;
  setProject: (index: number, project: Partial<Project>) => void;
  setInterest: (index: number, interest: string) => void;

  setInfos: (infos: Info[]) => void;
  setSkills: (skills: Skill[]) => void;
  setExperiences: (experiences: Experience[]) => void;
  setEducations: (educations: Education[]) => void;
  setProjects: (projects: Project[]) => void;
  setInterests: (interests: string[]) => void;
}

const GlobalId = {
  info: 0,
  skill: 0,
  experience: 0,
  education: 0,
  project: 0,
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  name: '',
  title: '',
  introduction: '',
  profilePicture: '',
  infos: [],
  skills: [],
  experiences: [],
  educations: [],
  projects: [],
  interests: [],

  load: (data: ResumeData) => {
    try {
      const store = get();
      store.setName(data.name || '');
      store.setTitle(data.title || '');
      store.setIntroduction(data.introduction || '');
      store.setProfilePicture(data.profilePicture || '');
      store.setInfos([]);
      store.setSkills([]);
      store.setExperiences([]);
      store.setEducations([]);
      store.setProjects([]);
      store.setInterests([]);
      if (data.infos) data.infos.forEach(info => store.addInfo(info));
      if (data.skills) data.skills.forEach(skill => store.addSkill(skill));
      if (data.experiences) data.experiences.forEach(experience => store.addExperience(experience));
      if (data.educations) data.educations.forEach(education => store.addEducation(education));
      if (data.projects) data.projects.forEach(project => store.addProject(project));
      if (data.interests) data.interests.forEach(interest => store.addInterest(interest));
      
    } catch (e) {
      console.error(e);
    }
  },

  setName: (name: string) => set({ name }),
  setTitle: (title: string) => set({ title }),
  setIntroduction: (introduction: string) => set({ introduction }),
  setProfilePicture: (profilePicture: string) => set({ profilePicture }),

  addInfo: (info: Omit<Info, 'id'>) => set((state) => ({ infos: [...state.infos, Object.assign(info, { id: GlobalId.info++ })] })),
  addSkill: (skill: Omit<Skill, 'id'>) => set((state) => ({ skills: [...state.skills, Object.assign(skill, { id: GlobalId.skill++ })] })),
  addExperience: (experience: Omit<Experience, 'id'>) => set((state) => ({ experiences: [...state.experiences, Object.assign(experience, { id: GlobalId.experience++ })] })),
  addEducation: (education: Omit<Education, 'id'>) => set((state) => ({ educations: [...state.educations, Object.assign(education, { id: GlobalId.education++ })]})),
  addProject: (project: Omit<Project, 'id'>) => set((state) => ({ projects: [...state.projects, Object.assign(project, { id: GlobalId.project++ })] })),
  addInterest: (interest: string) => set((state) => ({ interests: state.interests.includes(interest) ? state.interests : [...state.interests, interest] })),
  
  removeInfo: (index: number) => set((state) => ({ infos: state.infos.filter((_, i) => i !== index) })),
  removeSkill: (index: number) => set((state) => ({ skills: state.skills.filter((_, i) => i !== index) })),
  removeExperience: (index: number) => set((state) => ({ experiences: state.experiences.filter((_, i) => i !==index) })),
  removeEducation: (index: number) => set((state) => ({ educations: state.educations.filter((_, i) => i !== index) })),
  removeProject: (index: number) => set((state) => ({ projects: state.projects.filter((_, i) => i !== index) })),
  removeInterest: (index: number) => set((state) => ({ interests: state.interests.filter((_, i) => i !== index) })),

  setInfo: (index: number, info: Partial<Info>) => set((state) => {
    const infos = [...state.infos];
    infos[index] = Object.assign(infos[index], info);
    return { infos };
  }),
  setSkill: (index: number, skill: Partial<Skill>) => set((state) => {
    const skills = [...state.skills];
    skills[index] = Object.assign(skills[index], skill);
    return { skills };
  }),
  setExperience: (index: number, experience: Partial<Experience>) => set((state) => {
    const experiences = [...state.experiences];
    experiences[index] = Object.assign(experiences[index], experience);
    return { experiences };
  }),
  setEducation: (index: number, education: Partial<Education>) => set((state) => {
    const educations = [...state.educations];
    educations[index] = Object.assign(educations[index], education);
    return { educations };
  }),
  setProject: (index: number, project: Partial<Project>) => set((state) => {
    const projects = [...state.projects];
    projects[index] = Object.assign(projects[index], project);
    return { projects };
  }),
  setInterest: (index: number, interest: string) => set((state) => {
    const interests = [...state.interests];
    interests[index] = interest;
    return { interests };
  }),

  setInfos: (infos: Info[]) => set({infos}),
  setSkills: (skills: Skill[]) => set({skills}),
  setExperiences: (experiences: Experience[]) => set({experiences}),
  setEducations: (educations: Education[]) => set({educations}),
  setProjects: (projects: Project[]) => set({projects}),
  setInterests: (interests: string[]) => set({interests}),
}))

useResumeStore.getState().load(demo);
import { create} from 'zustand';
import { Education, Experience, Info, Project, Resume, Skill } from './resume';

export interface ResumeStore extends Resume {
  setName: (name: string) => void;
  setTitle: (title: string) => void;
  setIntroduction: (introduction: string) => void;
  setProfilePicture: (profilePicture: string) => void;

  addProject: (project: Project) => void;
  addInterest: (interest: string) => void;
  addInfo: (info: Info) => void;
  addSkill: (skill: Skill) => void;
  addExperience: (experience: Experience) => void;
  addEducation: (education: Education) => void;

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
}


const demoExprDesc1 = 
`- 领导产品开发全过程，包括市场调研、需求收集、竞品分析、功能设计、原型制作、用户体验优化等。
- 与研发、设计、市场、运营等多个部门紧密合作，协调资源，确保项目按时按质完成。
- 监控产品性能指标，基于数据驱动的原则进行迭代更新，持续提升产品质量和用户体验。
- 成功推出多款移动应用和服务平台，其中某款APP用户量突破百万大关，获得广泛好评。`;

const demoExprDesc2 = 
`- 协助产品经理完成日常任务，参与产品规划和执行细节讨论。
- 支持用户反馈处理和客服支持工作，收集整理用户意见用于改进产品。
- 参与制定产品文档，如需求说明书、业务流程图等，确保团队成员对产品有清晰理解。
- 学习并掌握了敏捷开发方法论，提高了团队协作效率。`;

export const useResumeStore = create<ResumeStore>((set) => ({
  name: '张伟',
  title: '产品经理',
  introduction: '作为一名拥有多年经验的产品经理，我在科技行业积累了丰富的实践经验，并在多个成功的项目中扮演了关键角色。我擅长通过用户需求分析和技术趋势预测来定义产品愿景，带领跨职能团队从概念到上市，确保产品的高质量交付。致力于推动创新并解决实际问题，我相信优秀的产品能够改变人们的生活方式并为企业创造价值。',
  profilePicture: '',
  infos: [
    { label: '邮箱', value: 'zhangwei@example.com' },
    { label: '电话', value: '123-456-7890' },
    { label: '城市', value: '北京' },
  ],
  skills: [
    { name: '英语', level: 3 },
    { name: 'C++', level: 4 },
  ],
  experiences: [
    { company: 'XYZ科技有限公司', title: '产品经理', startDate: '2020-01-01', endDate: '', description: demoExprDesc1 },
    { company: 'LMN互联网公司', title: '产品经理助理', startDate: '2015-01-01', endDate: '2020-01-01', description: demoExprDesc2 },
  ],
  educations: [
    { school: 'DEF大学', degree: '硕士学位', startDate: '2012-09', endDate: '2015-07', description: '工业工程与管理' },
    { school: 'ABC大学', degree: '学士学位', startDate: '2008-09', endDate: '2012-07', description: '计算机科学与技术' }
  ],
  projects: [
    { name: '项目1', title: '项目标题1', excerpt: '项目摘要1', startDate: '2023-01', endDate: '2023-06', description: '项目描述1' }
  ],
  interests: [],

  setName: (name: string) => set({ name }),
  setTitle: (title: string) => set({ title }),
  setIntroduction: (introduction: string) => set({ introduction }),
  setProfilePicture: (profilePicture: string) => set({ profilePicture }),

  addInfo: (info: Info) => set((state) => ({ infos: [...state.infos, info] })),
  addSkill: (skill: Skill) => set((state) => ({ skills: [...state.skills, skill] })),
  addExperience: (experience: Experience) => set((state) => ({ experiences: [...state.experiences, experience] })),
  addEducation: (education: Education) => set((state) => ({ educations: [...state.educations, education]})),
  addProject: (project: Project) => set((state) => ({ projects: [...state.projects, project] })),
  addInterest: (interest: string) => set((state) => ({ interests: [...state.interests, interest] })),
  
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
}))
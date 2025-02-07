import { Resume } from '../../resume/resume';
import { MdDiv } from '../components/md';
import SkillRate from '../components/skillRates/circle';
import styles from './index.module.css';

export default function GrayishBrownMinimal({ resume }: { resume: Resume }) {
  const { name, title, infos, skills, experiences, educations, projects, interests, introduction } = resume;
  return <div className={styles.root}>
    <div className={styles.header}>
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.title}>{title}</div>
      </div>
      {
        introduction && <div className={styles.introduction}>
          <h2>自我介绍</h2>
          <MdDiv text={introduction} />
        </div>
      }
    </div>
    <div className={styles.main}>
      <div>
        <h2 className={styles.infosHead}>个人信息</h2>
        <div className={styles.infos}>
          {infos.map(info => <div key={info.id} className={styles.infoValue}>{info.value}</div>)}
        </div>
      </div>
      {
        skills.length > 0 &&   
        <div>
          <h2>技能</h2>
          <div className={styles.skills}>
            {
              skills?.map(skill => <div key={skill.id} className={styles.skillItem}>
                <div className={styles.skillName}>{skill.name}</div>
                {skill.level > 0 && <SkillRate rate={skill.level} />}
              </div>)
            }
          </div>
        </div>
      }
      {
        experiences.length > 0 &&
        <div>
          <h2>工作经历</h2>
          <div className={styles.experiences}>
            {
              experiences.map(experience => (
                <div key={experience.id} className={styles.block}>
                  <div className={styles.blockTitle}>{experience.company}</div>
                  <div className={styles.blockHeader}>
                    <div>{experience.title}</div>
                    <div className={styles.dates}>{experience.startDate} ~ {experience.endDate || '至今'}</div>
                  </div>
                  <MdDiv text={experience.description} />
                </div>
              ))
            }
          </div>
        </div>
      }
      {
        educations.length > 0 &&
        <div>
          <h2>教育经历</h2>
          <div className={styles.educations}>
            {educations.map(education => (
              <div key={education.id} className={styles.block}>
                <div className={styles.blockTitle}>{education.school}</div>
                <div className={styles.blockHeader}>
                  <div className={styles.major}>{education.major}</div>
                  { education.degree && <div className={styles.degree}>{education.degree}</div> }
                  <div className={styles.dates}>{education.startDate} - {education.endDate || '至今'}</div>
                </div>
                <MdDiv text={education.description} />
              </div>
            ))}
          </div>
        </div>
      }
      {
        projects.length > 0 &&
        <div>
          <h2>项目经历</h2>
          <div className={styles.projects}>
            {projects.map(project => (
              <div key={project.id} className={styles.block}>
                <div className={styles.blockTitle}>{project.name}</div>
                <div className={styles.blockHeader}>
                  { project.title && <div>{project.title}</div> }
                  <div className={styles.dates}>{project.startDate} - {project.endDate || '至今'}</div>
                </div>
                { project.excerpt && <MdDiv text={project.excerpt} /> }
                <MdDiv text={project.description} />
              </div>
            ))}
          </div>
        </div>
      }
      {
        interests.length > 0 &&
        <div>
          <h2>兴趣爱好</h2>
          <div className={styles.interests}>{interests.map(interest => <span key={interest}>{interest} </span>)}</div>
        </div>
      }
    </div>
  </div>
}
import { Resume } from '../../resume/resume';
import { MdDiv } from '../components/md';
import styles from './index.module.css';

export default function BlueCream({ resume }: { resume: Resume }) {
  const { name, title, profilePicture, infos, skills, experiences, educations, projects, interests, introduction } = resume;
  return <div className={styles.root}>
    <div className={styles.sider}>
      {
        profilePicture && <div className={styles.profilePicture}>
          <img src={profilePicture} alt="profile" />
        </div>
      }
      <div className={styles.name}>{name}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.divider}></div>
      <div>
        <h2>个人信息</h2>
        <div className={styles.infos}>
          {infos.map(info => <div key={info.id} className={styles.infoItem}><div className={styles.infoLabel}>{info.label}</div><div className={styles.infoValue}>{info.value}</div></div>)}
        </div>
      </div>
      {
        skills.length > 0 &&   
        <div>
          <div>
            <h2>技能</h2>
            <div className={styles.skills}>
              {skills?.map(skill => <div key={skill.id}>{skill.name}{skill.level > 0 && `: ${skillRate(skill.level)}`}</div>)}
            </div>
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
    <div className={styles.mainPart}>
      {
        introduction && <div className={styles.introduction}>
          <h2>个人简介</h2>
          <MdDiv text={introduction} />
        </div>
      }
      {
        experiences.length > 0 &&
        <div>
          <h2>工作经历</h2>
          <div className={styles.mainBlock}>
            {
              experiences.map(experience => (
                <div key={experience.id}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockTitle}>{experience.company}</div>
                    <div className={styles.dates}>{experience.startDate} - {experience.endDate || '至今'}</div>
                    <div>{experience.title}</div>
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
          <div className={styles.mainBlock}>
            {educations.map(education => (
              <div key={education.id}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockTitle}>{education.school}</div>
                  <div className={styles.dates}>{education.startDate} - {education.endDate || '至今'}</div>
                  <div>{education.major}</div>
                  <div>{education.degree}</div>
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
          <div className={styles.mainBlock}>
            {projects.map(project => (
              <div key={project.id}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockTitle}>{project.name}</div>
                  <div className={styles.dates}>{project.startDate} - {project.endDate || '至今'}</div>
                  { project.title && <div>{project.title}</div> }
                </div>
                { project.excerpt && <MdDiv text={project.excerpt} /> }
                <MdDiv text={project.description} />
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  </div>
}

function skillRate(level: number) {
  return '✦'.repeat(level) + '✧'.repeat(5 - level);
}

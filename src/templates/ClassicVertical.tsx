import { Resume } from '../resume/resume';
import { MdDiv } from './components/md';
import styles from './classicVertical.module.css';

export function ClassicVertical({ resume }: { resume: Resume }) {
  const { name, title, profilePicture, infos, skills, experiences, educations, projects, interests, introduction } = resume;
  return <div className={styles.classicVertical}>
    <div className={styles.header}>
      {
        profilePicture && <div className={styles.profilePicture}>
          <img src={profilePicture} alt="profile" />
        </div>
      }
      <div>
        <div className={styles.basic}>
          <h1 className={styles.name}>{name}</h1>
          <span className={styles.title}>职位：{title}</span>
        </div>
        <div className={styles.infos}>
          {infos.map(info => <div key={info.id}><span className={styles.infoLabel}>{info.label}：</span><span className={styles.infoValue}>{info.value}</span></div>)}
        </div>
      </div>
    </div>
    {
      introduction && <div className={styles.introduction}>
        <h2>自我介绍</h2>
        <div>{introduction}</div>
      </div>
    }
    {
      skills.length > 0 &&   
      <div>
        <h2>技能</h2>
        <div className={styles.skills}>
          {skills?.map(skill => <div key={skill.id}>{skill.name}{skill.level > 0 && `: ${skillRate(skill.level)}`}</div>)}
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
              <div key={experience.id}>
                <div className={styles.company}>
                  <div>{experience.startDate} - {experience.endDate || '至今'}</div>
                  <div>{experience.company}</div>
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
        <div className={styles.educations}>
          {educations.map(education => (
            <div key={education.id}>
              <div className={styles.education}>
                <div>{education.startDate} - {education.endDate || '至今'}</div>
                <div>{education.school} {education.degree}</div>
                <div>{education.major}</div>
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
            <div key={project.id}>
              <div className={styles.project}>
                <div>{project.startDate} - {project.endDate || '至今'}</div>
                <div>{project.name}</div>
                { project.title && <div>{project.title}</div> }
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
}

function skillRate(level: number) {
  return '✦'.repeat(level) + '✧'.repeat(5 - level);
}

import { Resume } from '../../resume/resume';
import { MdDiv } from '../components/md';
import styles from './index.module.css';

export default function WhiteSpace({ resume }: { resume: Resume }) {
  const { name, title, infos, skills, experiences, educations, projects, interests, introduction } = resume;
  const _infos = [{ id: '-1', label: '求职意向', value: title }, ...infos]
  return <div className={styles.root}>
    <div className={styles.header}>
      <div>
        <div className={styles.basic}>
          <div className={styles.name}>{name}</div>
          <div className={styles.square}></div>
        </div>
        <div className={styles.infos}>
          {_infos.map(info => <div key={info.id} className={styles.infoItem}><div className={styles.infoLabel}>{info.label}</div><div className={styles.infoValue}>{info.value}</div></div>)}
        </div>
      </div>
    </div>
    {
      introduction && <div className={styles.block1}>
        <div className={styles.col1}><h2>01 自我介绍</h2></div>
        <div className={styles.col2 + ' ' + styles.introduction}>
          <MdDiv text={introduction} />
        </div>
      </div>
    }
    {
      skills.length > 0 &&   
      <div className={styles.block1}>
        <div className={styles.col1}><h2>02 技能</h2></div>
        <div className={styles.col2}>
          <div className={styles.skills}>
            {skills?.map(skill => <div key={skill.id}>{skill.name}{skill.level > 0 && `: ${skillRate(skill.level)}`}</div>)}
          </div>
        </div>
      </div>
    }
    {
      experiences.length > 0 &&
      <div>
        <h2>03 工作经历</h2>
        <div className={styles.experiences}>
          {
            experiences.map(experience => (
              <div key={experience.id} className={styles.block2}>
                <div className={styles.col1}>
                  <div>{experience.startDate} - {experience.endDate || '至今'}</div>
                </div>
                <div className={styles.col2}>
                  <div className={styles.blockHeader}>
                    <div>{experience.company}</div>
                    <div>{experience.title}</div>
                  </div>
                  <MdDiv text={experience.description} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    }
    {
      educations.length > 0 &&
      <div>
        <h2>04 教育经历</h2>
        <div className={styles.educations}>
          {educations.map(education => (
            <div key={education.id} className={styles.block2}>
              <div className={styles.col1}>
                <div>{education.startDate} - {education.endDate || '至今'}</div>
              </div>
              <div className={styles.col2}>
                <div className={styles.blockHeader}>
                  <div>{education.school} {education.degree}</div>
                  <div>{education.major}</div>
                </div>
                <MdDiv text={education.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    }
    {
      projects.length > 0 &&
      <div>
        <h2>05 项目经历</h2>
        <div className={styles.projects}>
          {projects.map(project => (
            <div key={project.id} className={styles.block2}>
              <div className={styles.col1}>
                <div>{project.startDate} - {project.endDate || '至今'}</div>
              </div>
              <div className={styles.col2}>
                <div className={styles.blockHeader}>
                  <div>{project.name}</div>
                  { project.title && <div>{project.title}</div> }
                </div>
                { project.excerpt && <MdDiv text={project.excerpt} /> }
                <MdDiv text={project.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    }
    {
      interests.length > 0 &&
      <div>
        <h2>06 兴趣爱好</h2>
        <div className={styles.interests}>{interests.map(interest => <span key={interest}>{interest} </span>)}</div>
      </div>
    }
  </div>
}

function skillRate(level: number) {
  return '✦'.repeat(level) + '✧'.repeat(5 - level);
}

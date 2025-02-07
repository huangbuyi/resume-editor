import { Resume } from '../../resume/resume';
import { MdDiv } from '../components/md';
import SkillRate from '../components/skillRates/circle';
import styles from './index.module.css';
import paperImage from './paper.png';
import paperBirdImage from './paper-bird.png';
import paperCraneImage from './paper-crane.png';
import paperPlaneImage from './paper-plane.png';

export default function JadeLake({ resume }: { resume: Resume }) {
  const { name, title, profilePicture, infos, skills, experiences, educations, projects, interests, introduction } = resume;
  return <div className={styles.root}>
    <div className={styles.iconBlock}>
      <img className={styles.mainIcon} src={paperImage}></img>
    </div>
    <div className={styles.mainBlock}>
      <div className={styles.leftBlock}>
        <div className={styles.name}>{name}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.basic}>
          {
            profilePicture && <div className={styles.profilePicture}>
              <img src={profilePicture} alt="profile" />
            </div>
          }
          <div className={styles.infos}>
            {infos.map(info => <div key={info.id} className={styles.infoValue}>{info.value}</div>)}
          </div>
        </div>
      </div>
    </div>
    <div className={styles.iconBlock}>
      <img className={styles.mainIcon} src={paperPlaneImage}></img>
    </div>
    <div className={styles.mainBlock}>
      <div className={styles.leftBlock}>
        {
          skills.length > 0 &&   
          <div>
            <h2>技能</h2>
            <div className={styles.skills}>
              {
                skills?.map(skill => <div key={skill.id} className={styles.skillItem}>
                  <div className={styles.skillName}>{skill.name}</div>
                  {skill.level > 0 && <SkillRate rate={skill.level} activeColor="var(--primary)" color="var(--secondary)" />}
                </div>)
              }
            </div>
          </div>
        }
      </div>
      <div className={styles.rightBlock}>
        {
          introduction && <div className={styles.introduction}>
            <h2>自我介绍</h2>
            <MdDiv text={introduction} />
          </div>
        }
      </div>
    </div>
    <div className={styles.iconBlock}>
      <img className={styles.mainIcon} src={paperBirdImage}></img>
    </div>
    <div className={styles.mainBlock}>
      <div className={styles.leftBlock}>
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
      </div>
      <div className={styles.rightBlock}>
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
      </div>
      
    </div>
    <div className={styles.iconBlock}>
      <img className={styles.mainIcon} src={paperCraneImage}></img>
    </div>
    <div className={styles.mainBlock}>
      <div className={styles.leftBlock}>
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
      </div>
      <div className={styles.rightBlock}>
        {
          interests.length > 0 &&
          <div>
            <h2>兴趣爱好</h2>
            <div className={styles.interests}>{interests.map(interest => <span key={interest}>{interest} </span>)}</div>
          </div>
        }
      </div>
    </div>
  </div>
}
import styles from './index.module.css';

export default function SkillRate({ rate }: { rate: number }) {
  return <div className={styles.skillRate}>
    {
      new Array(5).fill(0).map((_, i) => i < rate ?
        <div key={i} className={styles.circleFill}></div> :
        <div key={i} className={styles.circleOutline}></div>)
    }    
  </div>
}

import styles from './index.module.css';

export interface SkillRateProps {
  rate: number;
  activeColor?: string;
  color?: string;
}

export default function SkillRate({ rate, activeColor, color }: SkillRateProps) {
  return <div className={styles.skillRate}>
    {
      new Array(5).fill(0).map((_, i) => i < rate ?
        <div key={i} className={styles.circleFill} style={{ background: activeColor }}></div> :
        <div key={i} className={styles.circleOutline} style={{ background: color }}></div>)
    }    
  </div>
}

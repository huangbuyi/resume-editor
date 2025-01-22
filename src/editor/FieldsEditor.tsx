import { Collapse, CollapseProps, Flex, Form } from 'antd';
import styles from './fieldsEditor.module.css';
import { InfosEditor } from './InfosEditor';
import { SkillsEditor } from './SkillsEditor';
import { ExperiencesEditor } from './ExperiencesEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { BasicEditor } from './basicEditor';
import { useResumeStore } from '../resume/store';

function CollapseHeaderLabel({ label, count }: { label: string, count: number }) {
  return (
    <Flex gap={8}>
      <span>{label}</span>
      { count > 0 && <span style={{ color: '#999' }}>{count}</span> }
    </Flex>
  );
}

export function FieldsEditor() {
  const { experiences, projects, interests, educations, infos, skills } = useResumeStore();

  const items: CollapseProps['items'] = [
    {
      key: '0',
      label: '基本信息',
      children: <BasicEditor />,
    },
    {
      key: '1',
      label: <CollapseHeaderLabel label="个人信息" count={infos.length} />,
      children: <InfosEditor />,
    },
    {
      key: '2',
      label: <CollapseHeaderLabel label="技能" count={skills.length} />,
      children: <SkillsEditor />,
    },
    {
      key: '3',
      label: <CollapseHeaderLabel label="工作经历" count={experiences.length} />,
      children: <ExperiencesEditor />,
    },
    {
      key: '4',
      label: <CollapseHeaderLabel label="项目" count={projects.length} />,
      children: <ProjectsEditor />,
    },
    {
      key: '5',
      label: <CollapseHeaderLabel label="教育经历" count={educations.length} />,
      children: <div></div>,
    },
    {
      key: '6',
      label: <CollapseHeaderLabel label="兴趣爱好" count={interests.length} />,
      children: <div></div>,
    },
  ]

  return (
    <div className={styles.fieldsEditor}>
      <Form size="small" labelCol={{ span: 4 }}>
        <Collapse items={items} defaultActiveKey={['0', '1']} bordered={false} ghost />
      </Form>
    </div>
  )
}
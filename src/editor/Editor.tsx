import { Layout } from 'antd';
import { FieldsEditor } from './FieldsEditor';
import { Preview } from '../preview/Preview';
import styles from './editor.module.css';
import { EditorHeader } from './EditorHeader';

const { Header, Sider, Content } = Layout;

export function Editor() {
  return (
    <Layout className={styles.editor}>
      <Header className={styles.header}><EditorHeader /></Header>
      <Layout>
        <Content className={styles.content}>
          <Preview />
        </Content>
        <Sider width="480" className={styles.sider}>
          <FieldsEditor />
        </Sider>
      </Layout>
    </Layout>
  );
}


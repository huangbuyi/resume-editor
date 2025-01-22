import { Layout } from 'antd';
import { FieldsEditor } from './FieldsEditor';
import { Preview } from './Preview';
import styles from './Editor.module.css';

const { Header, Sider, Content } = Layout;

export function Editor() {
  return (
    <Layout className={styles.editor}>
      <Header className={styles.header}>Header</Header>
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
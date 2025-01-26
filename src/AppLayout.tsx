import { Layout } from 'antd';
import { Outlet } from 'react-router';
import styles from './appLayout.module.css';

const { Header, Content } = Layout;

export function AppLayout() {
  return (
    <Layout className={styles.appLayout}>
      <Header className={styles.header}></Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}
import { Button, Divider, Layout } from 'antd';
import { Outlet, useLocation } from 'react-router';
import styles from './appLayout.module.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Header, Content } = Layout;
const titleMap: Record<string, string> = { '/market': '模板市场' };

export function AppLayout() {
  const location = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(titleMap[location.pathname] || '');
  }, [location]);

  return (
    <Layout className={styles.appLayout}>
      <Header className={styles.header}>
        <NavLink to="/">
          <Button type="default" icon={<ArrowLeftOutlined />}>返回简历编辑</Button>
        </NavLink>
        <Divider type="vertical" />
        <h2 className={styles.title}>{title}</h2>
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  )
}
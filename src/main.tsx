import './templates/templates.contribution.ts';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Editor } from './editor/Editor.tsx';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Market } from './market/Market.tsx';
import { AppLayout } from './AppLayout.tsx';

dayjs.locale('zh-cn');

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter basename="/resume-show">
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route element={<AppLayout />}>
          <Route path="/market" element={<Market />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
)

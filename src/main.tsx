import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Editor } from './editor/Editor.tsx';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Market } from './market/market.tsx';
import { AppLayout } from './AppLayout.tsx';
import './templates/templates.contribution.ts';

dayjs.locale('zh-cn');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route element={<AppLayout />}>
            <Route path="/market" element={<Market />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)

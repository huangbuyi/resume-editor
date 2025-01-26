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

dayjs.locale('zh-cn');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)

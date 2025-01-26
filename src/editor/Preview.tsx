import { Button, Flex } from 'antd';
import { useResumeStore } from '../resume/store';
import styles from './Preview.module.css';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef } from 'react';
import { Previewer } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';
import { ClassicVertical } from '../templates/ClassicVertical';
import { setPrintFn } from './print';

const paged = new Previewer();

function cleanFileName(input: string): string {
  // 定义需要移除的不安全字符集合
  // 注意：这里我们保留了所有非ASCII字符，因为它们可能是国际字符的一部分
  const unsafeChars = /[\\/:"*?<>|]/g;

  // 替换空格为下划线，可以根据需求调整此部分
  let cleaned = input.replace(/ /g, '_');

  // 移除不安全字符
  cleaned = cleaned.replace(unsafeChars, '');

  // 确保文件名不会以点号或连字符开头（一些系统可能不允许）
  if (cleaned.startsWith('.') || cleaned.startsWith('-')) {
    cleaned = '_' + cleaned;
  }

  return cleaned;
}

export function Preview() {
  const resume = useResumeStore();
  const contentRef = useRef<HTMLDivElement>(null);
  let rendered = false;
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: ''
  });
  setPrintFn(reactToPrintFn);

  useEffect(() => {
    // 防止初始化时渲染两次
    if (rendered) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rendered = true;

    const DOMContent = ReactDOMServer.renderToString(<ClassicVertical resume={resume} />);
    paged.preview(DOMContent, [], contentRef.current).then((flow) => {
      // console.log("Rendered", flow, "pages.");
      const parts = ['简历'];
      if (resume.title) parts.unshift(cleanFileName(resume.title));
      if (resume.name) parts.unshift(cleanFileName(resume.name));

      document.title = parts.join('-');
    })
    // console.log(paged);
  })
  
  return (
    <Flex className={styles.preview} align='center' justify='center' vertical>
      <div className={styles.paper} ref={contentRef}></div>
    </Flex>
  )
}
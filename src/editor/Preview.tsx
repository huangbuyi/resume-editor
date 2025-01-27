import { Flex } from 'antd';
import { nameFile, useResumeStore } from '../resume/store';
import styles from './Preview.module.css';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef } from 'react';
import { Previewer } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';
import { ClassicVertical } from '../templates/ClassicVertical';
import { setPrintFn } from './print';
import { useTemplateStore } from '../resume/template';

// const paged = new Previewer();

export function Preview() {
  const resume = useResumeStore();
  const { getTemplate } = useTemplateStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const paged = useRef<Previewer >(new Previewer());
  const rendered = useRef(false);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: ''
  });
  setPrintFn(reactToPrintFn);

  useEffect(() => {
    // 防止初始化时渲染两次
    if (rendered.current) return;
    rendered.current = true;

    const Template = getTemplate();
    if (!Template) return;
    const DOMContent = ReactDOMServer.renderToString(<Template resume={resume} />);
    paged.current.preview(DOMContent, [], contentRef.current).then(() => {
      document.title = nameFile(resume);
    })

    // console.log(paged);
  }, [resume, getTemplate])

  
  return (
    <Flex className={styles.preview} align='center' justify='center' vertical>
      <div className={styles.paper} ref={contentRef}></div>
    </Flex>
  )
}
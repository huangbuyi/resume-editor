import { Button, Flex } from 'antd';
import { useResumeStore } from '../resume/store';
import styles from './Preview.module.css';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef } from 'react';
import { Previewer } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';
import { ClassicVertical } from '../templates/ClassicVertical';

const paged = new Previewer();

export function Preview() {
  const resume = useResumeStore();
  const contentRef = useRef<HTMLDivElement>(null);
  let rendered = false;
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: ''
  });

  useEffect(() => {
    // 防止初始化时渲染两次
    if (rendered) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rendered = true;

    const DOMContent = ReactDOMServer.renderToString(<ClassicVertical resume={resume} />);
    paged.preview(DOMContent, [], contentRef.current).then((flow) => {
      console.log("Rendered", flow, "pages.");
    })
    // console.log(paged);
  })
  
  return (
    <Flex className={styles.preview} align='center' justify='center' vertical>
      <Button onClick={() => reactToPrintFn()}>打印</Button>
      <div className={styles.paper} ref={contentRef}></div>
    </Flex>
  )
}
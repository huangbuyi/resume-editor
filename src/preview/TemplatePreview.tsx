import { useEffect, useRef, useState } from 'react';
import { Previewer } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';
import styles from './templatePreview.module.css';
import previewStyles from './preview.module.css';
import { getMarginStyles } from './utils';
import { Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface TemplatePreviewProps {
  template: React.ReactNode,
  home?: string;
  margin?: number | number[];
  onClick?: () => void;
}

export function TemplatePreview({ template, margin, home, onClick }: TemplatePreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const paged = useRef<Previewer>(new Previewer());
  const pageCount = useRef(0);
  const [currPage, setCurrPage] = useState(1);

  // 在完成渲染后再进行缩放，避免 pagedJS 不渲染第二页及之后的页面
  const [rendered, setRendered] = useState(false);
  
  useEffect(() => {
    const DOMContent = ReactDOMServer.renderToString(template);
    if (contentRef.current === null) return;
    paged.current.preview(DOMContent, [], contentRef.current).then((preview) => {
      setRendered(true);
      pageCount.current = preview.total;
    });

  }, [template, home, margin])
  
  return (
    <div className={styles.preview} onClick={onClick}>
      <div style={{ transform: `translateY(${-5.5 * (currPage - 1)}in)` }}>
        <div className={styles.pages + ' ' + (rendered ? styles.scaled : '')}>
          <div className={(home ? previewStyles[home] : '')} style={getMarginStyles(margin)} ref={contentRef}></div>
        </div>
      </div>
      <div className={styles.actionBar}>
        <Button
          className={styles.actionButton}
          type="default"
          icon={<ArrowUpOutlined />}
          disabled={currPage === 1}
          onClick={(e) => {
            e.stopPropagation();
            setCurrPage(Math.max(currPage - 1, 1))}
          }>
        </Button>
        <Button
          className={styles.actionButton}
          type="default"
          icon={<ArrowDownOutlined />}
          disabled={currPage === pageCount.current}
          onClick={(e) => {
            e.stopPropagation();
            setCurrPage(Math.min(currPage + 1, pageCount.current))}
          }>
        </Button>
      </div>
    </div>
  )
}
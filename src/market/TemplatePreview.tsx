import { useEffect, useRef } from 'react';
import { Previewer } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';
import previewStyles from '../editor/preview.module.css';

interface TemplatePreviewProps {
  template: React.ReactNode,
  full?: boolean;
}

export function TemplatePreview({ template, full }: TemplatePreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const paged = useRef<Previewer>(new Previewer());
  
  useEffect(() => {
    const DOMContent = ReactDOMServer.renderToString(template);
    paged.current.preview(DOMContent, [], contentRef.current);

  }, [template, full])
  
  return (
    <div className={full ? previewStyles.fullPage : ''} ref={contentRef}></div>
  )
}
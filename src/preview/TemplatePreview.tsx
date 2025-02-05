import { useEffect, useRef } from 'react';
import { Previewer } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';
import previewStyles from './preview.module.css';
import { getMarginStyles } from './utils';

interface TemplatePreviewProps {
  template: React.ReactNode,
  home?: string;
  margin?: number | number[];
}

export function TemplatePreview({ template, margin, home }: TemplatePreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const paged = useRef<Previewer>(new Previewer());
  
  useEffect(() => {
    const DOMContent = ReactDOMServer.renderToString(template);
    paged.current.preview(DOMContent, [], contentRef.current);

  }, [template, home, margin])
  
  return (
    <div className={home ? previewStyles[home] : ''} style={getMarginStyles(margin)} ref={contentRef}></div>
  )
}
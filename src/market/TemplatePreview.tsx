import { useEffect, useRef } from 'react';
import { Previewer } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';

interface TemplatePreviewProps {
  template: React.ReactNode,
  full?: boolean;
}

export function TemplatePreview({ template, full }: TemplatePreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const paged = useRef<Previewer>(new Previewer());
  
  useEffect(() => {
    const DOMContent = ReactDOMServer.renderToString(template);
    const cssFiles = full ? ['/styles/zeroMariginPage.css'] : ['/styles/oneInchMarginPage.css'];
    paged.current.preview(DOMContent, cssFiles, contentRef.current)

  }, [template, full])
  
  return (
    <div ref={contentRef}></div>
  )
}
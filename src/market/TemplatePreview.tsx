import { useEffect, useRef } from 'react';
import { Previewer, Handler } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';

class MyHandler extends Handler {
  afterRendered(pages) {
    pages.forEach((page, index) => {
      if (index > 0) {
        page.element.style.display = "none";
      }
    });
  }
}

interface TemplatePreviewProps {
  template: React.ReactNode
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const paged = useRef<Previewer >(new Previewer());
  paged.current.registerHandlers(MyHandler);
  
  useEffect(() => {
    const DOMContent = ReactDOMServer.renderToString(template);
    paged.current.preview(DOMContent, [], contentRef.current)

  }, [template])
  
  return (
    <div ref={contentRef}></div>
  )
}
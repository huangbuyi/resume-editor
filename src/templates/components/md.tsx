import markdownit from 'markdown-it';

const md = markdownit();

export function MdSpan({ text, ...rest }: { text: string }) {
  return <span {...rest} dangerouslySetInnerHTML={{ __html: md.renderInline(text) }}></span>
}


export function MdP(props: { text: string }) {
  return <p dangerouslySetInnerHTML={{ __html: md.renderInline(props.text) }}></p>
}


export function MdDiv(props: { text: string }) {
  return <span dangerouslySetInnerHTML={{ __html: md.render(props.text) }}></span>
}

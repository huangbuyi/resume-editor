import { useResumeStore } from '../resume/store';
import markdownit from 'markdown-it';

const md = markdownit();

function MdSpan({ text, ...rest }: { text: string }) {
  return <span {...rest} dangerouslySetInnerHTML={{ __html: md.renderInline(text) }}></span>
}


function MdP(props: { text: string }) {
  return <p dangerouslySetInnerHTML={{ __html: md.renderInline(props.text) }}></p>
}


function MdDiv(props: { text: string }) {
  return <span dangerouslySetInnerHTML={{ __html: md.renderInline(props.text) }}></span>
}


export function Preview() {
  const resume = useResumeStore();
  return (
    <div className="preview">
      <div className="preview-header">
        <div className="preview-header-left">
          <img
            src={resume.profilePicture}
            alt="Profile Picture"
            className="preview-profile-picture"
          />
          <div className="preview-name"><MdSpan text={resume.name} /></div>
        </div>
      </div>
    </div>
  )
}
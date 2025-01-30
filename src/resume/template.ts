import { create } from 'zustand';
import { templateRegistry } from '../market/register';
import { Resume } from './resume';

const TEMPLATE_NAME_KEY = 'templateName';

interface TemplateStore {
  templateName: string;
  setTemplate: (name: string) => void;
  getTemplate: () => React.FC<{ resume: Resume }> | null;
}

const localName = localStorage.getItem(TEMPLATE_NAME_KEY);
let templateName = 'ClassicVertical';
if (localName && templateRegistry.hasTemplateByName(localName)) {
  templateName = localName;
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templateName,
  setTemplate: (name: string) => set({ templateName: name }),
  getTemplate: () => {
    const { templateName } = get();
    return templateRegistry.getTemplateByName(templateName);
  }
}));

useTemplateStore.subscribe((store) => {
  localStorage.setItem(TEMPLATE_NAME_KEY, store.templateName);
});
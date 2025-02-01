import { create } from 'zustand';
import { TemplateOptions, templateRegistry } from '../market/register';

const TEMPLATE_NAME_KEY = 'templateName';

interface TemplateStore {
  templateName: string;
  setTemplate: (name: string) => void;
  getTemplate: () => TemplateOptions | null;
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
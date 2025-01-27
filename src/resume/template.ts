import { create } from 'zustand';
import { templateRegistry } from '../market/register';
import { Resume } from './resume';

interface TemplateStore {
  templateName: string;
  setTemplate: (name: string) => void;
  getTemplate: () => React.FC<{ resume: Resume }> | null;
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templateName: 'ClassicVertical',
  setTemplate: (name: string) => set({ templateName: name }),
  getTemplate: () => {
    const { templateName } = get();
    return templateRegistry.getTemplateByName(templateName);
  }
}));
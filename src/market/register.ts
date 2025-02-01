import { Resume } from '../resume/resume';

export interface TemplateOptions {
  name: string; // 唯一名称
  title: string; // 显示名称
  full?: boolean; // 是否全页面（不包含安全边距）
  colorful?: boolean; // 是否彩色
  template: React.FC<{ resume: Resume }>
}

export const templateRegistry = new (class TemplateRegistry {
  private templates: TemplateOptions[] = [];

  register(template: TemplateOptions) {
    this.templates.push(template);
  }

  getTemplates() {
    return this.templates;
  }

  getTemplateCount() {
    return this.templates.length;
  }

  getTemplateByName(name: string) {
    const options = this.templates.find(item => item.name === name);
    return options || null;
  }

  hasTemplateByName(name: string) {
    return this.templates.some(item => item.name === name);
  }
})();

export function registerTemplate(template: TemplateOptions) {
  templateRegistry.register(template);
}
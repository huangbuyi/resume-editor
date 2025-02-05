import { Resume } from '../resume/resume';

export interface TemplateOptions {
  name: string; // 唯一名称
  title: string; // 显示名称
  margin?: number | number[];
  home?: 'safe' | 'full' | 'keepBottom'; // 首页类型，safe/不设置=安全边距，full=全页面，keepBottom=保留底部边距
  color?: boolean; // 是否彩色
  columns?: number; // 栏数
  template: React.FC<{ resume: Resume }>
}

export interface FilterOptions {
  margin?: '' | 'safe' | 'noSafe';
  color?: '' | 'color' | 'grayscale';
  column?: '' | 'single' | 'double' | 'more';
}

export const templateRegistry = new (class TemplateRegistry {
  private templates: TemplateOptions[] = [];

  register(template: TemplateOptions) {
    this.templates.push(template);
  }

  getTemplates(page: number = 1, pageSize: number = 10, filterOptions: FilterOptions = {}) {
    const filters = [marginFilter, colorFilter, columnFilter];
    const templates = this.templates.filter(template => filters.every(filter => filter(template, filterOptions)));

    return {
      templates: templates.slice((page - 1) * pageSize, page * pageSize),
      total: templates.length,
    }
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

function marginFilter(template: TemplateOptions, filter: FilterOptions) {
  if (!filter.margin) {
    return true;
  }
  if (filter.margin === 'noSafe') {
    return !isSafeMargin(template) || !isSafeHome(template);
  }
  if (filter.margin === 'safe' && isSafeHome(template) && isSafeMargin(template)) {
    return true;
  }
  return false;
}

function isSafeHome(template: TemplateOptions) {
  return (!template.home || template.home === 'safe')
}

function isSafeMargin(template: TemplateOptions) {
  if (template.margin !== undefined) {
    if (Array.isArray(template.margin)) {
      return template.margin.every((m) => m >= 1);
    } else {
      return template.margin >= 1;
    }
  }
  return true;
}

function colorFilter(template: TemplateOptions, filter: FilterOptions) {
  if (!filter.color) {
    return true;
  }
  if (filter.color === 'color' && template.color) {
    return true;
  }
  if (filter.color === 'grayscale' && !template.color) {
    return true;
  }
  return false;
}

function columnFilter(template: TemplateOptions, filter: FilterOptions) {
  if (!filter.column) {
    return true;
  }
  if (filter.column === 'single' && template.columns === 1) {
    return true;
  }
  if (filter.column === 'double' && template.columns === 2) {
    return true;
  }
  if (filter.column === 'more' && template.columns && template.columns > 2) {
    return true;
  }
  return false;
}
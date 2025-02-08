declare module 'pagedjs' {
  export class Previewer {
    preview(content: string, styleSheets: string[], container: HTMLDivElement): Promise<{ total: number }>;
  }
}
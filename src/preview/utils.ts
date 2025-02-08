export function getMarginStyles(margin: number | number[] = 1) {
  if (Array.isArray(margin)) {
    return {
      '--pagedjs-margin-top': `${margin[0]}in`,
      '--pagedjs-margin-right': `${margin[1]}in`,
      '--pagedjs-margin-bottom': `${margin[2]}in`,
      '--pagedjs-margin-left': `${margin[3]}in`,
    } as React.CSSProperties;
  }

  return {
    '--pagedjs-margin-top': `${margin}in`,
    '--pagedjs-margin-right': `${margin}in`,
    '--pagedjs-margin-bottom': `${margin}in`,
    '--pagedjs-margin-left': `${margin}in`,
  } as React.CSSProperties;
}
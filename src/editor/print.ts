import { UseReactToPrintFn } from 'react-to-print';

let printFn: UseReactToPrintFn | null = null;

export function setPrintFn(fn: UseReactToPrintFn) {
  printFn = fn;
}

export function printResume() {
  printFn?.();
}
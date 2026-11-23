// Commands are curated examples, never interpolated from a visitor's prompt.
const examples = {
  qpdf: { command: 'qpdf --check report.pdf', hint: 'Replace report.pdf with the PDF to check.' },
  poppler: { command: 'pdftotext report.pdf -', hint: 'Replace report.pdf with your PDF. Text is printed to the terminal.' },
  'ripgrep-all': { command: 'rga -i invoice ./documents', hint: 'Replace invoice with your search term and ./documents with your folder.' },
  duckdb: { command: `duckdb -c "SELECT * FROM 'sales.csv' LIMIT 5;"`, hint: 'Replace sales.csv with your CSV filename.' },
  hexyl: { command: 'hexyl -n 64 sample.bin', hint: 'Replace sample.bin with your file to inspect the first 64 bytes.' },
} as const;
export type ExampleTool = keyof typeof examples;
export function exampleFor(slug: string) { return Object.hasOwn(examples, slug) ? examples[slug as ExampleTool] : undefined; }
export function ambiguousPdf(query: string) { return /^(?:(?:process|handle|work with)\s+)?pdfs?$/i.test(query.trim()); }
export function toolForTask(query: string): ExampleTool | undefined {
  if (/\bpdfs?\b/i.test(query)) {
    if (/\b(search|grep|look for|find mentions)\b/i.test(query)) return 'ripgrep-all';
    if (/\b(check|validate|verify|damaged|corrupt(?:ed)?|errors?|integrity)\b/i.test(query)) return 'qpdf';
    if (/\b(text|plaintext)\b/i.test(query) && /\b(extract|convert|read|copy|pull|get)\b/i.test(query)) return 'poppler';
  }
  if (/\bcsv\b/i.test(query) && /\b(preview|inspect|first|sample)\b/i.test(query)) return 'duckdb';
  if (/\b(binary|hex|bytes?)\b/i.test(query) && /\b(inspect|view|dump|preview)\b/i.test(query)) return 'hexyl';
}

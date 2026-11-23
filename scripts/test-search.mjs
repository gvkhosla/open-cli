// Integration checks against a running Open CLI server. Set BASE_URL for CI.
import assert from 'node:assert/strict';
const base = process.env.BASE_URL || 'http://localhost:3000';
const cases = [
  ['qpdf', 'qpdf'], [' QPDF ', 'qpdf'], ['check a PDF for errors','qpdf'], ['validate a PDF','qpdf'], ['is this PDF corrupt?','qpdf'], ['check PDF integrity','qpdf'],
  ['poppler','poppler'], ['extract text from a PDF','poppler'], ['convert PDF to text','poppler'], ['copy text from PDFs','poppler'], ['get plaintext from a PDF','poppler'],
  ['rga','ripgrep-all'], ['ripgrep-all','ripgrep-all'], ['search a folder of PDFs for invoice','ripgrep-all'], ['grep PDFs','ripgrep-all'], ['search inside PDFs','ripgrep-all'],
  ['duckdb','duckdb'], ['preview five rows of a CSV','duckdb'], ['inspect CSV','duckdb'], ['sample a CSV','duckdb'], ['show first rows of CSV','duckdb'],
  ['hexyl','hexyl'], ['inspect a binary file','hexyl'], ['view bytes','hexyl'], ['preview a hex dump','hexyl'],
];
const commands = { qpdf:'qpdf --check report.pdf', poppler:'pdftotext report.pdf -', 'ripgrep-all':'rga -i invoice ./documents', duckdb:`duckdb -c "SELECT * FROM 'sales.csv' LIMIT 5;"`, hexyl:'hexyl -n 64 sample.bin' };
async function get(path,q) {const url=new URL(path,base);url.searchParams.set('q',q);const res=await fetch(url);assert.equal(res.status,200);return res.json();}
for(const [q,slug] of cases){const {recommendation:r}=await get('/api/supercharge',q);assert.equal(r?.primary.slug,slug,q);assert.equal(r.firstCommand,commands[slug],q);}
for(const q of ['pdf','process PDFs','zzzzzzzz']) assert.equal((await get('/api/supercharge',q)).recommendation,null,q);
for(const [q,slug] of [['qpdf','qpdf'],['rga','ripgrep-all'],['RIPGREP','rg']]) {const d=await get('/api/search',q);assert.equal(d.total,1,q);assert.equal(d.results[0].slug,slug,q);}
console.log('25 tool-and-command cases, 3 no-answer cases and 3 exact directory matches passed.');

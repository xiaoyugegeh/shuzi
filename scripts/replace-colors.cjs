const fs = require('fs');

const files = [
  'src/pages/Workbench.tsx',
  'src/components/layout/Header.tsx',
  'src/components/knowledge/AssetCard.tsx',
  'src/components/knowledge/AssetList.tsx',
  'src/components/knowledge/AssetForm.tsx',
  'src/components/knowledge/SearchBar.tsx',
  'src/components/chat/ChatPanel.tsx',
  'src/components/chat/ChatInput.tsx',
  'src/components/chat/ChatMessage.tsx',
  'src/components/chat/CitationList.tsx',
  'src/components/chat/AgentTrace.tsx',
  'src/components/ui/Dialog.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/Badge.tsx',
];

const replacements = [
  { from: 'bg-zinc-950/50', to: 'bg-white/50' },
  { from: 'bg-zinc-900/40', to: 'bg-white/60' },
  { from: 'bg-zinc-900/30', to: 'bg-zinc-100/50' },
  { from: 'bg-zinc-800/50', to: 'bg-zinc-50/50' },
  { from: 'bg-zinc-800/40', to: 'bg-zinc-100/40' },
  { from: 'bg-zinc-800/30', to: 'bg-zinc-100/50' },
  { from: 'bg-zinc-800/60', to: 'bg-zinc-100/60' },
  { from: 'border-zinc-800/80', to: 'border-zinc-200/80' },
  { from: 'border-zinc-800/60', to: 'border-zinc-200/60' },
  { from: 'border-zinc-800/40', to: 'border-zinc-200/40' },
  { from: 'border-zinc-700/50', to: 'border-zinc-200/50' },
  { from: 'border-zinc-700/30', to: 'border-zinc-200/30' },
  { from: 'ring-zinc-700/50', to: 'ring-zinc-200/50' },
  { from: 'ring-zinc-700/30', to: 'ring-zinc-200/30' },
  { from: 'placeholder-zinc-600', to: 'placeholder-zinc-400' },
  { from: 'hover:bg-zinc-900', to: 'hover:bg-sky-100' },
  { from: 'hover:bg-zinc-800/50', to: 'hover:bg-zinc-100/50' },
  { from: 'hover:bg-zinc-800', to: 'hover:bg-zinc-100' },
  { from: 'hover:bg-zinc-700/80', to: 'hover:bg-zinc-200/80' },
  { from: 'hover:bg-zinc-700', to: 'hover:bg-zinc-200' },
  { from: 'hover:text-zinc-400', to: 'hover:text-zinc-600' },
  { from: 'hover:text-zinc-300', to: 'hover:text-zinc-600' },
  { from: 'hover:text-zinc-200', to: 'hover:text-zinc-800' },
  { from: 'hover:border-zinc-700', to: 'hover:border-zinc-300' },
  { from: 'shadow-black/20', to: 'shadow-zinc-900/10' },
  { from: 'bg-black/60', to: 'bg-black/30' },
  { from: 'bg-zinc-950', to: 'bg-sky-50' },
  { from: 'bg-zinc-900', to: 'bg-white' },
  { from: 'bg-zinc-800', to: 'bg-zinc-100' },
  { from: 'border-zinc-800', to: 'border-zinc-200' },
  { from: 'border-zinc-700', to: 'border-zinc-300' },
  { from: 'text-zinc-400', to: '___TEMP_ZINC_TEXT_400___' },
  { from: 'text-zinc-500', to: 'text-zinc-400' },
  { from: 'text-zinc-600', to: 'text-zinc-400' },
  { from: 'text-zinc-700', to: 'text-zinc-400' },
  { from: 'text-zinc-300', to: 'text-zinc-700' },
  { from: 'text-zinc-200', to: 'text-zinc-800' },
  { from: 'text-zinc-100', to: 'text-zinc-900' },
  { from: '___TEMP_ZINC_TEXT_400___', to: 'text-zinc-500' },
  { from: 'bg-sky-400/15 text-sky-400', to: 'bg-sky-100 text-sky-500' },
  { from: 'bg-sky-400/15 text-sky-100/90', to: 'bg-sky-100 text-sky-700' },
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  replacements.forEach(({ from, to }) => {
    content = content.replaceAll(from, to);
  });
  fs.writeFileSync(file, content);
  console.log('Updated:', file);
});

let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(/    <link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg" \/>\n/, '');
fs.writeFileSync('index.html', html);
console.log('Updated: index.html');

let css = fs.readFileSync('src/index.css', 'utf-8');
css = css.replace('#3f3f46', '#cbd5e1');
css = css.replace('#52525b', '#a0aec0');
css = css.replace('#18181b', '#ffffff');
css = css.replace('#e4e4e7', '#18181b');
fs.writeFileSync('src/index.css', css);
console.log('Updated: src/index.css');
console.log('Done');

import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange, placeholder, className }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && initialValue !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialValue;
    }
  }, []);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className={`flex flex-col border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50 ${className}`}>
      <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-100 dark:border-zinc-800">
        <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors font-bold" title="Bold">B</button>
        <button type="button" onClick={() => execCommand('italic')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors italic" title="Italic">I</button>
        
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
        
        <button type="button" onClick={() => execCommand('fontSize', '3')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-xs" title="Small">S</button>
        <button type="button" onClick={() => execCommand('fontSize', '5')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-base" title="Medium">M</button>
        <button type="button" onClick={() => execCommand('fontSize', '7')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-xl" title="Large">L</button>
        
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

        <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Ordered List">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 6h14M7 12h14M7 18h14M3 6h.01M3 12h.01M3 18h.01" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Unordered List">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 6h12M9 12h12M9 18h12M5 6v.01M5 12v.01M5 18v.01" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

        <button type="button" onClick={() => execCommand('justifyLeft')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Align Left">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button type="button" onClick={() => execCommand('justifyCenter')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Align Center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button type="button" onClick={() => execCommand('justifyRight')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Align Right">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M10 12h10M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
      {/* 
        FIX: 'placeholder' არ არის ვალიდური ატრიბუტი div-ისთვის React-ში.
        ატრიბუტი ამოღებულია TypeScript-ის შეცდომის გასასწორებლად.
      */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-6 min-h-[120px] outline-none prose dark:prose-invert max-w-none antialiased"
      />
    </div>
  );
};

export default RichTextEditor;

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
      <div className="flex items-center gap-1 p-1.5 md:p-2 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto no-scrollbar shrink-0">
        <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors font-bold shrink-0" title="Bold">B</button>
        <button type="button" onClick={() => execCommand('italic')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors italic shrink-0" title="Italic">I</button>
        
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1 shrink-0"></div>
        
        <button type="button" onClick={() => execCommand('fontSize', '3')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-xs shrink-0" title="Small">S</button>
        <button type="button" onClick={() => execCommand('fontSize', '5')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-base shrink-0" title="Medium">M</button>
        <button type="button" onClick={() => execCommand('fontSize', '7')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-xl shrink-0" title="Large">L</button>
        
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1 shrink-0"></div>

        <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors shrink-0" title="Ordered List">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 6h14M7 12h14M7 18h14M3 6h.01M3 12h.01M3 18h.01" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors shrink-0" title="Unordered List">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 6h12M9 12h12M9 18h12M5 6v.01M5 12v.01M5 18v.01" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1 shrink-0"></div>

        <button type="button" onClick={() => execCommand('justifyLeft')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors shrink-0" title="Align Left">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button type="button" onClick={() => execCommand('justifyCenter')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors shrink-0" title="Align Center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button type="button" onClick={() => execCommand('justifyRight')} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors shrink-0" title="Align Right">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M10 12h10M4 18h16" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 md:p-6 min-h-[150px] outline-none prose dark:prose-invert max-w-none antialiased text-sm md:text-base"
      />
    </div>
  );
};

export default RichTextEditor;

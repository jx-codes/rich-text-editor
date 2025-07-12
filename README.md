# Rich Text Editor

A modern, customizable rich text editor for React applications that provides a simple quick start based on the awesome [Tiptap](https://tiptap.dev/). This editor provides a clean, intuitive interface with essential formatting tools and is fully compatible with TypeScript.

## ✨ Features

- **📝 Rich Text Formatting**: Bold, italic, strikethrough, and inline code
- **📋 Document Structure**: Headers (H1, H2, H3), lists, blockquotes, and code blocks
- **🎨 Modern UI**: Clean toolbar with Radix UI components and Lucide React icons
- **⚡ Lightweight**: Designed with performance in mind using Tiptap's efficient editor
- **🔧 Highly Customizable**: Extensible architecture with configurable options
- **📱 Responsive**: Works seamlessly across desktop and mobile devices
- **♿ Accessible**: Designed with accessibility in mind using Radix UI primitives
- **🎯 TypeScript**: Full TypeScript support with comprehensive type definitions

## 🚀 Installation

```bash
npm install @jx/react-rich-text-editor
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @radix-ui/react-separator @radix-ui/react-toggle @tiptap/pm @tiptap/react @tiptap/starter-kit class-variance-authority lucide-react tailwind-merge
```

## 🎯 Quick Start

```tsx
import { RichTextEditor } from '@jx/react-rich-text-editor';

function App() {
  return (
    <RichTextEditor 
      editorOptions={{
        content: '<p>Start writing your content here!</p>',
      }}
      onValueChange={(value) => {
        console.log('HTML:', value.html);
        console.log('JSON:', value.json);
        console.log('Text:', value.text);
      }}
    />
  );
}
```

## 📚 Usage Examples

### Basic Usage

```tsx
import { RichTextEditor } from '@jx/react-rich-text-editor';

function BasicEditor() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <RichTextEditor 
        editorOptions={{
          content: '<p>Hello world!</p>',
        }}
        className="border border-gray-300 rounded-lg"
      />
    </div>
  );
}
```

### With Change Handler

```tsx
import { RichTextEditor } from '@jx/react-rich-text-editor';
import { useState } from 'react';

function EditorWithState() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor 
      editorOptions={{
        content: '<p>Start typing...</p>',
      }}
      onValueChange={(value) => {
        setContent(value.html);
      }}
    />
  );
}
```

### Advanced Configuration

```tsx
import { RichTextEditor } from '@jx/react-rich-text-editor';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

function AdvancedEditor() {
  return (
    <RichTextEditor 
      editorOptions={{
        content: '<p>Advanced editor with custom extensions</p>',
        extensions: [Color, TextStyle],
        editorProps: {
          attributes: {
            class: 'custom-editor-class',
          },
        },
        onUpdate: ({ editor }) => {
          console.log('Editor updated:', editor.getHTML());
        },
      }}
      className="h-96 border border-gray-300 rounded-lg"
      onValueChange={(value) => {
        // Save to localStorage, send to server, etc.
        localStorage.setItem('editorContent', value.html);
      }}
    />
  );
}
```

## 🔧 API Reference

### RichTextEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `editorOptions` | `EditorOptions` | **Required** | Tiptap editor configuration options |
| `className` | `string` | `undefined` | Additional CSS classes for the editor container |
| `onValueChange` | `(value: EditorValue) => void` | `undefined` | Callback fired when editor content changes |

### EditorOptions

The `editorOptions` prop accepts all standard [Tiptap EditorOptions](https://tiptap.dev/docs/editor/api/editor#settings). Key options include:

| Option | Type | Description |
|--------|------|-------------|
| `content` | `string \| JSONContent` | Initial content for the editor |
| `extensions` | `Extension[]` | Additional Tiptap extensions |
| `editorProps` | `EditorProps` | Props passed to the ProseMirror editor |
| `onUpdate` | `(props: { editor: Editor, transaction: Transaction }) => void` | Callback for editor updates |

### EditorValue

The `onValueChange` callback receives an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `html` | `string` | HTML representation of the content |
| `json` | `JSONContent` | JSON representation of the content |
| `text` | `string` | Plain text representation of the content |

## 🎨 Toolbar Features

The editor comes with a built-in toolbar featuring:

### Text Formatting
- **Bold** (`Ctrl+B` / `Cmd+B`)
- **Italic** (`Ctrl+I` / `Cmd+I`)
- **Strikethrough** (`Ctrl+Shift+S` / `Cmd+Shift+S`)

### Document Structure
- **Headings**: H1, H2, H3 (`Ctrl+Alt+1-3` / `Cmd+Alt+1-3`)
- **Bullet List** (`Ctrl+Shift+8` / `Cmd+Shift+8`)
- **Numbered List** (`Ctrl+Shift+7` / `Cmd+Shift+7`)
- **Blockquote** (`Ctrl+Shift+B` / `Cmd+Shift+B`)
- **Code Block** (`Ctrl+Alt+C` / `Cmd+Alt+C`)

## 🎯 Styling

The editor uses Tailwind CSS classes and is designed to work with your existing Tailwind setup. Key styling features:

- **Responsive Design**: Adapts to different screen sizes
- **Customizable Theme**: Easy to customize colors and spacing
- **Clean Interface**: Minimal, modern design
- **Focus States**: Clear visual feedback for interactive elements

### Custom Styling

You can customize the appearance by:

1. **Adding custom classes** via the `className` prop
2. **Using CSS variables** for consistent theming
3. **Overriding Tailwind classes** in your stylesheets

```tsx
<RichTextEditor 
  className="my-custom-editor"
  editorOptions={{
    editorProps: {
      attributes: {
        class: 'custom-editor-content',
      },
    },
  }}
/>
```

## 🔌 Extensions

The editor leverages Tiptap's extensible architecture. You can easily add additional functionality:

```tsx
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';

<RichTextEditor 
  editorOptions={{
    extensions: [Link, Image, Table],
  }}
/>
```

import {
  useEditor,
  EditorContent,
  type Editor,
  EditorOptions,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { Toggle } from "./toggle";
import { cn } from "./utils";
import { Separator } from "./separator";

const TiptapToolbar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className="flex items-center flex-wrap space-x-1 bg-gray-50 p-1 border-b border-gray-200"
      data-slot="editor-toolbar"
    >
      <Toggle
        size="xs"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-3 w-3" />
      </Toggle>
      <Toggle
        size="xs"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-3 w-3" />
      </Toggle>
      <Toggle
        size="xs"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="h-3 w-3" />
      </Toggle>
      <Separator orientation="vertical" className="h-5" />
      <Toggle
        size="xs"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-3 w-3" />
      </Toggle>
      <Toggle
        size="xs"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-3 w-3" />
      </Toggle>
      <Toggle
        size="xs"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-3 w-3" />
      </Toggle>
      <Separator orientation="vertical" className="h-5" />
      <Toggle
        size="xs"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-3 w-3" />
      </Toggle>
      <Toggle
        size="xs"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-3 w-3" />
      </Toggle>
      <Toggle
        size="xs"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-3 w-3" />
      </Toggle>
      <Toggle
        size="xs"
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="h-3 w-3" />
      </Toggle>
    </div>
  );
};

export const RichTextEditor = (props: {
  editorOptions: EditorOptions;
  className?: string;
  onValueChange?: (value: {
    html: string;
    json: JSONContent;
    text: string;
  }) => void;
}) => {
  const editor = useEditor({
    ...props.editorOptions,
    extensions: [StarterKit, ...(props.editorOptions.extensions || [])],
    content: props.editorOptions.content ?? "",
    onUpdate: ({ editor, transaction }) => {
      props.editorOptions.onUpdate?.({ editor, transaction });
      props.onValueChange?.({
        html: editor.getHTML(),
        json: editor.getJSON(),
        text: editor.getText(),
      });
    },
    editorProps: {
      attributes: {
        class: "tiptap max-w-none focus:outline-none p-2",
      },
      ...props.editorOptions.editorProps,
    },
  });

  return (
    <div
      className={cn("w-full h-full", props.className)}
      data-slot="editor-container"
    >
      {editor && <TiptapToolbar editor={editor} />}
      <div
        className="flex-grow overflow-y-auto"
        onClick={() => {
          editor?.chain().focus().run();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            editor?.chain().focus().run();
          }
        }}
        role="application"
        data-slot="editor-scroll-container"
      >
        <EditorContent editor={editor} data-slot="editor-content" />
      </div>
    </div>
  );
};

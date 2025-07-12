import {
  useEditor,
  EditorContent,
  type Editor,
  EditorOptions,
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

export const RichTextEditor = (props: { editorOptions: EditorOptions }) => {
  const editor = useEditor({
    ...props.editorOptions,
    extensions: [StarterKit, ...props.editorOptions.extensions],
    content: props.editorOptions.content ?? "",
  });
};

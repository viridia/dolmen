import { Accessor, createEffect, createMemo, createSignal } from 'solid-js';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MarkType, Schema } from 'prosemirror-model';

export interface IProseMirror {
  editorView: Accessor<EditorView>;
  editorState: Accessor<EditorState>;
  isMarkActive(mark: MarkType): () => boolean;
}

export function createProseMirror(
  element: () => HTMLElement | undefined,
  schema: Schema,
  plugins: Plugin[]
) {
  const [editorView, setEditorView] = createSignal<EditorView>();
  const [editorState, setEditorState] = createSignal<EditorState>();

  const isMarkActive = (mark: MarkType) => {
    return createMemo(() => {
      const state = editorState();
      if (state) {
        const { from, $from, to, empty } = state.selection;
        if (empty) {
          return !!mark.isInSet(state.storedMarks || $from.marks());
        } else {
          return state.doc.rangeHasMark(from, to, mark);
        }
      }
      return false;
    });
  };

  createEffect(() => {
    const elt = element();
    if (elt) {
      const state = EditorState.create({
        schema,
        plugins,
      });
      setEditorState(state);
      const view = new EditorView(elt, {
        state,
        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);
          // console.log(JSON.stringify(newState.doc.toJSON()));
          setEditorState(newState);
        },
      });
      setEditorView(view);
    }
  });

  return {
    editorView,
    editorState,
    isMarkActive,
    toJson: () => editorState()?.doc.toJSON() ?? {},
  };
}

import * as React from "react";
import Note from "../models/note";

export interface NoteState {
  notes: Note[];
}

export const initialState: NoteState = {
  notes: [],
};

export type NoteContextObj = {
  notes: Note[];
  addNote: (n: Note) => void;
  removeNote: (n: Note) => void;
  removeAllNotes: () => void;
  editNote: (n: Note) => void;
};

export const NoteContext = React.createContext<NoteContextObj>({
  notes: [],
  addNote: (n: Note) => {},
  removeNote: (n: Note) => {},
  removeAllNotes: () => {},
  editNote: (n: Note) => {},
});

enum ActionType {
  FETCH_NOTES = "FETCH_NOTES",
  SELECT_ALL = "SELECT_ALL",
  SELECT_NONE = "EDIT_NOTE",
  ADD_NOTE = "ADD_NOTE",
  REMOVE_NOTE = "REMOVE_NOTE",
  SELECT_LAST_NOTE = "SELECT_LAST_NOTE",
  REMOVE_ALL_NOTES = "REMOVE_ALL_NOTES",
  EDIT_NOTE = "EDIT_NOTE",
}

export type Action = {
  type: ActionType;
  note?: Note;
};

const noteReducer = (state: NoteState, action: Action) => {
  // console.log(`noteReducer called: ${action.type}`);

  const selectedNote = action.note;

  switch (action.type) {
    case "FETCH_NOTES": {
      return {
        ...state,
        notes: [...initialState.notes],
      };
    }
    case "ADD_NOTE": {
      if (selectedNote) {
        return {
          ...state,
          notes: [...state.notes, selectedNote],
        };
      }
      return {
        ...state,
      };
    }
    case "REMOVE_NOTE": {
      console.log("test" + selectedNote);
      if (selectedNote) {
        console.log("selected note " + selectedNote.id);
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== selectedNote.id),
        };
      }
      return {
        ...state,
      };
    }
    case "REMOVE_ALL_NOTES": {
      return {
        ...state,
        notes: [],
      };
    }
    case "EDIT_NOTE": {
      if (selectedNote) {
        return {
          ...state,
          notes: state.notes.map((n) => {
            if (n.id === selectedNote.id) {
              n.text = selectedNote.text;
            }
            return n;
          }),
        };
      }
      return {
        ...state,
      };
    }
    default:
      throw new Error();
  }
};

type AppProp = {
  children: React.ReactNode;
};

const NoteContextProvider = (props: AppProp) => {
  const [noteState, dispatchNote] = React.useReducer(noteReducer, initialState);

  const addNoteHandler = (item: Note) => {
    dispatchNote({ type: ActionType.ADD_NOTE, note: item });
  };

  const editNoteHandler = (item: Note) => {
    dispatchNote({ type: ActionType.EDIT_NOTE, note: item });
  };

  const removeNoteHandler = (item: Note) => {
    dispatchNote({ type: ActionType.REMOVE_NOTE, note: item });
  };

  const removeAllNotesHandler = () => {
    dispatchNote({ type: ActionType.REMOVE_ALL_NOTES });
  };



  const cartContext = {
    notes: noteState.notes,
    removeNote: removeNoteHandler,
    removeAllNotes: removeAllNotesHandler,
    addNote: addNoteHandler,
    editNote: editNoteHandler,
  };

  return (
    <NoteContext.Provider value={cartContext}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;

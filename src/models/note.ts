class Note {
    id: string;
    text: string;
    seen: string;

    constructor(noteText: string, id: string, seen: string = "") {
        this.text = noteText;
        this.id = id;
        this.seen = seen;
    }
}

export default Note;
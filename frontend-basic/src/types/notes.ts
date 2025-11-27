export type Note = {
    _id: string;
    title: string;
    text: string;
    user: {
        username: string;
        email: string;
    };
};

export type NewNote = {
    title: string;
    text: string;
};

export type NotesResponse = {
    ok: boolean;
    data: Note[];
};

export type NoteResponse = {
    ok: boolean;
    data: Note;
};

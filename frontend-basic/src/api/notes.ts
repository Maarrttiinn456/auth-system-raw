import type { NewNote, NotesResponse } from '../types/notes';
import ApiClient from './client';

export const getNotesApi = async () => {
    return ApiClient<NotesResponse>({
        method: 'GET',
        url: '/note',
    });
};

export const createNoteApi = async (newNote: NewNote) => {
    return ApiClient({
        method: 'POST',
        url: '/note/add',
        data: newNote,
    });
};

export const deleteNoteApi = async (id: string) => {
    return ApiClient<NotesResponse>({
        method: 'DELETE',
        url: `/note/delete/${id}`,
    });
};

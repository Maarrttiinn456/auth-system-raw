import { useMutation } from '@tanstack/react-query';
import { createNoteApi } from '../../api/notes';
import type { NewNote } from '../../types/notes';
import queryClient from '../../queryClient';

const useAddNote = () => {
    return useMutation({
        mutationFn: (data: NewNote) => createNoteApi(data),
        onSuccess: (data) => {
            console.log('poznámka úspěšně vytvořena:', data);
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
        },
        onError: (err) => {
            console.log('Nepodařilo se vytvořit poznámku', err);
        },
    });
};

export default useAddNote;

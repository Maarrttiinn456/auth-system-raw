import { useMutation } from '@tanstack/react-query';
import { deleteNoteApi } from '../../api/notes';
import queryClient from '../../queryClient';

const useDeleteNote = () => {
    return useMutation({
        mutationFn: (id: string) => deleteNoteApi(id),
        onSuccess: () => {
            console.log('smazáno');
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });
};

export default useDeleteNote;

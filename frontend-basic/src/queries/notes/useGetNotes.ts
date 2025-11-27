import { useQuery } from '@tanstack/react-query';
import { getNotesApi } from '../../api/notes';

const useGetNotes = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: getNotesApi,
    });
};

export default useGetNotes;

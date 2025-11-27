import { useEffect } from 'react';
import useGetNotes from '../../queries/notes/useGetNotes';
import NotesCard from './NotesCard';

const NotesList = () => {
    const { data, isLoading, isError, error } = useGetNotes();

    useEffect(() => {
        console.log(data?.data.length);
    }, [data]);

    if (isLoading) {
        return <div>Načítám...</div>;
    }

    if (!data?.data || data.data.length === 0) {
        return <div>Žádné poznámky</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-6">
                {data?.data.map((note) => (
                    <NotesCard key={note._id} note={note} />
                ))}
            </div>
        </div>
    );
};

export default NotesList;

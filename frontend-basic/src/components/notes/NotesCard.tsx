import useDeleteNote from '../../queries/notes/useDeleteNote';
import type { Note } from '../../types/notes';
import Toast from '../Toast';

type NotesCardProps = {
    note: Note;
};

const NotesCard = ({ note }: NotesCardProps) => {
    const { mutate, isPending, isError, error, isSuccess } = useDeleteNote();

    const status = error?.response?.status;

    const errorMessage =
        status === 401
            ? 'Uživatel není autorizovaný'
            : status === 403
            ? 'Uživatel nemá právo mazat poznámky jiným uživatelům'
            : 'Něco se pokazilo';

    return (
        <>
            {isError && <Toast type="error" message={errorMessage} />}
            {isSuccess && (
                <Toast type="success" message="Poznámka úspšně smazána" />
            )}
            <div className="bg-gray-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                    <div className="text-xl font-semibold">{note.title}</div>
                    <div className="text-gray-400 text-xs mt-0.5">
                        Od: {note.user.username}
                    </div>
                    <div className="mt-1 text-sm">{note.text}</div>
                </div>
                <div className="mt-4 flex gap-2 justify-end">
                    <button
                        disabled={isPending}
                        className="bg-red-700 text-xs px-2 py-1 rounded cursor-pointer transition hover:bg-red-800"
                        onClick={() => mutate(note._id)}
                    >
                        {isPending ? 'Mažu' : 'Smazat'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default NotesCard;

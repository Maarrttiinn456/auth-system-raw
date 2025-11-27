import { useState, type FormEvent } from 'react';
import useAddNote from '../../queries/notes/useAddNote';
import { useNavigate } from 'react-router';
import Toast from '../Toast';

const NotesForm = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const { mutate, isPending, isError, error } = useAddNote();
    const navigate = useNavigate();

    const handleForm = async (e: FormEvent) => {
        e.preventDefault();

        if (!title || !text) {
            alert('Vypňte všechna pole');
        }

        mutate(
            { title, text },
            {
                onSuccess: () => {
                    navigate('/');
                },
            }
        );
    };

    return (
        <div>
            {isError && (
                <Toast
                    type="error"
                    message={
                        String(error?.status) == '401'
                            ? 'Uživatel není autorizovaný.'
                            : 'Nepodařilo se vytvořit poznámku'
                    }
                />
            )}
            <form
                className="flex flex-col items-center gap-4 w-72"
                onSubmit={handleForm}
            >
                <label htmlFor="title" className="space-y-2  w-full">
                    <div className="text-sm">Nadpis:</div>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-white px-2 py-1 rounded-md w-full"
                    />
                </label>
                <label htmlFor="text" className="space-y-2  w-full">
                    <div className="text-sm">Text:</div>
                    <textarea
                        id="text"
                        rows={5}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border border-white px-2 py-1 rounded-md w-full"
                    />
                </label>
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-violet-700 px-6 w-fit text-md py-1.5 rounded-full mt-2 cursor-pointer transition hover:bg-violet-800 disbaled:bg-violet-900"
                >
                    Vytvořít
                </button>
            </form>
        </div>
    );
};

export default NotesForm;

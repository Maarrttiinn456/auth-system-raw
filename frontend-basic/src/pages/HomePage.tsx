import { Link } from 'react-router';
import NotesList from '../components/notes/NotesList';

const HomePage = () => {
    return (
        <div>
            <div className="flex justify-center">
                <Link
                    to="/create-note"
                    className="bg-violet-700 px-6 w-fit text-md py-1.5 rounded-full mt-2 cursor-pointer transition hover:bg-violet-800"
                >
                    Vytvořit poznámku
                </Link>
            </div>

            <div className="mt-8">
                <NotesList />
            </div>
        </div>
    );
};

export default HomePage;

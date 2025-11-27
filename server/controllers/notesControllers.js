import Note from '../schemas/noteSchema.js';

export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find().populate('user', 'username email');

        if (!notes || notes.length === 0) {
            res.status(404);
            throw new Error('Nejsou žádné poznámky k dispozici');
        }

        res.status(200).json({
            ok: true,
            data: notes,
        });
    } catch (err) {
        next(err);
    }
};

export const getNote = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400);
            throw new Error('Neznámé id');
        }

        const note = await Note.findById(id).populate('user', 'username email');

        if (!note) {
            res.status(404);
            throw new Error('Nepodařilo se najít poznámku s tímto id');
        }

        res.status(200).json({
            ok: true,
            data: note,
        });
    } catch (err) {
        next(err);
    }
};

export const createNote = async (req, res, next) => {
    try {
        const { title, text } = req.body || {};

        if (!title || !text) {
            res.status(400);
            throw new Error('Nejsou vyplněné všechny pole');
        }

        const newNote = await Note.create({
            title,
            text,
            user: req.user._id,
        });

        res.status(201).json({
            ok: true,
            data: newNote,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400);
            throw new Error('Neznámé id');
        }

        const note = await Note.findById(id);

        if (!note) {
            res.status(404);
            throw new Error('Nepodařilo se najít poznámku s tímto id');
        }

        if (note.user.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error(
                'Uživatel nemá oprávnění mazat poznámky jiným uživatelům'
            );
        }

        await note.deleteOne();

        res.status(200).json({
            ok: true,
            data: note,
        });
    } catch (err) {
        next(err);
    }
};

import express from 'express';
import {
    createNote,
    deleteNote,
    getAllNotes,
    getNote,
} from '../controllers/notesControllers.js';
import authProtected from '../middlewear/authProtected.js';

const notesRoute = express.Router();

notesRoute.get('/', getAllNotes);
notesRoute.get('/:id', getNote);
notesRoute.post('/add', authProtected, createNote);
notesRoute.delete('/delete/:id', authProtected, deleteNote);

export default notesRoute;

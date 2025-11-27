import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const noteSchema = new Schema({
    title: String,
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Note = mongoose.model('Note', noteSchema);

export default Note;

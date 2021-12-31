import { mutator } from 'satcheljs';
import {addNote} from '../actions/notes'
import getStore from '../store/store';

mutator(addNote, (actionMessage) => {
    getStore().push({
        id: Math.random().toString(),
        title: 'asda',
        content: 'A new note',
        createdAt: Date.now()
    });
};
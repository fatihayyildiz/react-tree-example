/**
 * Created by fatihayyildiz on 16.08.2018.
 */
import {ROOT_PLUS_BUTTON_CLICK} from '../utils/constants';

export function FolderReducer(state = [], action) {

    switch (action.type) {
        case ROOT_PLUS_BUTTON_CLICK:
            return {...state,globalIndex:action.payload.globalIndex,items:action.payload.items};
        default:
    }
    return state;
}
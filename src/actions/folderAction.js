/**
 * Created by fatihayyildiz on 16.08.2018.
 */
import {ROOT_PLUS_BUTTON_CLICK} from '../utils/constants';

export function RootPlusButtonClick(indexParam){
    return {
        type:ROOT_PLUS_BUTTON_CLICK,
        payload : {storeFolderIndex:indexParam}
    }
}
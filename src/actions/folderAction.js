/**
 * Created by fatihayyildiz on 16.08.2018.
 */
import {ROOT_PLUS_BUTTON_CLICK} from '../utils/constants';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import map from 'lodash/map';
import flow from 'lodash/flow';
import property from 'lodash/property';
import partialRight from 'lodash/partialRight';
import some from 'lodash/some';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import set from 'lodash/set';

export function RootPlusButtonClick(rootParams){
    rootParams.items.push({id:rootParams.globalIndex,childrens:[]});
    return {
        type:ROOT_PLUS_BUTTON_CLICK,
        payload : { globalIndex:rootParams.globalIndex,items:rootParams.items}
    }
}

export function SubPlusButtonClick(globalFoldersObject){

    let mainNode = find(globalFoldersObject.items,(object)=>{
        return object.id === globalFoldersObject.currentItemId
    });


    if(mainNode && mainNode.childrens){
        mainNode.childrens.push({id:globalFoldersObject.globalIndex + 1,childrens:[]})
        let mainNodeIndex = findIndex(globalFoldersObject.items,{id:globalFoldersObject.currentItemId})

        globalFoldersObject.items.splice(mainNodeIndex,1,mainNode);
    }
    else{
        let deneme = find(globalFoldersObject.items, flow(
            property('childrens'),
            partialRight(some, { id: globalFoldersObject.currentItemId })
        ));
        //console.log(deneme)

        forEach(globalFoldersObject.items, function(item) {
            console.log('first foreach : ',item);
            forEach(get(item, 'childrens', []), function(children) {
                console.log('second foreach : ',children);
                if(children && children.id === globalFoldersObject.currentItemId)
                {
                    console.log('aranan bulundu:',children);
                    set(children, 'childrens', [{id:globalFoldersObject.globalIndex + 1,childrens:[]}]);
                    console.log(globalFoldersObject.items)
                }

            });
        });


    }



    return {
        type:ROOT_PLUS_BUTTON_CLICK,
        payload : {globalIndex:globalFoldersObject.globalIndex + 1,items:globalFoldersObject.items}
    }
}
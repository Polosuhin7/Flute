import React from 'react';
import {MobXProviderContext} from 'mobx-react'
import {IRootStore} from "../stores/Root.store";

export function useStores(storeName?: keyof IRootStore) {
    const stores= React.useContext(MobXProviderContext)
    if (storeName) {
        return stores[storeName];
    }
    return stores;
}

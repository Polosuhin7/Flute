
import { BottomSheetProps } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { FlatListProps, FlatList, ListRenderItem } from 'react-native';


const BottomSheetFlatList:React.FC<FlatListProps<any>> = (props, children) => {
    return <FlatList {...props} />
}

export default BottomSheetFlatList;
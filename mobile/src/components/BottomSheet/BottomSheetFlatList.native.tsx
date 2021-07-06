
import { BottomSheetFlatList as FlatList } from '@gorhom/bottom-sheet';
import { BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/flatList/types';
import * as React from 'react';


const BottomSheetFlatList:React.FC<BottomSheetFlatListProps<any>> = (props, children) => {
    return <FlatList {...props} />
}

export default BottomSheetFlatList
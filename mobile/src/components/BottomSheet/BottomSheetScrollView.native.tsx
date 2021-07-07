import * as React from 'react';
import {BottomSheetScrollView as ScrollView} from '@gorhom/bottom-sheet';
import { BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/scrollView/types';
import { forwardRef } from 'react';


const BottomSheetScrollView: React.FC<BottomSheetScrollViewProps> = forwardRef(({children, ...props}, ref: any ) => {
    return (
        <ScrollView {...props} ref={ref}>{children}</ScrollView>
    )
})

export default BottomSheetScrollView;
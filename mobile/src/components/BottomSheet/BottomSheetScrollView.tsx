import * as React from 'react';
import { forwardRef } from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';


const BottomSheetScrollView: React.FC<ScrollViewProps | any> = forwardRef(({children, ...props}, ref: any) => {
    return (
        <ScrollView {...props} ref={ref}>{children}</ScrollView>
    )
})

export default BottomSheetScrollView;
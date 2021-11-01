import React from 'react'
import { useFormikContext } from 'formik'

import Picker from '../Picker';
import ErrorMessage from './ErrorMessage';

export default function FormPicker({ name, items, placeholder, numberOfColumns, PickerItemComponent, width }) {
    const { setFieldValue, values, touched, errors } = useFormikContext();

    return (
        <>
            <Picker
                items={items}
                placeholder={placeholder}
                selectedItem={values[name]}
                onSelectItem={item => setFieldValue(name, item)}
                PickerItemComponent={PickerItemComponent}
                numberOfColumns={numberOfColumns}
                width={width}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    )
}

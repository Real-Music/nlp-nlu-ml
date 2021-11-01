import React from 'react'
import { useFormikContext } from 'formik'

import TextInput from '../TextInput';
import ErrorMessage from './ErrorMessage';

export default function FormField({ name, width, ...rest }) {
    const { setFieldTouched, setFieldValue, values, errors, touched } = useFormikContext()
    return (
        <>
            <TextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={text => setFieldValue(name, text)}
                value={values[name]}
                width={width}
                {...rest}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    )
}

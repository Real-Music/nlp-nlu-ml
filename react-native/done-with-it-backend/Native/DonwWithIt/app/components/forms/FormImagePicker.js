import React from 'react'
import { useFormikContext } from 'formik'

import ErrorMessage from './ErrorMessage'
import ImageInputList from '../ImageInputList'
import uuid from '../../config/uuid'

export default function FormImagePicker({ name }) {
    const { setFieldValue, errors, touched, values } = useFormikContext()
    const imageUris = values[name];
    const onRemoveImage = img => setFieldValue(name, imageUris.filter(image => image.uri !== img.uri))

    const onAddImage = img => setFieldValue(name, [...imageUris, img])
    // const onAddImage = uri => setFieldValue(name, [...imageUris, { uri, id: uuid() }])

    return (
        <>
            <ImageInputList imageUris={imageUris} onAddImage={onAddImage} onRemoveImage={onRemoveImage} />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    )
}

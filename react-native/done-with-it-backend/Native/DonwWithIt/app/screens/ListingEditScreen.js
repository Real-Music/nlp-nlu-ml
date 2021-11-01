import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { StyleSheet } from 'react-native'

import Screen from '../components/Screen'
import { Form, FormField, SubmitButton, FormPicker } from '../components/forms'
import CategoryPickerItem from '../components/CategoryPickerItem'
import FormImagePicker from '../components/forms/FormImagePicker'
import useLocation from '../hooks/useLocation';
import useApi from '../hooks/useApi'
import categoriesApi from '../api/category';
import listingsApi from '../api/listings';
import UploadScreen from './UploadScreen'

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    category: Yup.object().required().nullable().label("Category"),
    description: Yup.string().optional().label("Description"),
    images: Yup.array().min(1, "Please select at least one image.")
})

export default function ListingEditScreen() {
    const location = useLocation();
    const getCategoriesApi = useApi(categoriesApi.getCategories);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        getCategoriesApi.request();
    }, [])

    const handleSubmit = async (listings, resetForm) => {
        setProgress(0);
        setUploadVisible(true);
        const result = await listingsApi.addListings({ ...listings, location }, progress => setProgress(progress));


        if (!result.ok) {
            setUploadVisible(false);
            return alert("Could not save the listing.");
        }

        resetForm();
    }

    return (
        <Screen style={styles.container}>
            <UploadScreen onDone={() => setUploadVisible(false)} progress={progress} visible={uploadVisible} />
            <Form
                initialValues={{ title: "", price: "", category: null, description: "", images: [], }}
                onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                validationSchema={validationSchema}
            >
                <FormImagePicker
                    name="images"
                />
                <FormField
                    maxLenght={255}
                    name="title"
                    placeholder="Title"
                />

                <FormField
                    maxLenght={8}
                    name="price"
                    placeholder="Price"
                    keyboardType="numeric"
                    width={120}
                />

                <FormPicker
                    name="category"
                    items={getCategoriesApi.data}
                    placeholder="Category"
                    PickerItemComponent={CategoryPickerItem}
                    numberOfColumns={3}
                    width="50%"
                />

                <FormField
                    maxLenght={255}
                    multiline
                    numberOfLines={3}
                    name="description"
                    placeholder="Description"
                />

                <SubmitButton title="POST" />

            </Form>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    }
})
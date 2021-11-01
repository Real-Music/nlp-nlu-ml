import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Form, FormField, SubmitButton, ErrorMessage } from '../components/forms';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import usersApi from '../api/users';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(2).label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})
export default function RegisterScreen() {
    const [error, setError] = useState();
    const { logIn } = useAuth();
    const registerApi = useApi(usersApi.register);
    const loginApi = useApi(authApi.login)

    const handleSubmit = async userInfo => {
        const result = await registerApi.request(userInfo);

        if (!result.ok) {
            if (result.data) setError(result.data.error);
            else {
                setError("An unexpected error occured.")
                console.log(result);
            }
            return;
        }

        const { data: authToken } = await loginApi.request(userInfo.email, userInfo.password);
        logIn(authToken);

    }

    return (
        <>
            <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
            <Screen style={styles.container}>
                <Form
                    initialValues={{ name: "", email: "", password: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error={error} visible={error} />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="account"
                        name="name"
                        keyboardType="default"
                        placeholder="Name"
                    />

                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        name="email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        placeholder="Email"
                    />

                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password"
                        secureTextEntry
                        textContentType="password"
                        placeholder="Password"
                    />

                    <SubmitButton title="Register" />

                </Form>

            </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})

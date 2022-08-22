import { View, Text, Alert } from 'react-native'
import React, { useState, useEffect, createContext } from 'react'
import moment from 'moment'

import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password, navigation) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                            .then(async result => {
                                if (!result.user.emailVerified) {
                                    result.user.sendEmailVerification();
                                    Alert.alert("Mesaj", 'Lütfen En İyi Kullanım İçin Email Adresinize Gelen Maili Onaylayınız.');
                                } else {

                                    

                                }
                            })
                    } catch (error) {
                        Alert.alert('Giriş Hatası', "" + error);
                    }
                },

                signup: async (email, password, navigation) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                            .then(async result => {

                                result.user.sendEmailVerification();

                                Alert.alert(
                                    'Mesaj',
                                    'Üyelik Oluşturuldu. Lütfen En İyi Kullanım İçin Email Adresinize Gelen Maili Onaylayınız.'
                                );
                                navigation.navigate("Login");

                            });
                    } catch (error) {
                        console.log("" + error);
                    }
                },
                resetPassword: async (email) => {
                    try {
                        await auth().sendPasswordResetEmail(email);
                        Alert.alert(
                            'Mesaj',
                            'Şifre Sıfırlama Linki Mail Adresinize Gönderildi.',
                        );
                    } catch (error) {
                        alert("" + error);
                    }
                },
                signOut: async () => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        console.log("" + error);
                    }
                },
            }}
        >{children}</AuthContext.Provider>
    );
};


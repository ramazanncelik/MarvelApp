import { View, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import auth from '@react-native-firebase/auth'
import { AuthContext } from './AuthProvider'
import { NavigationContainer } from '@react-navigation/native'
import HomeStack from './HomeStack'
import AuthStack from './AuthStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();


const Routes = () => {

    const { user, setUser } = useContext(AuthContext);
    const [isInitial, setIsInitial] = useState(true);



    function onAuthStateChanged(user) {
        setUser(user);
        if (isInitial) {
            setIsInitial(false);
        }
    }
    useEffect(() => {

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;

    }, []);


    /*return (
        <NavigationContainer>
            {user ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
    );*/

    return (
        <NavigationContainer>
            
                {user ? (
                <>
                    <HomeStack />
                </>
                ) : (
                <>
                    <AuthStack />
                </>
                )}
            
        </NavigationContainer>
    )

}
export default Routes;
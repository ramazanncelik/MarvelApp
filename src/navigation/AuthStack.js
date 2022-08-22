import { useColorScheme, View, Text, AppState } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { mainColor, sideColor } from '../utils/ThemeColors'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconII from 'react-native-vector-icons/Ionicons'
import Login from '../screens/Auth/Login'
import SignUp from '../screens/Auth/SignUp'
import ResetPassword from '../screens/Auth/ResetPassword'

const AuthStack = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Login') {
           
              return <IconFA5 name='user-shield' color={focused ? mainColor : isDarkMode && Colors.light || Colors.dark} size={30} />
           
          } else if (route.name === 'SignUp') {
            return <IconII name='md-person-add-sharp' color={focused ? mainColor : isDarkMode && Colors.light || Colors.dark} size={30} />
          } else if (route.name === 'ResetPassword') {
            return <IconMCI name='lock-reset' color={focused ? mainColor : isDarkMode && Colors.light || Colors.dark} size={30} />
          }
        },
        tabBarActiveTintColor: mainColor,
        tabBarInactiveTintColor: '#aaa',
        headerShown: false,
        tabBarStyle: { backgroundColor: isDarkMode ? Colors.black : Colors.white },
        tabBarHideOnKeyboard: true
      })} >
      <Tab.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
          tabBarShowLabel: false
        }} />

      <Tab.Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerShown: false,
          tabBarShowLabel: false
        }}
      />

      <Tab.Screen
        name='ResetPassword'
        component={ResetPassword}
        options={{
          headerShown: false,
          tabBarShowLabel: false
        }}
      />

    </Tab.Navigator >
  )
}

export default AuthStack
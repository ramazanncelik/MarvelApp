import { useColorScheme, AppState } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { mainColor, sideColor } from '../utils/ThemeColors'
import database from '@react-native-firebase/database'
import { AuthContext } from './AuthProvider'
import moment from 'moment'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../screens/Home/Home/Home'
import Favorites from '../screens/Home/Favorites/Favorites'

import Characters from '../screens/Home/Characters/Characters'
import CharacterDetails from '../screens/Home/CharacterDetails/CharacterDetails'

import Comics from '../screens/Home/Comics/Comics'
import ComicsDetails from '../screens/Home/ComicsDetails/ComicsDetails'

import SeriesDetails from '../screens/Home/SeriesDetails/SeriesDetails'

import EventDetails from '../screens/Home/EventsDetails/EventDetails'

import StorieDetails from '../screens/Home/StoriesDetails/StorieDetails'

import CreatorDetails from '../screens/Home/CreatorDetails/CreatorDetails'

const HomeStack = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const [currentUser, setCurrentUser] = useState({})

  const { user } = useContext(AuthContext);
  const [aState, setAppState] = useState(AppState.currentState);

  const getCurrentUser = () => {

    const reference = database().ref('/MyDiet/userList/' + user.uid);

    reference
      .on('value', snapshot => {

        setCurrentUser(snapshot.val());

      });

  }

  useEffect(() => {
    getCurrentUser();
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {

        if (nextAppState == "active") {

          const activeReference = database().ref('/MyDiet/userList/' + user.uid);

          activeReference
            .update({
              OnlineStatus: true
            });


          setAppState(nextAppState);

        } else {

          const inactiveReference = database().ref('/MyDiet/userList/' + user.uid);

          inactiveReference
            .update({
              OnlineStatus: false
            });

          setAppState(nextAppState);

        }

      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const TabStack = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              return <IconFA5 name='home' color={focused ? mainColor : isDarkMode && Colors.light || Colors.dark} size={30} />
            } else if (route.name === 'Favorites') {
              return <IconMCI name='heart' color={focused ? mainColor : isDarkMode && Colors.light || Colors.dark} size={30} />
            }
          },
          tabBarActiveTintColor: mainColor,
          tabBarInactiveTintColor: '#aaa',
          headerShown: false,
          tabBarStyle: { backgroundColor: isDarkMode ? Colors.black : Colors.white },
          tabBarHideOnKeyboard: true
        })} >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false,
            tabBarShowLabel: false
          }} />
        <Tab.Screen
          name='Favorites'
          component={Favorites}
          options={{
            headerShown: false,
            tabBarShowLabel: false
          }}
        />

      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>

        <Stack.Screen
          name='HomeScreen'
          component={TabStack}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='Favorites'
          component={Favorites}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='Characters'
          component={Characters}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='CharacterDetails'
          component={CharacterDetails}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name='Comics'
          component={Comics}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='ComicsDetails'
          component={ComicsDetails}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name='SeriesDetails'
          component={SeriesDetails}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name='EventDetails'
          component={EventDetails}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name='StorieDetails'
          component={StorieDetails}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='CreatorDetails'
          component={CreatorDetails}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default HomeStack
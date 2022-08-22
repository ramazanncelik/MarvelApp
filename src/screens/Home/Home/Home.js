import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconOI from 'react-native-vector-icons/Octicons'
import database from '@react-native-firebase/database'
import { AuthContext } from '../../../navigation/AuthProvider'
import { comicsLink } from '../../../utils/MervelLinks'
import FastImage from 'react-native-fast-image';
import Characters from '../Characters/Characters';
import Comics from '../Comics/Comics';

const Home = ({ navigation }) => {

  const isDarkMode = useColorScheme({ navigation }) === 'dark';

  const { user, signOut } = useContext(AuthContext);
  const [isCharacter, setIsCharacter] = useState(true);

  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white
    }}>



      <View style={{
        flexDirection: 'row',
        width: '96%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode ? Colors.dark : Colors.lighter,
        marginHorizontal: '2%'
      }}>

        <TouchableOpacity onPress={() => {
          setIsCharacter(true)
        }} style={{
          width: '45%',
          marginRight: '5%',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: isCharacter ? 2 : 0,
          borderBottomColor: mainColor
        }}>
          <FastImage style={{
            width: 36,
            height: 36,
            marginRight: '10%'
          }}
            source={{
              uri: isCharacter ?
                'https://img.icons8.com/color/96/000000/deadpool.png'
                :
                'https://img.icons8.com/fluency-systems-filled/96/000000/deadpool.png',
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setIsCharacter(false)
        }} style={{
          width: '45%',
          marginLeft: '5%',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: isCharacter ? 0 : 2,
          borderBottomColor: mainColor
        }}>
          <FastImage style={{
            width: 36,
            height: 36,
            marginLeft: '10%'
          }}
            source={{
              uri: isCharacter ?
                'https://img.icons8.com/ios-filled/96/000000/comics-magazine.png'
                :
                'https://img.icons8.com/color/96/000000/comics-magazine.png',
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

      </View>

      <React.Fragment>
        {
          isCharacter ?
            <Characters
              navigation={navigation}
            />
            :
            <Comics
              navigation={navigation}
            />
        }
      </React.Fragment>

      <TouchableOpacity onPress={() => {
        signOut();
      }} style={{
        position: 'absolute',
        right: '1%',
        bottom: '1%',
        borderRadius: 50,
        backgroundColor: mainColor,
        padding: '2%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <IconOI name='sign-out' size={30} color={Colors.white} />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Home
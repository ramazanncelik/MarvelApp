import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import database from '@react-native-firebase/database'
import moment from 'moment'
import { AuthContext } from '../../../navigation/AuthProvider'
import FavoriteHeroesInfo from './FavoriteHeroesInfo'

const Favorites = ({ navigation }) => {

  const isDarkMode = useColorScheme({ navigation }) === 'dark';

  const { user } = useContext(AuthContext);

  const [favoriteHeroesData, setFavoriteHeroesData] = useState({});

  function getFavoriteHeroes() {

    const getHeroes = database().ref("/MarvelApp/FavoriteHeroes/" + user.uid);
    getHeroes
      .on('value', snapshot => {

        if (snapshot.val() != null) {

          setFavoriteHeroesData(Object.values(snapshot.val()));

        } else {
          setFavoriteHeroesData({});
        }

      });

  }

  function renderItemHeroes({ item, index }) {

    return (
      <React.Fragment>
        <FavoriteHeroesInfo
          characterInfo={item.characterInfo}
          navigation={navigation}
        />
      </React.Fragment>
    )

  }

  useEffect(() => {

    getFavoriteHeroes();

    return () => {
      setFavoriteHeroesData({});
    }
  }, []);


  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white
    }}>

      {
        favoriteHeroesData.length == undefined &&
          <></>
          ||
          favoriteHeroesData.length == 0 ?
          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
            fontSize: 24,
            marginHorizontal: '2%',
            fontWeight: 'bold',
            textAlign: 'center',
            position: 'absolute',
            top: '45%',
            width: '100%'
          }}>
            {
              moment().locale() == "tr" ?
                "Favori Kahramanlar Bulunamadı..." : "Favorite Heroes not found"
            }
          </Text>
          :
          <FlatList
            numColumns={2}
            data={favoriteHeroesData}
            renderItem={renderItemHeroes}
            keyExtractor={(item, index) => index.toString()}
          />
      }

    </SafeAreaView>
  )
}

export default Favorites
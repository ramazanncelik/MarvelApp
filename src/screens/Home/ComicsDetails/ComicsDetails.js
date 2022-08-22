import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { charactersLink } from '../../../utils/MervelLinks'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import IconII from 'react-native-vector-icons/Ionicons'
import CharacterInfo from '../Infos/CharacterInfo';
import EventInfo from '../Infos/EventInfo';
import StorieInfo from '../Infos/StorieInfo';
import CreatorsInfo from '../Infos/CreatorInfo';

const ComicsDetails = ({ navigation, route }) => {

  const isDarkMode = useColorScheme({ navigation }) === 'dark';

  const { comicsInfo } = route.params;

  const [charactersData, setCharactersData] = useState({});
  const [creatorsData, setCreatorsData] = useState({});
  const [eventsData, setEventsData] = useState({});
  const [storiesData, setStoriesData] = useState({});

  function getCharactersData() {

    const charactersLink = "https://gateway.marvel.com:443/v1/public/comics/" + comicsInfo.id + "/characters?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(charactersLink)
      .then(response => response.json())
      .then(response => setCharactersData(response.data.results));

  }

  function getStoriesData() {

    const storiesLink = "https://gateway.marvel.com:443/v1/public/comics/" + comicsInfo.id + "/stories?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(storiesLink)
      .then(response => response.json())
      .then(response => setStoriesData(response.data.results));

  }

  function getEventsData() {

    const eventsLink = "https://gateway.marvel.com:443/v1/public/comics/" + comicsInfo.id + "/events?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(eventsLink)
      .then(response => response.json())
      .then(response => setEventsData(response.data.results));

  }

  function getCreatorsData() {

    const creatorsLink = "https://gateway.marvel.com:443/v1/public/comics/" + comicsInfo.id + "/creators?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(creatorsLink)
      .then(response => response.json())
      .then(response => setCreatorsData(response.data.results));

  }

  function renderItemCharacters({ item, index }) {

    return (
      <React.Fragment>
        <CharacterInfo
          characterInfo={item}
          navigation={navigation}
        />
      </React.Fragment>
    )

  }

  function renderItemEvents({ item, index }) {

    return (
      <React.Fragment>
        <EventInfo
          eventInfo={item}
          navigation={navigation}
        />
      </React.Fragment>
    )

  }

  function renderItemStories({ item, index }) {

    return (
      <React.Fragment>
        <StorieInfo
          storieInfo={item}
          navigation={navigation}
        />
      </React.Fragment>
    )

  }

  function renderItemCreators({ item, index }) {

    return (
      <React.Fragment>
        <CreatorsInfo
          creatorInfo={item}
          navigation={navigation}
        />
      </React.Fragment>
    )

  }

  useEffect(() => {

    getCharactersData();
    getEventsData();
    getStoriesData();
    getCreatorsData();

    return () => {
      setCharactersData({});
      setEventsData({});
      setStoriesData({});
      setCreatorsData({});
      console.log(comicsInfo.id)
    }
  }, [comicsInfo.id]);

  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white
    }}>

      <TouchableOpacity onPress={() => {
        navigation.goBack();
      }} style={{
        width: '100%',
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        flexDirection: 'row',
        elevation: 5,
        shadowColor: isDarkMode ? Colors.light : Colors.dark,
        alignItems: 'center'
      }}>

        <IconII
          name='arrow-back'
          size={24}
          color={mainColor}
        />

        <Text style={{
          width: '85%',
          color: mainColor,
          marginLeft: '9%',
          fontSize: 18,
          fontWeight: 'bold',
        }}>

          {comicsInfo.title}

        </Text>

      </TouchableOpacity>

      <ScrollView>
        <FastImage
          style={{
            width: '100%',
            height: 300,
          }} source={{
            uri: comicsInfo.thumbnail == undefined &&
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ||
              comicsInfo.thumbnail == null ?
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              :
              comicsInfo.thumbnail.path + '.jpg',
            priority: FastImage.priority.normal
          }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={{
          width: '96%',
          margin: '2%'
        }}>

          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
            fontWeight: 'bold',
            fontSize: 18
          }}>
            {comicsInfo.title}
          </Text>

          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
            {
              comicsInfo.description != null ?
                comicsInfo.description
                :
                moment().locale() == "tr" &&
                "Açıklama Bulunamadı..." || "Description Not Found"
            }
          </Text>

        </View>

        <Text style={{
          color: isDarkMode ? Colors.white : Colors.black,
          fontWeight: 'bold',
          fontSize: 18,
          margin: '2%'
        }}>
          {
            moment().locale() == "tr" ?
              "Karakterler" : "Characters"
          }
        </Text>
        {
          charactersData.length == undefined &&
            <></>
            ||
            charactersData.length == 0 ?
            <Text style={{
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 16,
              marginHorizontal: '2%'
            }}>
              {
                moment().locale() == "tr" ?
                  "Karakterler Bulunamadı..." : "Characters not found"
              }
            </Text>
            :
            <FlatList
              horizontal
              data={charactersData}
              renderItem={renderItemCharacters}
              keyExtractor={(item, index) => index.toString()}
            />
        }

        <Text style={{
          color: isDarkMode ? Colors.white : Colors.black,
          fontWeight: 'bold',
          fontSize: 18,
          margin: '2%'
        }}>
          {
            moment().locale() == "tr" ?
              "Olaylar" : "Events"
          }
        </Text>
        {
          eventsData.length == undefined &&
            <></>
            ||
            eventsData.length == 0 ?
            <Text style={{
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 16,
              marginHorizontal: '2%'
            }}>
              {
                moment().locale() == "tr" ?
                  "Olaylar Bulunamadı..." : "Events not found"
              }
            </Text>
            :
            <FlatList
              horizontal
              data={eventsData}
              renderItem={renderItemEvents}
              keyExtractor={(item, index) => index.toString()}
            />
        }

        <Text style={{
          color: isDarkMode ? Colors.white : Colors.black,
          fontWeight: 'bold',
          fontSize: 18,
          margin: '2%'
        }}>
          {
            moment().locale() == "tr" ?
              "Hikayeler" : "Stories"
          }
        </Text>
        {
          storiesData.length == undefined &&
            <></>
            ||
            storiesData.length == 0 ?
            <Text style={{
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 16,
              marginHorizontal: '2%'
            }}>
              {
                moment().locale() == "tr" ?
                  "Hikayeler Bulunamadı..." : "Stories not found"
              }
            </Text>
            :
            <FlatList
              horizontal
              data={storiesData}
              renderItem={renderItemStories}
              keyExtractor={(item, index) => index.toString()}
            />
        }

        <Text style={{
          color: isDarkMode ? Colors.white : Colors.black,
          fontWeight: 'bold',
          fontSize: 18,
          margin: '2%'
        }}>
          {
            moment().locale() == "tr" ?
              "Yaratıcıları" : "Creators"
          }
        </Text>
        {
          creatorsData.length == undefined &&
            <></>
            ||
            creatorsData.length == 0 ?
            <Text style={{
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 16,
              marginHorizontal: '2%'
            }}>
              {
                moment().locale() == "tr" ?
                  "Yaratıcılar Bulunamadı..." : "Creators not found"
              }
            </Text>
            :
            <FlatList
              horizontal
              data={creatorsData}
              renderItem={renderItemCreators}
              keyExtractor={(item, index) => index.toString()}
            />
        }

      </ScrollView>

    </SafeAreaView>
  )
}

export default ComicsDetails
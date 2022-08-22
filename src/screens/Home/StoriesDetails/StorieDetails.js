import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { charactersLink } from '../../../utils/MervelLinks'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import IconII from 'react-native-vector-icons/Ionicons'
import CharacterInfo from '../Infos/CharacterInfo'
import ComicsInfo from '../Infos/ComicsInfo'
import EventInfo from '../Infos/EventInfo'
import SerieInfo from '../Infos/SerieInfo'
import CreatorsInfo from '../Infos/CreatorInfo'

const StoriesDetails = ({ navigation, route }) => {

  const isDarkMode = useColorScheme({ navigation }) === 'dark';

  const { storieInfo } = route.params;

  const [charactersData, setCharactersData] = useState({});
  const [comicsData, setComicsData] = useState({});
  const [creatorsData, setCreatorsData] = useState({});
  const [eventsData, setEventsData] = useState({});
  const [seriesData, setSeriesData] = useState({});

  function getCharacters() {

    const charactersLink = "https://gateway.marvel.com:443/v1/public/stories/" + storieInfo.id + "/characters?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(charactersLink)
      .then(response => response.json())
      .then(response => setCharactersData(response.data.results));

  }

  function getComics() {

    const comicsLink = "https://gateway.marvel.com:443/v1/public/stories/" + storieInfo.id + "/comics?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(comicsLink)
      .then(response => response.json())
      .then(response => setComicsData(response.data.results));

  }

  function getEvents() {

    const eventsLink = "https://gateway.marvel.com:443/v1/public/stories/" + storieInfo.id + "/events?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(eventsLink)
      .then(response => response.json())
      .then(response => setEventsData(response.data.results));

  }

  function getSeries() {

    const seriesLink = "https://gateway.marvel.com:443/v1/public/stories/" + storieInfo.id + "/series?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(seriesLink)
      .then(response => response.json())
      .then(response => setSeriesData(response.data.results));

  }

  function getCreators() {

    const creatorsLink = "https://gateway.marvel.com:443/v1/public/stories/" + storieInfo.id + "/creators?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
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

  function renderItemComics({ item, index }) {

    return (
      <React.Fragment>
        <ComicsInfo
          comicsInfo={item}
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

  function renderItemSeries({ item, index }) {

    return (
      <React.Fragment>
        <SerieInfo
          serieInfo={item}
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

    getCharacters();
    getComics();
    getEvents();
    getSeries();
    getCreators();

    return () => {
      setCharactersData({});
      setComicsData({});
      setEventsData({});
      setSeriesData({});
      setCreatorsData({});
    }
  }, [storieInfo.id]);


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
          fontWeight: 'bold'
        }}>

          {storieInfo.title}

        </Text>

      </TouchableOpacity>

      <ScrollView>

        <FastImage
          style={{
            width: '100%',
            height: 300,
          }} source={{
            uri: storieInfo.thumbnail == undefined &&
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ||
              storieInfo.thumbnail == null ?
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              :
              storieInfo.thumbnail.path + '.jpg',
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
            {storieInfo.title}
          </Text>

          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
            {
              storieInfo.description == undefined ?
                moment().locale() == "tr" &&
                "Açıklama Bulunamadı..." || "Description Not Found"
                :
                storieInfo.description == "" ?
                  moment().locale() == "tr" &&
                  "Açıklama Bulunamadı..." || "Description Not Found"
                  :
                  storieInfo.description
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
              "Çizgi Romanlar" : "Comics"
          }
        </Text>
        {
          comicsData.length == undefined &&
            <></>
            ||
            comicsData.length == 0 ?
            <Text style={{
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 16,
              marginHorizontal: '2%'
            }}>
              {
                moment().locale() == "tr" ?
                  "Çizgi Romanlar Bulunamadı..." : "Comics not found"
              }
            </Text>
            :
            <FlatList
              horizontal
              data={comicsData}
              renderItem={renderItemComics}
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
              "Seriler" : "Series"
          }
        </Text>
        {
          seriesData.length == undefined &&
            <></>
            ||
            seriesData.length == 0 ?
            <Text style={{
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 16,
              marginHorizontal: '2%'
            }}>
              {
                moment().locale() == "tr" ?
                  "Seriler Bulunamadı..." : "Series not found"
              }
            </Text>
            :
            <FlatList
              horizontal
              data={seriesData}
              renderItem={renderItemSeries}
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
              "Yaratıcılar" : "Creators"
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

export default StoriesDetails
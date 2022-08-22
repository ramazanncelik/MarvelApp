import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import IconII from 'react-native-vector-icons/Ionicons'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import ComicsInfo from '../Infos/ComicsInfo'
import EventInfo from '../Infos/EventInfo'
import StorieInfo from '../Infos/StorieInfo'
import SerieInfo from '../Infos/SerieInfo'

const CreatorDetails = ({ navigation, route }) => {

  const isDarkMode = useColorScheme({ navigation }) === 'dark';

  const { creatorInfo } = route.params;

  const [comicsData, setComicsData] = useState({});
  const [seriesData, serSeriesData] = useState({});
  const [eventsData, setEventsData] = useState({});
  const [storiesData, setStoriesData] = useState({});

  function getComics() {

    const comicsLink = "https://gateway.marvel.com:443/v1/public/creators/" + creatorInfo.id + "/comics?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(comicsLink)
      .then(response => response.json())
      .then(response => setComicsData(response.data.results));

  }

  function getEvents() {

    const eventsLink = "https://gateway.marvel.com:443/v1/public/creators/" + creatorInfo.id + "/events?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(eventsLink)
      .then(response => response.json())
      .then(response => setEventsData(response.data.results));

  }

  function getStories() {

    const storiesLink = "https://gateway.marvel.com:443/v1/public/creators/" + creatorInfo.id + "/stories?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(storiesLink)
      .then(response => response.json())
      .then(response => setStoriesData(response.data.results));

  }

  function getSeries() {

    const seriesLink = "https://gateway.marvel.com:443/v1/public/creators/" + creatorInfo.id + "/series?ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
    fetch(seriesLink)
      .then(response => response.json())
      .then(response => serSeriesData(response.data.results));

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

  useEffect(() => {

    getComics();
    getEvents();
    getStories();
    getSeries();

    return () => {
      setComicsData({});
      setEventsData({});
      setStoriesData({});
      serSeriesData({});
    }
  }, [creatorInfo.id]);


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

          {creatorInfo.fullName}

        </Text>

      </TouchableOpacity>

      <ScrollView>

        <FastImage
          style={{
            width: '100%',
            height: 300,
          }} source={{
            uri: creatorInfo.thumbnail.path + '.jpg',
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
            {creatorInfo.fullName}
          </Text>

          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
            {
              creatorInfo.description != null ?
                creatorInfo.description
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

      </ScrollView>

    </SafeAreaView>
  )
}

export default CreatorDetails
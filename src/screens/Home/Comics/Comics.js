import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { comicsLink } from '../../../utils/MervelLinks'
import ComicsInfo from './ComicsInfo'
import moment from 'moment'
import IconII from 'react-native-vector-icons/Ionicons'

const Comics = ({ navigation }) => {

    const isDarkMode = useColorScheme({ navigation }) === 'dark';

    const [comicsData, setComicsData] = useState({});

    function getComics(comicsName) {

        if (comicsName != '') {

            const searchLink = "https://gateway.marvel.com/v1/public/comics?titleStartsWith=" + comicsName + "&ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
            fetch(searchLink)
                .then(response => response.json())
                .then(response => setComicsData(response.data.results));

        } else {
            fetch(comicsLink)
                .then(response => response.json())
                .then(response => setComicsData(response.data.results));
        }

    }

    function renderItem({ item, index }) {

        return (
            <React.Fragment>
                <ComicsInfo
                    comicsInfo={item}
                    navigation={navigation}
                />
            </React.Fragment>
        )

    }

    useEffect(() => {

        getComics('');

        return () => {
            setComicsData({});
        }
    }, []);

    return (
        <View style={{
            width: '100%'
        }}>
            <View style={{
                width: '96%',
                marginHorizontal: '2%',
                flexDirection: 'row',
                marginTop: '1%',
                borderRadius: 10,
                paddingHorizontal: '2%',
                backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <TextInput
                    style={{
                        width: '95%',
                    }}
                    placeholder={
                        moment().locale() == "tr" ?
                            "Çizgi Roman Ara" : "Search Comics"
                    }
                    onChangeText={value => { getComics(value) }}
                />

                <IconII
                    name='search-outline'
                    size={24}
                    color={isDarkMode ? Colors.white : Colors.black}
                />

            </View>

            {
                comicsData.length == undefined ?
                    <></>
                    :
                    <FlatList style={{
                        marginBottom: '22%'
                    }}
                        numColumns={3}
                        data={comicsData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
            }

        </View>
    )
}

export default Comics
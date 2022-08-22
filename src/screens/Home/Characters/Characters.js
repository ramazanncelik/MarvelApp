import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { charactersLink } from '../../../utils/MervelLinks'
import CharacterInfo from './CharacterInfo'
import moment from 'moment'
import IconII from 'react-native-vector-icons/Ionicons'

const Characters = ({ navigation }) => {

    const isDarkMode = useColorScheme({ navigation }) === 'dark';

    const [charactersData, setCharactersData] = useState({});

    const searchUrl = charactersLink + "?nameStartsWith=${searchedCharacter}&ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"

    function getCharacters(characterName) {

        if (characterName != '') {

            const searchLink = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + characterName + "&ts=1&apikey=780ebe598f7be102dd7cbaec7cb86957&hash=0c664b36347111c29fcacd65302587ba&limit=20&offset=0"
            fetch(searchLink)
                .then(response => response.json())
                .then(response => setCharactersData(response.data.results));

        } else {
            fetch(charactersLink)
                .then(response => response.json())
                .then(response => setCharactersData(response.data.results));
        }


    }

    function renderItem({ item, index }) {

        return (
            <React.Fragment>
                <CharacterInfo
                    characterInfo={item}
                    navigation={navigation}
                />
            </React.Fragment>
        )

    }

    useEffect(() => {

        getCharacters('');

        return () => {
            setCharactersData({});
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
                            "Karakter Ara" : "Search Character"
                    }
                    onChangeText={value => { getCharacters(value) }}
                />

                <IconII
                    name='search-outline'
                    size={24}
                    color={isDarkMode ? Colors.white : Colors.black}
                />

            </View>

            {
                charactersData.length == undefined ?
                    <></>
                    :
                    <FlatList style={{
                        marginBottom:'22%'
                    }}
                        numColumns={2}
                        data={charactersData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
            }

        </View>
    )
}

export default Characters
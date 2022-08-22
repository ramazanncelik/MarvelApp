import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { charactersLink } from '../../../utils/MervelLinks'
import moment from 'moment'
import { AuthContext } from '../../../navigation/AuthProvider'
import database from '@react-native-firebase/database'
import FastImage from 'react-native-fast-image'
import IconE from 'react-native-vector-icons/Entypo'


const CharacterInfo = ({ characterInfo, navigation }) => {

    const isDarkMode = useColorScheme({ navigation }) === 'dark';

    const { user } = useContext(AuthContext);

    function removeFavorites() {

        const remove = database().ref("/MarvelApp/FavoriteHeroes/" + user.uid + "/" + characterInfo.id);
        remove.remove();

    }

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("CharacterDetails", {
                characterInfo: characterInfo
            })
        }} style={{
            width: '45%',
            marginHorizontal: '2.5%',
            marginVertical: '2%',
            borderRadius: 10,
            borderColor: isDarkMode ? Colors.white : Colors.black,
            padding: '2%',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            shadowColor: isDarkMode ? Colors.light : Colors.dark
        }}>
            {
                characterInfo.thumbnail != undefined &&
                <FastImage style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                }}
                    source={{
                        uri: characterInfo.thumbnail.path + '.jpg',
                        priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

            }
            <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
                height: 40
            }}>
                {characterInfo.name}
            </Text>

            <TouchableOpacity onPress={() => {
                removeFavorites();
            }} style={{
                position: 'absolute',
                right: '2%',
                top: '2%'
            }}>

                <IconE
                    name='trash'
                    size={30}
                    color={'#f00'}
                />

            </TouchableOpacity>

        </TouchableOpacity>
    )
}

export default CharacterInfo
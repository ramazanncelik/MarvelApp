import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { charactersLink } from '../../../utils/MervelLinks'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import IconII from 'react-native-vector-icons/Ionicons'


const SerieInfo = ({ serieInfo, navigation }) => {

    const isDarkMode = useColorScheme({ navigation }) === 'dark';

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("SeriesDetails", {
                serieInfo: serieInfo
            });
        }} style={{
            width: 140,
            margin: 5,
            height: 160,
            borderRadius: 10,
            borderColor: isDarkMode ? Colors.white : Colors.black,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            shadowColor: isDarkMode ? Colors.light : Colors.dark
        }}>
            {
                serieInfo.thumbnail != undefined &&
                <FastImage style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                }}
                    source={{
                        uri: serieInfo.thumbnail.path + '.jpg',
                        priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

            }
            <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
                height: 40
            }}>
                {serieInfo.title}
            </Text>
        </TouchableOpacity>
    )
}

export default SerieInfo
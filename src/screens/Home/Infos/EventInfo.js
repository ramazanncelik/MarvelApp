import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { charactersLink } from '../../../utils/MervelLinks'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import IconII from 'react-native-vector-icons/Ionicons'


const EventInfo = ({ eventInfo, navigation }) => {

    const isDarkMode = useColorScheme({ navigation }) === 'dark';

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("EventDetails", {
                eventInfo: eventInfo
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
                eventInfo.thumbnail != undefined &&
                <FastImage style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                }}
                    source={{
                        uri: eventInfo.thumbnail.path + '.jpg',
                        priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

            }
            <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
                height: 40
            }}>
                {eventInfo.title}
            </Text>
        </TouchableOpacity>
    )
}

export default EventInfo
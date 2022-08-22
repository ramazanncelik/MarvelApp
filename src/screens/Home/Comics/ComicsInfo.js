import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FastImage from 'react-native-fast-image';

const ComicsInfo = ({ comicsInfo, navigation }) => {

    const isDarkMode = useColorScheme({ navigation }) === 'dark';

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("ComicsDetails", {
                comicsInfo: comicsInfo
            });
        }} style={{
            width: '45%',
            margin: '2.5%',
            borderRadius: 10,
            borderColor: isDarkMode ? Colors.white : Colors.black,
            padding: '1%',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 10,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            shadowColor: isDarkMode ? Colors.light : Colors.dark
        }}>
            {
                comicsInfo.thumbnail != undefined &&
                <FastImage style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                }}
                    source={{
                        uri: comicsInfo.thumbnail.path + '.jpg',
                        priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

            }
            <Text style={{
                color: isDarkMode ? Colors.white : Colors.black
            }}>
                {comicsInfo.title}
            </Text>
        </TouchableOpacity>
    )
}

export default ComicsInfo
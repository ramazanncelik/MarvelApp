import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'

import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { mainColor, sideColor } from '../../utils/ThemeColors'
import { AuthContext } from '../../navigation/AuthProvider'

const SignUp = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecurePassConfirm, setIsSecurePassConfirm] = useState(true);
  const { signup } = useContext(AuthContext);

  const signupValidationSchema = yup.object().shape({

    email: yup
      .string()
      .required(moment().locale() == "tr" ?
        'Boş Geçilemez'
        :
        'Cannot be blank')
      .email(moment().locale() == "tr" ?
        'Geçerli bir e-mail adresi giriniz!'
        :
        'Please enter a valid email address!'),

    password: yup
      .string()
      .required(moment().locale() == "tr" ?
        'Boş Geçilemez'
        :
        'Cannot be blank')
      .min(6, ({ min }) => moment().locale() == "tr" ?
        'Şifre en az ' + min + ' karakterden oluşmalıdır'
        :
        'Your Password must be at least ' + min + ' characters')
      .matches(/\w*[a-z]\w*/, moment().locale() == "tr" ?
        'En az 1 adet küçük harf kullanmalısınız!'
        :
        'You must use at least 1 lowercase letter!')
      .matches(/\w*[A-Z]\w*/, moment().locale() == "tr" ?
        'En az 1 adet büyük harf kullanmalısınız!'
        :
        'You must use at least 1 capital letter!')
      .matches(/\d/, moment().locale() == "tr" ?
        'En az 1 adet rakam kullanmalısınız!'
        :
        'You must use at least 1 number!')
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, moment().locale() == "tr" ?
        'En az 1 adet özel karakter kullanmalısınız!'
        :
        'You must use at least 1 special character!'),


    passwordConfirm: yup
      .string()
      .required(moment().locale() == "tr" ?
        'Boş Geçilemez'
        :
        'Cannot be blank')
      .oneOf([yup.ref('password')], 'Şifreler uyumsuz')
      .min(6, ({ min }) => moment().locale() == "tr" ?
        'Şifre en az ' + min + ' karakterden oluşmalıdır'
        :
        'Your Password must be at least ' + min + ' characters')
      .matches(/\w*[a-z]\w*/, moment().locale() == "tr" ?
        'En az 1 adet küçük harf kullanmalısınız!'
        :
        'You must use at least 1 lowercase letter!')
      .matches(/\w*[A-Z]\w*/, moment().locale() == "tr" ?
        'En az 1 adet büyük harf kullanmalısınız!'
        :
        'You must use at least 1 capital letter!')
      .matches(/\d/, moment().locale() == "tr" ?
        'En az 1 adet rakam kullanmalısınız!'
        :
        'You must use at least 1 number!')
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, moment().locale() == "tr" ?
        'En az 1 adet özel karakter kullanmalısınız!'
        :
        'You must use at least 1 special character!'),

  });

  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      padding: '2%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Text style={{
        fontSize: 75,
        textAlign: 'center',
        color: mainColor
      }}>
        Marvel
      </Text>


      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{
          email: '',
          password: '',
          passwordConfirm: ''
        }}
        onSubmit={values => signup(values.email, values.password, navigation)}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,
        }) => (
          <>

            <TextInput
              name="email"
              placeholder={
                moment().locale() == "tr" ?
                  "E-mail Adresi" :
                  "E-mail Adress"
              }
              style={{
                width: '96%',
                height: 50,
                padding: '2%',
                marginBottom: '2%',
                elevation: 10,
                margin: '2%',
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                paddingHorizontal: '5%',
                borderWidth: 1,
                borderColor: isDarkMode ? Colors.darker : Colors.lighter,
                borderRadius: 8,
                shadowColor: isDarkMode ? Colors.white : Colors.black,
              }}
              color={isDarkMode ? Colors.white : Colors.black}
              placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && <Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.email}</Text>}

            <View style={{
              width: '96%',
              height: 50,
              marginBottom: '2%',
              elevation: 10,
              margin: '2%',
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              paddingHorizontal: '5%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isDarkMode ? Colors.darker : Colors.lighter,
              borderRadius: 8,
              shadowColor: isDarkMode ? Colors.white : Colors.black,
            }}>
              <TextInput
                name="password"
                placeholder={
                  moment().locale() == "tr" ?
                    "Şifre" :
                    "Password"
                }
                style={{
                  width: '95%',
                  fontSize: 16
                }}
                color={isDarkMode ? Colors.white : Colors.black}
                placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={isSecurePass}
              />
              <IconFA5 onPress={() => {
                setIsSecurePass(!isSecurePass)
              }}
                name={isSecurePass ? 'eye-slash' : 'eye'}
                size={20}
                color={mainColor} />
            </View>

            <View>{errors.password && (<Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.password}</Text>)}</View>

            <View style={{
              width: '96%',
              height: 50,
              marginBottom: '2%',
              elevation: 10,
              margin: '2%',
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              paddingHorizontal: '5%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isDarkMode ? Colors.darker : Colors.lighter,
              borderRadius: 8,
              shadowColor: isDarkMode ? Colors.white : Colors.black,
            }}>
              <TextInput
                name="passwordConfirm"
                placeholder={
                  moment().locale() == "tr" ?
                    "Şifre Tekrarı" :
                    "Password Repeat"
                }
                style={{
                  height: 50,
                  width: '95%',
                  fontSize: 16
                }}
                color={isDarkMode ? Colors.white : Colors.black}
                placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                value={values.passwordConfirm}
                secureTextEntry={isSecurePassConfirm}
              />
              <IconFA5 onPress={() => {
                setIsSecurePassConfirm(!isSecurePassConfirm)
              }}
                name={isSecurePassConfirm ? 'eye-slash' : 'eye'}
                size={20}
                color={mainColor} />
            </View>
            {errors.passwordConfirm && (<Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.passwordConfirm}</Text>)}

            <View style={{
              width: '100%',
              marginTop: '5%',
            }}>

              <TouchableOpacity style={{
                backgroundColor: isValid ? mainColor : '#BDBDBD',
                alignItems: 'center',
                padding: '2%',
                borderRadius: 10
              }}
                disabled={!isValid}
                onPress={handleSubmit}>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>
                  {
                    moment().locale() == "tr" ?
                      "Üye Ol" : "Sign Up"
                  }
                </Text>
              </TouchableOpacity>

            </View>


          </>
        )}
      </Formik>

    </SafeAreaView>
  )
}

export default SignUp
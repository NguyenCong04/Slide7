import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';

const Register = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hideShow, setHideShow] = useState(true);

  //Register firebase
  const RegisterFC = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show('Register successfully', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(erro => {
        if (erro.code === 'auth/email-already-in-user') {
          ToastAndroid.show(
            'That email address already in user !',
            ToastAndroid.SHORT,
          );
        }
        if (erro.code === 'auth/invalid-email') {
          ToastAndroid.show(
            'That email address is invaild !',
            ToastAndroid.SHORT,
          );
        }
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 28,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        Register
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#909090',
          marginTop: 10,
          marginBottom: 10,
          paddingHorizontal: 15,
        }}
        placeholder="Enter your email"
        onChangeText={txt => setEmail(txt)}
      />
      <View
        style={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#909090',
          marginTop: 10,
          marginBottom: 10,
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            flex: 1,
          }}
          placeholder="Enter your password"
          onChangeText={txt => setPassword(txt)}
          secureTextEntry={hideShow}
        />
        <TouchableOpacity
          onPress={() =>
            hideShow == true ? setHideShow(false) : setHideShow(true)
          }>
          <Image
            style={{width: 20, height: 20}}
            source={
              hideShow
                ? require('../assets/image/show.png')
                : require('../assets/image/hide.png')
            }
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={RegisterFC}
        style={{
          backgroundColor: '#242424',
          height: 50,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={{color: 'white'}}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{textAlign: 'center', marginTop: 10, fontSize: 15}}>
          Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});

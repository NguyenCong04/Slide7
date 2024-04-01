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
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '998759207167-l9jm7gtdtkvteo4i3hi7s9ib9iqmhqjt.apps.googleusercontent.com',
});

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hideShow, setHideShow] = useState(true);

  //Login firebase
  const LoginFC = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show('Login successfully', ToastAndroid.SHORT);
        navigation.navigate('Main');
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

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

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
        Login
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
        onPress={LoginFC}
        style={{
          backgroundColor: '#242424',
          height: 50,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={{color: 'white'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{textAlign: 'center', marginTop: 10, fontSize: 15}}>
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          onGoogleButtonPress().then(() => {
            console.log('Login true');
            ToastAndroid.show('Login successfully', ToastAndroid.SHORT);
            navigation.navigate('Main');
          })
        }
        style={{
          borderWidth: 1,
          marginTop: 10,
          borderColor:'#909090',
          height: 50,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Login with google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});

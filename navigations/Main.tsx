import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Main = ({navigation}: any) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Notifications !', 'Are you sure you want to sign out?', [
            {
              text: 'No',
            },
            {
              text: 'Yes',
              onPress: () => {
                auth()
                  .signOut()
                  .then(() => {
                    navigation.navigate('Login');
                  });
              },
            },
          ]);
        }}
        style={{
          backgroundColor: '#242424',
          height: 50,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          width: 180,
        }}>
        <Text style={{color: 'white'}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});

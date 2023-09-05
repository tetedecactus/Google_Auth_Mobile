import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const [ accessToken, setAccessToken ] = useState("");
  const [ user, setUser ] = useState(null);
  const [ request, response, promptAsync ] = Google.useIdTokenAuthRequest({
    clientId: "156746629585-cftsv759l97movok9msarfls95scjr17.apps.googleusercontent.com",
    iosClientId: "156746629585-g7469j2bda0tisfbg4es2f3uhfvai1bs.apps.googleusercontent.com",
    androidClientId: "156746629585-4sjkfidasaue9c06r6sc94lffaujeqrq.apps.googleusercontent.com"
  });

  useEffect( () => {
    if(response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {Authorization: `Bearer ${accessToken}`}
    });
    const useInfo = await response.json();
    setUser(useInfo); 
  }

  // Components Who Show User Info
  const ShowUserInfo = () => {
    if(user) {
      return(

      )
    }
  }

  const ShowUserSignUp = () => {
    if( user === null ){
      return(

      )
    }
  }

  return (
    <View style={styles.container}>
      { user && <ShowUserInfo /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

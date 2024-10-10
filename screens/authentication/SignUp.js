/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PhoneInput from '../../components/PhoneInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  warnText:{
    fontSize: 10,
    fontWeight: 'bold',
  },
  innerText:{
    color:'Blue'
  },
});

export default function SignUp({ navigation }) {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phone_number, onChangePhone] = useState('');
  const [full_phone,setFullPhone] = useState('');
  const [country_code, onChangeCountryCode] = useState('+1');
  const [country_name, onChangeCountryName] = useState("United States");
  const [zoneinfo, onChangeTimeZone] = useState('');
  const [password, onChangePassword] = useState('');
  const [repeatPassword, onChangeRepeatPassword] = useState('');

  const [invalidMessage, setInvalidMessage] = useState(null);

  const signUp = async () => {
    const validPassword = password.length > 5 && (password === repeatPassword);
    if (validPassword) {
      setInvalidMessage(null);
      Auth.signUp({
        username: email, 
        password,
        attributes: {
          email, // optional
          name,
          // country_code, // later added to db
          phone_number: full_phone, // later changed into phone without country code
          zoneinfo
        },
        validationData: [], // optional
      })
        .then((data) => {
          console.log(data);
          console.log('navigation: ', navigation);
          navigation.navigate('Confirmation', { email });
        })
        .catch((err) => {
          if (err.message) {
            setInvalidMessage(err.message);
          }
          console.log(err);
        });
    } else {
      setInvalidMessage('Password must be equal and have greater lenght than 6.');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={name}
        placeholder="Name"
        onChange={(text) => onChangeName(text)}
        autoFocus
      />
      <Input
        value={email}
        placeholder="email@example.com"
        onChange={(text) => onChangeEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      {/* <Input
        value={phone_number}
        placeholder="Phone number"
        onChange={(text) => onChangePhone(text)}
        autoCapitalize="none"
        autoCompleteType="tel"
        keyboardType="phone-pad"
      /> */}
      <PhoneInput
        countryCode= {country_code}
        setCountryCode={(text) => onChangeCountryCode(text)}
        countryName={country_name} 
        onChangeCountryName={onChangeCountryName}
        setFullPhone={setFullPhone}
        phone={phone_number}
        onChangePhone={(text) => onChangePhone(text)}
        preferredCountries ={['US']}
        label=''
        errorMessage = ""
      />
      <Input
        value={zoneinfo}
        placeholder="PST"
        onChange={(text) => onChangeTimeZone(text)}
        autoCapitalize="none"
       // autoCompleteType="email"
       // keyboardType="email-address"
      />
      <Input
        value={country_name}
        placeholder="United States"
        onChange={(text) => onChangeCountryName(text)}
        autoCapitalize="none"
       // autoCompleteType="email"
       // keyboardType="email-address"
      />
      <Input
        value={password}
        placeholder="password"
        onChange={(text) => onChangePassword(text)}
        secureTextEntry
        autoCompleteType="password"
      />
      <Input
        value={repeatPassword}
        placeholder="Repeat password"
        onChange={(text) => onChangeRepeatPassword(text)}
        secureTextEntry
        autoCompleteType="password"
      />
      <Button
        onPress={() => signUp()}
      >
        Sign Up
      </Button>
      <Text style={styles.warnText}>You will receive one time authentication code sent to your phone from <Text style={{ color: '#538CC6' }}>Saayam For All. </Text> Message and data rates may apply.
      </Text>
      <Text>
        {invalidMessage}
      </Text>
    </View>
  );
}

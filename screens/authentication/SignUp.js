/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { signUp } from 'aws-amplify/auth';
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
  const [passwordValid, setPasswordValid] = useState(true);
  const [repeatPassword, onChangeRepeatPassword] = useState('');

  const [invalidMessage, setInvalidMessage] = useState(null);

  const userSignUp = async () => {
    const validPassword = password.length > 5 && (password === repeatPassword);
    if (validPassword) {
      setInvalidMessage(null);
      signUp({
        username: email, 
        password,
        options: {
        userAttributes: {
          email, 
          name,
          // country_code, // later added to db
          phone_number: full_phone, // later changed into phone without country code
          zoneinfo
        }},
        validationData: [], // optional
      })
        .then((data) => {
          console.log(data);
          console.log('navigation: ', navigation);
          navigation.navigate('Confirmation', { email });
        })
        .catch((err) => {
          console.log("Error signing up:", err.underlyingError);
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
      {!passwordValid && 
        <Text style={{ color: 'red' }}>
          Password must be at least 8 characters long and contain at least one lowercase letter
        </Text>
      }
      <Input
        value={password}
        placeholder="password"
        onChange={(text) => {
          const valid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
          const isValid = valid.test(text);
          if(!isValid) {
            setPasswordValid(false);
          } else {
            setPasswordValid(true);
          }
          onChangePassword(text);
        }}
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
        onPress={() => userSignUp()}
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

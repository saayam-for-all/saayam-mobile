import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,Alert} from 'react-native';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState('');
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState('');
  const [zone, setZone] = useState('');

  const validateForm = () => {
    // First Name and Last Name should contain text only (no numbers or special characters)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName)) {
      Alert.alert('Invalid Input', 'First Name should contain only letters.');
      return false;
    }
    if (!nameRegex.test(lastName)) {
      Alert.alert('Invalid Input', 'Last Name should contain only letters.');
      return false;
    }

    // Email should contain @ and follow general email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    // Phone number should start with '+' and contain digits only
    const phoneRegex = /^\+[0-9]{1,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Phone number should start with "+" followed by digits.');
      return false;
    }

    // Time Zone should be in uppercase
    if (zone !== zone.toUpperCase()) {
      Alert.alert('Invalid Time Zone', 'Time Zone should be in uppercase.');
      return false;
    }

    // DOB should match the DD/MM/YY format
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
    if (!dobRegex.test(dob)) {
      Alert.alert('Invalid Date of Birth', 'DOB should be in the format DD/MM/YY.');
      return false;
    }

        // If all validations pass
    return true;
  };

  const handleUpdateProfile = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Profile updated successfully.');
      // Proceed with the profile update logic here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Primary Email"
        keyboardType="email-address"
        value={primaryEmail}
        onChangeText={setPrimaryEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Secondary Email"
        keyboardType="email-address"
        value={secondaryEmail}
        onChangeText={setSecondaryEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Primary Phone Number"
        keyboardType="phone-pad"
        value={primaryPhoneNumber}
        onChangeText={setPrimaryPhoneNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Secondary Phone Number"
        keyboardType="phone-pad"
        value={secondaryPhoneNumber}
        onChangeText={setSecondaryPhoneNumber}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Zone"
        value={zone}
        onChangeText={setZone}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    color: '#374151',
    paddingRight: 30,
    backgroundColor: '#f9fafb',
    marginBottom: 16,

  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    color: '#374151',
    paddingRight: 30,
    backgroundColor: '#f9fafb',
    marginBottom: 16,
  },
});

export default EditProfile;

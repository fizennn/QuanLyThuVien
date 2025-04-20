import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProfileScreenCompoment from '../../components/ProfileScreen';


const ProfileScreen = () => {
  const { user, loading } = useSelector((state) => state.auth);
  
}

export default ProfileScreen

const styles = StyleSheet.create({})
import { useMutation } from 'react-query';
import axios from 'axios';
import DriverStartModal from '../components/DriverStartModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert } from 'react-native';


const BASE_URL = 'https://vi7lmzryog.execute-api.us-west-2.amazonaws.com/prod';

// 출근하기
export const updateDriverStatusStart = async () => {
  const driverMobileNum = await AsyncStorage.getItem('phoneNumber');
  const url = `${BASE_URL}/drivers/${driverMobileNum}/status`;
  console.log('driverMobileNum는', driverMobileNum);
  try {
    const response = await axios.patch(url, { type: 'start' });
    const data = response.data;
    if(response.status === 200 && data.msg === 'ok'){
      console.log(data, '함수 ok?');
      return data;
    } else if (response.status === 200 && data.msg === '데이터가 존재하지 않습니다') {
      console.log('error', '데이터가 존재하지 않습니다!');
    }
    console.log('data:', data);
    return data;
  } catch (error:any) {
    console.log('출근하기 error 상황', error.code, error.message);
  }
};

// 출근 시 재고 입력
export const updateDriverInventory = async () => {
  const truckID = await AsyncStorage.getItem('truckID');
  const url = `${BASE_URL}/trucks/${truckID}/stock`;
  console.log('truckID는', truckID);
  try {
    const response = await axios.patch(url);
    const data = response.data;
    if(response.status === 200 && data.msg === 'ok'){
      console.log(data, '출근 재고 입력 ok?');
      return data;
    } else if(response.status === 422) {
      console.log('error', '필요한 데이터가 입력되지 않았습니다.');
    }
    console.log('data:', data);
    return data;
    } catch (error:any) {
    console.log('출근 시 재고 입력 error 상황', error.code, error.message);
  }
};

// React Query's useMutation hook wrapping the API request (출근하기)
export const useUpdateDriverStatusStart = () => {
  console.log('useUpdateDriverStatusStart 함수 실행');
  return useMutation(updateDriverStatusStart);
};

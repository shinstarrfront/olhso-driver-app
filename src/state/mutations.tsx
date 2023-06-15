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

  let Info;
  AsyncStorage.getItem('slotstate', (err, result:any) => {
    Info = JSON.parse(result);
  });

  const truckID = await AsyncStorage.getItem('truckID'); 
  // const url = `${BASE_URL}/trucks/${truckID}/stock`;
  const url = `${BASE_URL}/trucks/T1/stock`;

  try {
    const response = await axios.patch(url, {"data":Info});
    console.log('@@@@@@response는@@@@', response);
    const data = response.data;
    if(response.status === 200 && data.msg === 'ok'){
      console.log(data, '출근 재고 입력');
      return data;
    } else if(response.status === 422) {
      console.log('error', );
    }
    console.log('data:', data);
    return data;
    } catch (error:any) {
    console.log('출근 시 재고 입력 error 상황', error.code, error.message);
  }
};

// 트럭에 배정된 드라이버 변경
export const updateDriverStatusChange = async () => {
  const truckID = await AsyncStorage.getItem('truckID');
  const driverID = await AsyncStorage.getItem('driverID');
  // const url = `${BASE_URL}/trucks/${truckID}/driver`;
  const url = `${BASE_URL}/trucks/T1/driver`;
  console.log('truckID는', truckID);
  console.log('driverID는', driverID);
  try {
    // const response = await axios.patch(url, {"driverID": driverID});
    const response = await axios.patch(url, {"driverID": "D1"});
    const data = response.data;
    if(response.status === 200 && data.msg === 'ok'){
      console.log(data, '트럭에 배정된 드라이버 변경');
      return data;
    } else if(response.status === 422) {
      console.log('error', '필요한 데이터가 입력되지 않았습니다.');
    }
    console.log('data:', data);
    return data;
    }
  catch (error:any) {
    console.log('트럭에 배정된 드라이버 변경 error 상황', error.code, error.message);
  }
};

//트럭의 운행 상태 변경
export const updateTruckStatusChange = async (status: 'start' | 'finish') => {
  const truckID = await AsyncStorage.getItem('truckID'); 
  const url = `${BASE_URL}/trucks/${truckID}/status`;
  try {
    // API 요청에서 body의 "type" 필드를 입력받은 status로 설정
    const response = await axios.patch(url, {"type": status});
    const data = response.data;
    if(response.status === 200 && data.msg === 'ok'){
      console.log(data, '트럭의 운행 상태 변경');
      return data;
    } else if(response.status === 422) {
      console.log('error', '필요한 데이터가 입력되지 않았습니다.');
    }
    console.log('data:', data);
    return data;
    }
  catch (error:any) {
    console.log('트럭의 운행 상태 변경 error 상황', error.code, error.message);
  }
};


// React Query's useMutation hook wrapping the API request (출근하기)
export const useUpdateDriverStatusStart = () => {
  console.log('useUpdateDriverStatusStart 함수 실행');
  return useMutation(updateDriverStatusStart);
};

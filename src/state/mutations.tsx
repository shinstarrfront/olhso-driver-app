import { useMutation } from 'react-query';
import axios from 'axios';
import DriverStartModal from '../components/DriverStartModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const BASE_URL = 'https://vi7lmzryog.execute-api.us-west-2.amazonaws.com/prod';
const driverMobileNum = AsyncStorage.getItem('phoneNumber');

// 출근하기
export const updateDriverStatusStart = async (driverMobileNum: any) => {
  try {
    const url = `${BASE_URL}/drivers/${driverMobileNum}/status`;
    console.log('driverMobileNum는', driverMobileNum);

    const response = await axios.patch(url, { type: 'start' });

    if (response && response.status === 200) {
      const data = response.data;
      const [isModalVisible, setModalVisible] = useState(false);

      // 서버 응답에 따른 처리
      if (data.msg === 'ok') {
        console.log('서버 응답 ok 성공', data);
        // 출근 완료 모달 띄우기
        setModalVisible(true);
      } else if (data.msg === '데이터가 존재하지 않습니다') {
        console.log('서버 응답 ok이지만 데이터 존재하지 않는다', data);
      }

      console.log('data!!', data);
      return data;
    } else {
      console.log('서버 응답 에러', response);
      throw new Error('API request failed');
    }
  } catch (error) {
    console.log('error 상황', error);
  }
};

// React Query's useMutation hook wrapping the API request (출근하기)
export const useUpdateDriverStatusStart = () => {
  console.log('useUpdateDriverStatusStart 함수 실행');
  return useMutation(updateDriverStatusStart);
};

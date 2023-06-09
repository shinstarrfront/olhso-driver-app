//React Query queries 정의하기 위한 파일(서버에서 데이터를 가져오고 구성 요소의 데이터 상태를 관리하는 데 사용)
import { useQuery } from 'react-query';
import axios from 'axios';
import DriverStartModal from '../components/DriverStartModal';
import { useState } from 'react';
import { AsyncStorage } from '@aws-amplify/core';



const BASE_URL = 'https://vi7lmzryog.execute-api.us-west-2.amazonaws.com/prod';


    //드라이버의 기본 정보 가져오기
    export const getDriverInfo = async () => {
        const driverMobileNum = await AsyncStorage.getItem('phoneNumber');
        const url = `${BASE_URL}/drivers/${driverMobileNum}`;
        // const url = `${BASE_URL}/drivers/+8201039598640`;
        console.log('driverMobileNum:',driverMobileNum);
        try{
        const response = await axios.get(url);
        const data = response.data;
        // 서버 응답에 따른 처리
        if(response.status === 200 && data.msg === 'ok'){
          console.log(data, '함수 ok?');
        // 서버로부터 받은 드라이버 개인 정보, AsyncStorage에 저장
          await AsyncStorage.setItem('driverInfo', JSON.stringify(data));
        } else if (response.status === 200 && data.msg === '데이터가 존재하지 않습니다') {
          console.log('error', '데이터가 존재하지 않습니다!');
        }
        console.log('data:', data);
        return data;
      } catch(error:any){
        console.log('error:', error.response.status, error.response.data.msg); 
      }
      };

    //운행 가능한 트럭 리스트 가져오기
    export const getPossibleTruckList = async () => {
        const url = `${BASE_URL}/trucks?status='active'`;
        try{
        const response = await axios.get(url);
        const data = response.data;
        // 서버 응답에 따른 처리
        if(response.status === 200 && data.msg === 'ok'){
            console.log(data, 'ok?');
        } else if (response.status === 200 && data.msg === '운행가능한 트럭이 없습니다') {
          console.log('error::', '운행가능한 트럭이 없습니다');
        }
        console.log('data::', data);
        return data;
        }
        catch(error:any){
        console.log('error::', error.response.status, error.response.data.msg); 
        }
    };

    //메뉴 정보 확인
    export const getMenuInfo = async () => {
        //아직 미정으로 수정 예정(api 작업 전)
        const url = `${BASE_URL}/menus?type=AutoWok`;
        try{
        const response = await axios.get(url);
        const data = response.data;
        //서버 응답에 따른 처리
        if(response.status === 200 && data.msg === 'ok'){
            console.log(data, 'ok??');
        }else if(response.status === 200 && data.msg === '메뉴 리스트가 없습니다'){
            console.log('error==', '메뉴 리스트가 없습니다');
        }
        console.log('data==', data);
        return data;
        }
        catch(error:any){
        console.log('error==', error.response.status, error.response.data.msg); 
        }
    };


    // 트럭의 배달완료 목록 가져오기
    export const getDeliveryList = async (truckID:string, startDate:string, endDate:string) => {
      const url = `${BASE_URL}/orders`;
      try{
          const response = await axios.get(url, {
              params: {
                  truckID: truckID,
                  startDate: startDate,
                  endDate: endDate,
                  status: 'completed',
              }
          });
          const data = response.data;

      //서버 응답에 따른 처리
      if(response.status === 200){
          console.log(data, '200 ok!');
      } else if(response.status === 422){
          console.log('422 error');
      } else if(response.status === 500){
        console.log('500 error');
      }
      console.log('data==', data);
      return data;
      }
      catch(error){
          console.log('error야', error); 
      }
  };

    // React Query의 useMutation 훅을 사용하여 API 요청을 감싸는 커스텀 훅(기본 정보 가져오기)
    export const useGetDriverInfo = (driverID: string) => {
        console.log('getDriverInfo 함수 실행');
        return useQuery(getDriverInfo);
      }

    
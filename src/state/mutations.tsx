// //React Query mutations(변형)을 정의하기 위한 파일(서버에서 데이터를 생성, 업데이트 또는 삭제하는 등 데이터 돌연변이를 관리하는 데 사용)

import { useMutation } from 'react-query';
import axios from 'axios';

const BASE_URL = 'https://vi7lmzryog.execute-api.us-west-2.amazonaws.com/prod';

export const updateDriverStatusStart = async (driverID: string) => {
  const url = `${BASE_URL}/drivers/${driverID}/status`;
  try {
    const response = await axios.patch(url, { type: 'start' });
    const data = response.data;

    // 서버 응답에 따른 처리
    if (response.status === 200 && data.msg === 'ok') {
      console.log(data, '함수 ok?');
      alert('ok');
    } else if (response.status === 200 && data.msg === '데이터가 존재하지 않습니다') {
      console.log('error', '데이터가 존재하지 않습니다!');
    }

    return data;
  } catch (error: any) {
    console.log('error:', error.response.status);
  }
};
// React Query의 useMutation 훅을 사용하여 API 요청을 감싸는 커스텀 훅(출근하기)
export const useUpdateDriverStatusStart = (driverID: string) => {
  console.log('updateDriverStatusStart 함수 실행');
  return useMutation(updateDriverStatusStart);
};


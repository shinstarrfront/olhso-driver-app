// 소켓 연결, 중앙에서 관리하기
import io from 'socket.io-client';
import * as Location from 'expo-location';

// const socket = io('http://localhost:8080/truck'
// , { transports: ['websocket'] });

const socket = io('http://olhsosocket.us-west-2.elasticbeanstalk.com/truck'
, { transports: ['websocket'] });

// connect 이벤트 구독(출근)
socket.on('connect', async () => {
  console.log('소켓 연결 성공적');

  socket.emit('enterRoom'
  , { truckID: 'T1' });
  console.log('enterRoom 성공적');

  socket.on('orderList', (data) => {
    console.log('주문 목록 이벤트가 수신됨', data);
  });
  console.log('orderList 구독 성공적');

  socket.emit('updateLocation'
  , { truckID:'T1', lng:3.456, lat:4.5676 })

  console.log('updateLocation 성공적');
  socket.on('driverError', (error) => {
    console.log('에러 발생', error);
    });
  }
);

// // Truck & Drive NameSpace에 속한 TruckID 룸에 입장하고 enterRoom 이벤트 발생
// socket.emit('enterRoom'
// , { truckID: 'T1' });

// orderList 이벤트를 구독
// socket.on('orderList', (data) => {
//   console.log('주문 목록 이벤트가 수신됨', data);
// });

//에러를 위한 구독
// socket.on('driverError', (error) => {
// console.log('에러 발생', error);
// });

// GPS 정보를 업데이트하는 함수
const updateLocation = async (truckID: string, lng: number, lat: number) => {
  await socket.emit('updateLocation'
  , { truckID:'T1', lng:3.456, lat:4.5676 });
  console.log('GPS 정보 업데이트 확인', updateLocation)
  // 조건 추가 필요()
  // 현재 위치값에서 이동 시 보내기 or
  // 시간제한(3~5초)을 줘서 업데이트를 한다
}

// 위치 정보 업데이트를 위한 이벤트 핸들러 등록(expo-location 사용)
// Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval:10 },
//   (position) => {
//     const { coords } = position;
//     const { longitude, latitude } = coords;
//     updateLocation('truckID', longitude, latitude);
//   });

// updateLocation('T1', 3.456, 4.5676);

export default socket;

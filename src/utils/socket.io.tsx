// 소켓 연결, 중앙에서 관리하기
import io from 'socket.io-client';
import * as Location from 'expo-location';

const socket = io('http://localhost:8080/truck', { transports: ['websocket'] });

// connect 이벤트 구독(출근)
socket.on('connect', () => {
  console.log('소켓 연결 성공적');
});

// Truck & Drive NameSpace에 속한 TruckID 룸에 입장하고 enterRoom 이벤트 발생
socket.emit('enterRoom', { truckID: '1234' });

// orderList 이벤트를 구독
socket.on('orderList', (data) => {
  console.log('주문 목록 이벤트가 수신됨', data);
});

// GPS 정보를 업데이트하는 함수
const updateLocation = (truckID: string, lng: number, lat: number) => {
  socket.emit('updateLocation', { truckID, lng, lat }, 'Truck & Drive', 'TruckID');
}

// 위치 정보 업데이트를 위한 이벤트 핸들러 등록(expo-location 사용)
Location.watchPositionAsync({ accuracy: Location.Accuracy.High },
  (position) => {
    const { coords } = position;
    const { longitude, latitude } = coords;
    updateLocation('1234', longitude, latitude);
  });

export default socket;

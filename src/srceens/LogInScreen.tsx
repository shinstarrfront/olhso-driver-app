import  {StyleSheet, Text, View, Button}  from "react-native";
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

interface LogInScreen {

};
const StyledButton = styled(Button)`
  height: 40px;
  width: 200px;
  margin-top: 16px;
`;


const LogInScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>OLHSO</Text>
            <StyledButton title="Phone Number LogIn" onPress={()=>{}}/>
            <StyledButton title="Connect to Service Center" onPress={()=>{}}/>
        </View>
    );
};

LogInScreen.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
    },
});

export default LogInScreen;

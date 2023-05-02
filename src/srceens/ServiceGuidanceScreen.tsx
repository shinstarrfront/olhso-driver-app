import { StyleSheet, Text, View } from "react-native";


const ServiceGuidanceScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
        </View>
    );
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

export default ServiceGuidanceScreen;
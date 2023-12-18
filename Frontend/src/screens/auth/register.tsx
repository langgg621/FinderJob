import React from "react"
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native"
import { NAVIGATION_TITLE } from "../../constants/navigation"
import { useNavigation } from "@react-navigation/native"

const Register =()=>{
    const navigation = useNavigation<any>()
    return (
        <View style={styles.container}>
            <Image style={styles.usericon} source={require('../../../assets/appicon.png')}/>
            <TouchableOpacity style={styles.btn} onPress={()=>{ navigation.navigate(NAVIGATION_TITLE.REGISTER_COM)}}>
                <Text style={styles.logintxt}> Đăng ký Công ty</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{ navigation.navigate(NAVIGATION_TITLE.REGISTER_EMP)}}>
                <Text style={styles.logintxt}> Đăng ký Ứng viên</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems:"center",
        padding: 50,
        justifyContent: "center",
        alignSelf: "center",
        
    },
    btn:{
        marginTop: 10,
        backgroundColor: "#F13333",
        height: 45,
        width: 330,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    logintxt:{
        color:"#FFF",
        fontSize: 15
    },    
    usericon:{
        marginTop:30,
    },
})
export default Register
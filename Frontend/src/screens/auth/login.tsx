import React, { useState } from "react"
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginActions } from "../../actions/authActions";
import { setItemAsyncStorage } from "../../utils/asyncStorage";
import { KEY_STORAGE } from "../../constants/storage";
import { showToast } from "../../utils/Toast"
import Toast from "react-native-root-toast";
import { KeyboardAvoidingView, TouchableOpacity, View, Image, TextInput, Text, StyleSheet, ToastAndroid  } from "react-native";
import { NAVIGATION_TITLE } from "../../constants/navigation";
import Loading from "../../utils/loading/Loading";

const Login = () =>{
    const [pro5, setpro5] = useState({
        email:'',
        password:'',
    });
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const [loading, setloading] = useState<boolean>(false)
    const handleChangeAcc = (textInputName) => {
        return (value: any) => {
            setpro5({...pro5, [textInputName]:value})
        }
    }
    const handleLogin = () =>{
        setloading(true)
        dispatch(loginActions(pro5))
        .then(res =>{
            setloading(false)
            if(res.payload){
                setItemAsyncStorage(KEY_STORAGE.SAVED_INFO, JSON.stringify(res.payload));
                const {role } = res.payload;
                if (res.payload.role === 'Company') {
                    navigation.navigate(NAVIGATION_TITLE.TAB_COM, { screen: NAVIGATION_TITLE.HOME_COM });
                } else if (res.payload.role === 'Employee') {
                    navigation.navigate(NAVIGATION_TITLE.TAB_EMP, { screen: NAVIGATION_TITLE.HOME_EMP });
                }
                setpro5({
                    email:'',
                    password:'',
                });
                return(showToast('Đăng nhập thành công', {duration:2, position: Toast.positions.CENTER}))
            }
            else{
                showToast('Xem lại thông tin đăng nhập', {duration: 2, position: Toast.positions.CENTER})
            }
        })
        .catch(err=>{
            setloading(false)
            console.log('hello', err)
            showToast('Xem lại thông tin đăng nhập', {duration: 2, position: Toast.positions.CENTER})

        })
    };

    return (
    <KeyboardAvoidingView style={styles.container}>
        <View style={styles.login}>
        <Image style={styles.usericon} source={require('../../../assets/appicon.png')}/>
        <TextInput 
            style={styles.textinput} 
            placeholder={"Enter your email"}
            value={pro5.email}
            keyboardType='email-address'
            onChangeText={handleChangeAcc('email')}/>
        <TextInput 
            style={styles.textinput} 
            value={pro5.password}
            onChangeText={handleChangeAcc('password')}
            placeholder={"Enter your password"}
            secureTextEntry
            />
        </View>
        <View>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                <Text style={styles.logintxt}>Log in</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.signup}>
            <Text> Don't have an account yet ?</Text>
            <TouchableOpacity onPress={() => {navigation.navigate(NAVIGATION_TITLE.REGISTER)}}>
            <Text style={styles.signuptxt}> Sign up</Text>
            </TouchableOpacity> 
        </View>
    </KeyboardAvoidingView>
    );
    
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
    textinput:{
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width:330,
        height:50,
        backgroundColor: "#FFF",
        borderWidth:1
    },
    usericon:{
        marginTop:30,
        marginBottom:30
    },
    login:{
        alignItems:"center",
        marginTop:20
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
    signup:{
        marginTop:13,
        flexDirection:"row",
        left:45
    },
    signuptxt:{
        color:"#39E28D",
    },

    icon:{
        backgroundColor:"#FFF",
        borderRadius:100,
        width:30,
        alignItems:"center"
    },

});
export default Login;
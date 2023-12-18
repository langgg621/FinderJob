import { useNavigation } from "@react-navigation/native";
import { useState } from "react"
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { showToast } from "../../utils/Toast";
import { validateEmail, validatePassword } from "../../utils/validate";
import { KeyboardAvoidingView,StyleSheet, Image, TextInput, View, TouchableOpacity,Text } from "react-native";
import { registerEmployeeAction } from "../../actions/authActions";
import React from "react";
import { NAVIGATION_TITLE } from "../../constants/navigation";

const RegisterEmp =()=>{
    const[pro5, setpro5] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const handleChangeAcc = (textInputName) => {
        return (value: any) => {
            setpro5({...pro5, [textInputName]:value})
        }
    }
    const handleRegister = async () => {
        if(!pro5.name || !pro5.email || !pro5.password || !pro5.confirmPassword){
            showToast('Vui lòng điền đầy đủ thông tin', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else if(validateEmail(pro5.email)){
            showToast('Email không đúng định dạng', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else if(validatePassword(pro5.password) || validatePassword(pro5.confirmPassword)){
            showToast('Password tối thiểu 6 kí tự', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else if(pro5.password != pro5.confirmPassword){
            showToast('Mật khẩu không trùng khớp', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else{
            dispatch(registerEmployeeAction({
                Name: pro5.name,
                Email: pro5.email,
                Password: pro5.password,
                ConfirmPassword: pro5.confirmPassword
            })).then(res =>{
                showToast('Đăng kí thành công',{duration:2, position: Toast.positions.CENTER})
                navigation.navigate(NAVIGATION_TITLE.LOGIN);
                setpro5({
                    name:'',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            })            
            .catch(err => {
                if (err.response && err.response.status === 400 && err.response.data && err.response.data.message === "User has exist") {
                  showToast('User đã tồn tại. Không thể đăng ký.', { duration: 2, position: Toast.positions.BOTTOM });
                } else {
                  showToast('Có lỗi', { duration: 2, position: Toast.positions.BOTTOM });
                }
              });
        }
    }    
    return(
        <KeyboardAvoidingView style={styles.container}>
            <View>
            <Image style={styles.usericon} source={require('../../../assets/appicon.png')}/>

                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Enter your fullname"}
                    value={pro5.name}
                    onChangeText={handleChangeAcc('name')}/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Enter your email"}
                    value={pro5.email}
                    onChangeText={handleChangeAcc('email')}
                    keyboardType="email-address"/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Enter your password"}
                    value={pro5.password}
                    onChangeText={handleChangeAcc('password')}
                    secureTextEntry/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Confirm password"}
                    value={pro5.confirmPassword}
                    onChangeText={handleChangeAcc('confirmPassword')}
                    secureTextEntry/>
            </View>
            <View>
                <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                    <Text style={styles.logintxt}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signup}>
                <Text> Already have an account ?</Text>
                <TouchableOpacity onPress={()=>{ navigation.navigate(NAVIGATION_TITLE.LOGIN)}}>
                <Text style={styles.signuptxt}> Login</Text>
                </TouchableOpacity> 
            </View>
        </KeyboardAvoidingView>
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
export default RegisterEmp;

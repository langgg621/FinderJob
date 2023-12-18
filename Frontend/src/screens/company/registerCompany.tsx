import { useNavigation } from "@react-navigation/native";
import { useState } from "react"
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { showToast } from "../../utils/Toast";
import { validateEmail, validatePassword } from "../../utils/validate";
import { registerCompanyAction } from "../../actions/authActions";
import { KeyboardAvoidingView,StyleSheet, Image, TextInput, View, TouchableOpacity,Text } from "react-native";
import React from "react";
import { NAVIGATION_TITLE } from "../../constants/navigation";

const RegisterCom =()=>{
    const[pro5, setpro5] = useState({
        Name: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
    });
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const handleChangeAcc = (textInputName) => {
        return (value: any) => {
            setpro5({...pro5, [textInputName]:value})
        }
    }
    const handleRegister = async () => {
        if(!pro5.Name || !pro5.Email || !pro5.Password || !pro5.ConfirmPassword){
            showToast('Vui lòng điền đầy đủ thông tin', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else if(validateEmail(pro5.Email)){
            showToast('Email không đúng định dạng', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else if(validatePassword(pro5.Password) || validatePassword(pro5.ConfirmPassword)){
            showToast('Password tối thiểu 6 kí tự', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else if(pro5.Password != pro5.ConfirmPassword){
            showToast('Mật khẩu không trùng khớp', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else{
            dispatch(registerCompanyAction({
                Name: pro5.Name,
                Email: pro5.Email,
                Password: pro5.Password,
                ConfirmPassword: pro5.ConfirmPassword
            })).then(res =>{
                showToast('Đăng kí thành công',{duration:2, position:Toast.positions.BOTTOM})
                navigation.navigate(NAVIGATION_TITLE.LOGIN);
                setpro5({
                    Name: '',
                    Email: '',
                    Password: '',
                    ConfirmPassword: ''
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
                    value={pro5.Name}
                    onChangeText={handleChangeAcc('Name')}/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Enter your email"}
                    value={pro5.Email}
                    onChangeText={handleChangeAcc('Email')}
                    keyboardType="email-address"/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Enter your password"}
                    value={pro5.Password}
                    onChangeText={handleChangeAcc('Password')}
                    secureTextEntry/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Confirm password"}
                    value={pro5.ConfirmPassword}
                    onChangeText={handleChangeAcc('ConfirmPassword')}
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
export default RegisterCom;

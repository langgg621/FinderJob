import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { showToast } from "../../../utils/Toast";
import Toast from "react-native-root-toast";
import { validatePassword } from "../../../utils/validate";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { TouchableOpacity, View , StyleSheet , Text , TextInput, ToastAndroid, KeyboardAvoidingView} from "react-native";
import { resetEmployeePasswordAction } from "../../../actions/employeeActions";

const ChangePasswordEmployee =() =>{
    const[password, setpassword] = useState({
        prePassword:'',
        password:'',
        rePassword:''
    });
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const onChangeText = (textInputName) =>{
        return(value: any) =>{
            setpassword({...password,[textInputName]: value})
        }
    }
    const [loading, setLoading] = useState(false)
    useEffect(() => {

    }, [])
    const handleResetPassword = async() => {
        if(!password.prePassword || !password.password || !password.rePassword){
            showToast('Vui lòng điền đầy đủ thông tin', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else if(validatePassword(password.prePassword)){
            showToast('Mật khẩu tối thiểu 6 kí tự', {duration: 2, position: Toast.positions.BOTTOM})
        }
        else if(password.password && password.password!== password.rePassword){
            showToast('Mật khẩu nhập lại không đúng', {duration: 2, position: Toast.positions.BOTTOM})

        }
        else{
            dispatch(resetEmployeePasswordAction({
                prePassword: password.prePassword,
                password: password.password
            })).then(res =>{
                setLoading(true)
                console.log(res)
                ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT)
                console.log('Đổi mật khẩu thành công.')
                navigation.navigate(NAVIGATION_TITLE.LOGIN)
                setpassword({
                    prePassword:'',
                    password:'',
                    rePassword:''
                })
                setLoading(false)
                
            })
            .catch(err => showToast('Có lỗi', {duration:2, position:Toast.positions.BOTTOM}))
        }
    }
    return (
        <KeyboardAvoidingView style = {styles.container}>
            <View >
                <Text style={styles.inputLabel}>Mật khẩu cũ</Text>
                <TextInput 
                    value={password.prePassword}
                    style={styles.textinput}
                    onChangeText={onChangeText('prePassword')}
                    placeholder="Nhập mật khẩu cũ"
                    secureTextEntry
                />
                <Text style={styles.inputLabel}>Mật khẩu mới</Text>
                <TextInput 
                    value={password.password}
                    style={styles.textinput}
                    onChangeText={onChangeText('password')}
                    placeholder="Nhập mật khẩu mới"
                    secureTextEntry
                />
                <Text style={styles.inputLabel}>Nhập lại mật khẩu mới</Text>
                <TextInput 
                    value={password.rePassword}
                    style={styles.textinput}
                    onChangeText={onChangeText('rePassword')}
                    placeholder="Nhập lại mật khẩu mới"
                    secureTextEntry
                />
                <View style ={styles.buttonRow}>
                <TouchableOpacity style={styles.btn} onPress={handleResetPassword}>
                    <Text style={styles.logintxt}>Lưu thay đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{
                        navigation.goBack()
                        setpassword({
                            prePassword: '',
                            password: '',
                            rePassword:''
                        })
                    }}>
                    <Text style={styles.logintxt}>Trở về</Text>
                    
                </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>    
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop:70,
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20
    },
    textinput:{
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width:330,
        height:50,
        backgroundColor: "#FFF",
        textAlign:'left', 
    },
    inputLabel: {
        marginBottom: 6,
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'left',
        marginTop:30
    },btn:{
        marginTop: 20,
        backgroundColor: "#F13333",
        height: 45,
        width: 100,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    logintxt:{
        color:"#FFF",
        fontSize: 15
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
    },
})
export default ChangePasswordEmployee
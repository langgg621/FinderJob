import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet, Text, Image, ToastAndroid, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NAVIGATION_TITLE } from "../../../constants/navigation"
import * as MailComposer from 'expo-mail-composer';
import ChangePasswordCompany from "./changePasswordCompany";
import { useDispatch } from "react-redux";
import { deleteCompanyAction } from "../../../actions/companyActions";

const AccCompany =()=>{
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const [loading, setLoading] = useState(false);

    const handleDeleteAcc = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa tài khoản không?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xác nhận',
                    onPress: () => {
                        setLoading(true);
                        dispatch(deleteCompanyAction())
                            .then(() => {
                                ToastAndroid.show('Xóa tài khoản thành công', ToastAndroid.SHORT);
                                // Navigate to login or another appropriate screen
                                navigation.navigate(NAVIGATION_TITLE.LOGIN);
                            })
                            .catch(error => {
                                console.error('Error deleting account:', error);
                                ToastAndroid.show('Xóa tài khoản thất bại', ToastAndroid.SHORT);
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    },
                },
            ],
            { cancelable: false }
        );
};

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.btn, styles.whiteBtn]} onPress={()=>{ navigation.navigate(NAVIGATION_TITLE.CHANGE_PASS_COM)}}>
                <Image style={styles.icon} source={require('../../../../assets/settingIcon/changePass.png')}/>
                <Text style={[styles.logintxt, styles.btnText]}> Đổi mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.whiteBtn]} onPress={()=>{ navigation.navigate(NAVIGATION_TITLE.INFO_COM)}}>
                <Image style={styles.icon} source={require('../../../../assets/settingIcon/infor.jpg')}/>
                <Text style={[styles.logintxt, styles.btnText]}> Thông tin tài khoản</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.btn, styles.whiteBtn]}
                onPress={() => {
                    MailComposer.composeAsync({
                        subject: '',
                        body: '',
                        recipients: ['linh1529465@huce.edu.vn'],
                        isHtml: true
                    }).then(data => {
                        if (data.status == 'sent') {
                            ToastAndroid.show('Cảm ơn bạn đã góp ý cho Moly', ToastAndroid.SHORT)
                        }
                        console.log(data)
                    })
                        .catch(err => console.log(err))
                }}>
                <Image style={styles.icon} source={require('../../../../assets/settingIcon/comment.png')}/>
                <Text style={[styles.logintxt,  styles.btnText]}>Góp ý - đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.whiteBtn]} onPress={handleDeleteAcc}>
                <Image style={styles.icon} source={require('../../../../assets/settingIcon/deleteAcc.png')}/>
                <Text style={[styles.logintxt, styles.btnText]}> Xóa tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.whiteBtn]} onPress={()=>{ navigation.navigate(NAVIGATION_TITLE.LOGIN)}}>
            <Image style={styles.icon} source={require('../../../../assets/settingIcon/log-out.png')}/>
                <Text style={[styles.logintxt, styles.btnText]}> Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        // justifyContent: "center",
        padding: 100,
    },
    itemIcon: {
        height: 30,
        width: 20,
        resizeMode: 'contain',
    },
    itemText: {
        marginLeft: 15,
        fontSize: 16,
    },
    item: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4.65,
        elevation: 7,
    },
    btn:{
        marginTop: 10,
        backgroundColor: "#F13333",
        minHeight: 45,  // Change to minHeight
        width: 330,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    logintxt:{
        color:"#000",
        fontSize: 15
    },
    whiteBtn: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10, // Adjust as needed
    },
    btnText: {
        marginLeft: 10, // Adjust as needed
    },
    usericon:{
        width:150,
        height:150,
        marginTop:30,
        borderRadius:90,
        marginBottom:30
    },
    icon: {
        width: 20, // Adjust as needed
        height: 20, // Adjust as needed
        marginRight: 10, // Adjust as needed
    },
})
export default AccCompany
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanyAction, updateCompanyAction } from "../../../actions/companyActions";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, View, TextInput, Text, StyleSheet, Image, StatusBar, KeyboardAvoidingView, SafeAreaView } from "react-native";
import navigation from "../../../navigation";
import { showToast } from "../../../utils/Toast";
import Toast from "react-native-root-toast";
import { BASE_URL } from "../../../constants/api";
import { ScrollView } from "react-native-gesture-handler";



const InforCompany =()=>{
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState(null);
    const [infoUser, setInfoUser] = useState({
        email: '',
        name: '',
        companyOverview:'',
        companyType:'',
        imagePath:'',
        address:'',
        workingDay:'',
        companySize:'',
    })
    useEffect(() => {
        getInfoUser()
      }, []);
      const getInfoUser = () => {
        setLoading(false)
        dispatch(getCompanyAction())
          .then(res => {
            setLoading(false)
            console.log('company info', res?.payload.result);
            setInfoUser(res?.payload.result)
          })
          .catch(err => {
            setLoading(false)
          })
      }
      const handleEditInforCompany =async ()=>{
        dispatch(updateCompanyAction(infoUser))
        .then((res) =>{
            setLoading(true)
            showToast('Cập nhật thành công',{duration:2, position:Toast.positions.BOTTOM})
            console.log(res, 'update com')
            navigation.goBack()
            setLoading(false)
        })
        .catch(err=> {
            console.log('delete err');
            setLoading(false)
        });
    }
    const onChangeInforCompany = (Name)=>{
        return(value: any) =>{
            setInfoUser({... infoUser, [Name]: value})
        }
    }
    const uploadImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, 
            allowsEditing: true,
            aspect:[5,5],
            quality:1,
        });
        if(!result.canceled){
            setImage(result.assets[0].uri);
            console.log(result)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar/> 
                <View>
                    {!(infoUser?.imagePath == '/image?imageId=null') ?
                        <Image
                            style={styles.modalAvatar}
                            source={{ uri: image ?? `${BASE_URL}${infoUser?.imagePath}` }}
                        />
                        :
                        <Image
                            style={styles.modalAvatar}
                            source={require('../../../../assets/avatar-cute.jpg')}
                        />
                    }
                    <TouchableOpacity
                        style={[styles.modalAvatar, { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2)' }]}
                        onPress={uploadImage}>
                        <Image
                            style={{ height: 15, width: 15, position: 'absolute', bottom: 20, right: 20, tintColor: '#fff' }}
                            source={require('../../../../assets/ic_pencil.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.inputLabel}>Tên</Text>
                <TextInput 
                    value={infoUser.name}
                    style={styles.input}
                    onChangeText={onChangeInforCompany('name')}
                />
                <Text style={styles.inputLabel}>Địa chỉ</Text>
                <TextInput 
                    value={infoUser.address}
                    style={styles.input}
                    onChangeText={onChangeInforCompany('address')}
                />
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput 
                    value={infoUser.email}
                    style={styles.input}
                    onChangeText={onChangeInforCompany('email')}
                />
                
                <Text style={styles.inputLabel}>Số lượng nhân viên</Text>
                <TextInput 
                    value={infoUser.companySize}
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={onChangeInforCompany('companySize')}

                />
                <Text style={styles.inputLabel}>Ngày làm việc</Text>
                <TextInput 
                    value={infoUser.workingDay}
                    style={styles.input}
                    onChangeText={onChangeInforCompany('workingDay')}
                />
                <Text style={styles.inputLabel}>Thông tin chi tiết</Text>
                <TextInput 
                    value={infoUser.companyOverview}
                    style={styles.input}
                    onChangeText={onChangeInforCompany('companyOverview')}
                />
                <TouchableOpacity style={styles.btn} onPress={handleEditInforCompany}>
                    <Text style={styles.logintxt}>Lưu thay đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{
                        navigation.goBack()
                    }}>
                    <Text style={styles.logintxt}>Trở về</Text>
                    
                </TouchableOpacity>
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // padding: 20,
        // marginLeft: 20,
        marginRight:20
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 25,
    },btn:{
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
    headerIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    modalAvatar: {
        height: 100,
        width: 100,
        borderRadius: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 25
    },
    input: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 6,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginHorizontal: 25,
    },
    button: {
        marginTop: 8,
        textAlign: 'center',
        paddingVertical: 14,
        backgroundColor: '#3B3DBF',
        color: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        fontWeight: '600',
        fontSize: 16,
        marginHorizontal: 25,
    }
})


export default InforCompany
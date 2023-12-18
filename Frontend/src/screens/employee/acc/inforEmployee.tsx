import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanyAction, updateCompanyAction } from "../../../actions/companyActions";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, View, TextInput, Text, StyleSheet, Image, StatusBar, KeyboardAvoidingView } from "react-native";
import navigation from "../../../navigation";
import { showToast } from "../../../utils/Toast";
import Toast from "react-native-root-toast";
import { BASE_URL } from "../../../constants/api";
import { ScrollView } from "react-native-gesture-handler";



const InforEmployee =()=>{
    const isFocused = useIsFocused();
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState(null);
    const [infoUser, setInfoUser] = useState({
        id: '',
        email: '',
        name: '',
        phoneNumber:'',
        studyAt:'',
        imagePath:'',
        address:'',
        experience:''
    })
    useEffect(() => {
        getInfoUser()
      }, [isFocused]);
      const getInfoUser = () => {
        setLoading(false)
        dispatch(getCompanyAction())
          .then(res => {
            setLoading(false)
            console.log('employee info', res?.payload.result);
            setInfoUser(res?.payload.result)
          })
          .catch(err => {
            setLoading(false)
            console.log('err', err)
          })
      }
      const handleEditInforCompany =async ()=>{
        const imageToUpload = image
        const imageName = imageToUpload?.split('/').pop()
        const imageType = imageToUpload?.split('.').pop()
        console.log(`image/${imageType}`)
        const formdata = new FormData();
        if (image) {
            // Kiểm tra xem imageToUpload có giá trị không
            const blob = await fetch(imageToUpload).then((res) => res.blob());
        
            formdata.append('ava', blob, imageName);
          }
        
        formdata.append('Name', infoUser?.name)
        formdata.append('CompanyOverview', infoUser?.experience)
        formdata.append('CompanyType', infoUser?.email)
        formdata.append('CompanySize', infoUser?.studyAt)
        formdata.append('WorkingDay', infoUser?.phoneNumber)
        formdata.append('Address', infoUser?.address)
        console.log('formdata', formdata)
        setLoading(true)
        dispatch(updateCompanyAction(formdata))
        .then((res) =>{
            if(res?.payload){
                setLoading(false)
                showToast('Cập nhật thành công',{duration:2, position:Toast.positions.BOTTOM})
                console.log(res, 'update com')
                navigation.goBack()
            }
            else{
                showToast('có lỗi')
                setLoading(false)
            }
            console.log(res, 'update com')
        })
        .catch(err=> {
            console.log('delete err');
            setLoading(false)
        });
    }
    const onChangeInforCompany = (Name)=>{
        return(value: any) =>{
            setInfoUser({... infoUser, [Name]: value})
            console.log('inforCompany', infoUser)
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
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <StatusBar/> 
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image
                            style={styles.headerIcon}
                            source={require('../../../../assets/AL.png')}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{ fontWeight: '400', fontSize: 18 }}
                    >Chỉnh sửa tài khoản</Text>
                    <View style={styles.headerIcon} />
                </View>
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
                <Text style={styles.inputLabel}>Số điện thoại</Text>
                <TextInput 
                    value={infoUser.phoneNumber}
                    style={styles.input}
                    onChangeText={onChangeInforCompany('phoneNumber')}
                />
                <Text style={styles.inputLabel}>Học tập</Text>
                <TextInput 
                    value={infoUser.studyAt}
                    style={styles.input}
                    onChangeText={onChangeInforCompany('studyAt')}
                />
                <Text style={styles.inputLabel}>Kinh nghiệm</Text>
                <TextInput 
                    value={infoUser.experience}
                    style={styles.input}
                    onChangeText={onChangeInforCompany('experience')}
                />
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 25,
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


export default InforEmployee
// InforRecruitment.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, ToastAndroid, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { IRecr } from './IRecruitment';
import { getRecruitmentAction, updateRecruitmentAction } from '../../../actions/recruitmentActions';
import { showToast } from '../../../utils/Toast';
import Toast from 'react-native-root-toast';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

const InforRecruitment = () => {
    const dispatch = useDispatch<any>();
    const route = useRoute();
    const navigation = useNavigation<any>()
    const { recrId } = route.params as { recrId: string };
    const [loading, setLoading] = useState(false);
    
    const [reInfo, setInfoRe] = useState<IRecr>({
        id: recrId,
        title: '',
        jobDescription: '',
        candidateRecruitment: '',
        skillRequire: '',
        address: '',
        salary: '',
        overtimePolicy: '',
        status: '',
        companyId:0
    });
    
    useEffect(() => {
        getRecruitment();
    }, []);
    const onChangeText =(Name)=>{
        return (value: any) =>{
            setInfoRe({...reInfo,[Name]:value})
        }
    }
    const getRecruitment = () => {
        setLoading(true);
        dispatch(getRecruitmentAction(recrId))
            .then((res) => {
                setInfoRe(res?.payload.result);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
        });
    };
    const handleStatusChange = (value) => {
        setInfoRe({ ...reInfo, status: value });
    };
    const handleUpdateInforRecr = async () =>{
        dispatch(updateRecruitmentAction({id: Number(recrId), recruitmentData: reInfo})).then(res =>{
            setLoading(true)
            console.log(res)
            ToastAndroid.show('Sửa thông tin bài viết thành công', ToastAndroid.SHORT)
            navigation.goBack()
            console.log('Sửa thông tin bài viết thành công')
            setLoading(false)
        
    })
    .catch(err => showToast('Có lỗi', {duration:2}))
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
              <View>
                <Text style={styles.inputLabel}>Tiêu đề</Text>
                <TextInput 
                    value={reInfo.title}
                    style={styles.textinput}
                    onChangeText={onChangeText('title')}
                    placeholder="Nhập tiêu đề"
                />
                <Text style={styles.inputLabel}>Mô tả công việc</Text>
                <TextInput 
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={[styles.textinput, {height:100}]}  
                    placeholder={"Nhập mô tả công việc"}
                    value={reInfo.jobDescription}
                    returnKeyType="next"
                    onChangeText={onChangeText('jobDescription')}/>
                <Text style={[styles.inputLabel]}>Yêu cầu ứng viên</Text>
                <TextInput 
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={[styles.textinput, {height:100}]} 
                    placeholder={"Nhập yêu cầu ứng viên"}
                    value={reInfo.candidateRecruitment}
                    onChangeText={onChangeText('candidateRecruitment')}
                    returnKeyType="next"
                    />
                <Text style={styles.inputLabel}>Kĩ năng yêu cầu</Text>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Kĩ năng yêu cầu"}
                    value={reInfo.skillRequire}
                    onChangeText={onChangeText('skillRequire')}
                    />
                <Text style={styles.inputLabel}>Địa chỉ</Text>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Nhập địa chỉ"}
                    value={reInfo.address}
                    onChangeText={onChangeText('address')}
                    />
                <Text style={styles.inputLabel}>Mức lương</Text>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Nhập số"}
                    value={(reInfo.salary)}
                    onChangeText={onChangeText('salary')}
                    keyboardType="numeric"
                    />
                <Text style={styles.inputLabel}>Thời gian làm việc</Text>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Nhập thời gian làm việc"}
                    value={reInfo.overtimePolicy}
                    onChangeText={onChangeText('overtimePolicy')}
                    />
                <Text style={styles.inputLabel}>Trạng thái tuyển dụng</Text>
                <Picker
                    selectedValue={reInfo.status}
                    onValueChange={handleStatusChange}
                >
                    <Picker.Item label="Đang tuyển" value="Đang tuyển" />
                    <Picker.Item label="Hết hạn" value="hết hạn" />
                </Picker>
            </View>
            <View style ={styles.buttonRow}>
                <TouchableOpacity style={styles.btn} onPress={handleUpdateInforRecr}>
                    <Text style={styles.logintxt}>Lưu thay đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{
                        navigation.goBack()
                    }}>
                    <Text style={styles.logintxt}>Trở về</Text>
                    
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        marginLeft: 20,
        marginRight:20,
        // paddingBottom:10
    },
    head: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },inputLabel: {
        marginBottom: 6,
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'left',
        marginTop:30
    },
    textinput:{
        borderRadius: 10,
        padding: 10,
        // marginVertical: 10,
        minWidth:350,
        height:50,
        backgroundColor: "#FFF",
        borderWidth:1
    },btn:{
        marginTop: 10,
        backgroundColor: "#F13333",
        height: 45,
        width: 150,
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
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkboxLabel: {
        marginLeft: 8,
    },
});

export default InforRecruitment;

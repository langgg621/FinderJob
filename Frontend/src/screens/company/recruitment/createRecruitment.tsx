import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../../utils/Toast";
import { createRecruitmentAction } from "../../../actions/recruitmentActions";
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View , StyleSheet, Text, ToastAndroid, Image, SafeAreaView } from "react-native";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

const AddRecruitment =()=>{
    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()

    const[recr, setRecr] = useState({
        title: '',
        jobDescription: '',
        candidateRecruitment: '',
        skillRequire: '',
        address: '',         
        salary: '',
        overtimePolicy: '',
        status: 'open',
        imagePath:'',
    });
    useEffect(() => {

    }, [])
    const onChangeText= (name)=>{
        return (value: any) =>{
            setRecr({...recr, [name]: value})
        }
    }
    const handelAddRecruitment = async() =>{
        dispatch(createRecruitmentAction({
            title: recr.title,
            jobDescription: recr.jobDescription,
            candidateRecruitment: recr.candidateRecruitment,
            skillRequire: recr.skillRequire,
            address: recr.address,         
            salary: recr.salary,
            overtimePolicy: recr.overtimePolicy,
            status: recr.status

        })).then(res =>{
                setLoading(true)
                console.log(res)
                showToast('Thêm thành công', {duration:2,})
                navigation.navigate(NAVIGATION_TITLE.HOME_COM)

                setRecr({
                    title: '',
                    jobDescription: '',
                    candidateRecruitment: '',
                    skillRequire: '',
                    address: '',         
                    salary: '',
                    overtimePolicy: '',
                    status: '',
                    imagePath:'',

                })
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
                setLoading(false)})
        
    }
    const handleStatusChange = (value) => {
        setRecr({ ...recr, status: value });
    };
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View>
                <Text style={styles.inputLabel}>Tiêu đề</Text>
                <TextInput 
                    value={recr.title}
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
                    value={recr.jobDescription}
                    returnKeyType="next"
                    onChangeText={onChangeText('jobDescription')}/>
                <Text style={[styles.inputLabel]}>Kĩ năng chuyên môn</Text>
                <TextInput 
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={[styles.textinput, {height:100}]} 
                    placeholder={"Nhập kĩ năng chuyên môn"}
                    value={recr.candidateRecruitment}
                    onChangeText={onChangeText('candidateRecruitment')}
                    returnKeyType="next"
                    />
                <Text style={styles.inputLabel}>Công nghệ sử dụng</Text>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Nhập kĩ năng cần thiết"}
                    value={recr.skillRequire}
                    onChangeText={onChangeText('skillRequire')}
                    />
                <Text style={styles.inputLabel}>Địa chỉ</Text>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Nhập địa chỉ"}
                    value={recr.address}
                    onChangeText={onChangeText('address')}
                    />
                <Text style={styles.inputLabel}>Mức lương</Text>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Nhập số"}
                    value={recr.salary}
                    onChangeText={onChangeText('salary')}
                    keyboardType="numeric"
                    />
                <Text style={styles.inputLabel}>Thời gian làm việc</Text>
                <TextInput 
                    style={styles.textinput} 
                    placeholder={"Nhập thời gian làm việc"}
                    value={recr.overtimePolicy}
                    onChangeText={onChangeText('overtimePolicy')}
                    />
                <Text style={styles.inputLabel}>Trạng thái tuyển dụng</Text>
                <View>
                    <Picker
                    selectedValue={recr.status}
                    onValueChange={handleStatusChange}
                    placeholder="Trạng thái">
                    <Picker.Item label="Đang tuyển" value="Đang tuyển" />
                    <Picker.Item label="Hết hạn" value="hết hạn" />
                </Picker>
                </View>
                
            </View>
            <View>
                <TouchableOpacity style={styles.btn} onPress={handelAddRecruitment}>
                    <Text style={styles.logintxt}>Thêm bài đăng</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        marginTop: 40
    },
    inputLabel: {
        marginBottom: 6,
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'left',
        marginTop:30
    },
    textinput:{
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width:330,
        height:50,
        backgroundColor: "#FFF",
        borderWidth:1
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

})
export default AddRecruitment
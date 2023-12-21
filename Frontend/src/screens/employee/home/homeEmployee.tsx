import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image , TextInput, SafeAreaView, Dimensions, Pressable} from "react-native"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {  getRecruitmentHasBeenAppliedByEmployeeAction, getRecruitmentNotAppliedByEmployeeAction } from "../../../actions/recruitmentActions";
import { IRecr } from "../../company/recruitment/IRecruitment";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { ScrollView } from "react-native-gesture-handler";
import { getEmployeeAction } from "../../../actions/employeeActions";
import Banner from "../../../component/advertise";

const HomeEmployee =()=>{
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();
    const [listEntry, setListEntry] = useState([]);
    const [listEntry2, setListEntry2] = useState([]);

    const [loading, setLoading] = useState<boolean>(false);
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
        getListRecruitment()
        getListRecruitmentHasBeenApply()
    }, []);
    const getInfoUser = () => {
        setLoading(false)
        dispatch(getEmployeeAction())
          .then(res => {
            setLoading(false)
            setInfoUser(res?.payload.result)
          })
          .catch(err => {
            setLoading(false)
            console.log('err', err)
          })
    }
    const getListRecruitment = () => {
        setLoading(false)
        dispatch(getRecruitmentNotAppliedByEmployeeAction())
        .then(res => {
            setLoading(false)
            const convertListRecruitment = res?.payload
            setListEntry(convertListRecruitment)
        })
        .catch(err =>{
            setLoading(false)
        })
    }
    const getListRecruitmentHasBeenApply = () =>{
        setLoading(false)
        dispatch(getRecruitmentHasBeenAppliedByEmployeeAction())
        .then(res => {
            setLoading(false)
            const convertListRecruitment = res?.payload
            setListEntry2(convertListRecruitment)
        })
        .catch(err =>{
            setLoading(false)
        })
    }
    const renderOverviewList = ({item}: {item : IRecr}) => {
        return (
          <TouchableOpacity 
            onPress={()=> handleItem(item)}
            
            style={styles.listItem}>
                <View style={{flex: 1}}>
                    <Text style={styles.jobtitle}>{item.title}</Text>
                    <Text>{item.salary}</Text>
                    <Text>{item.address}</Text>
                </View>
          </TouchableOpacity>
        );
    };
    const renderOverviewListNotApply = ({item}: {item : IRecr}) => {
        return (
          <TouchableOpacity 
            onPress={()=> handleItem(item)}
            style={styles.listItem}>
                <View style={{flex: 1}}>
                    <Text style={styles.jobtitle}>{item.title}</Text>
                    <Text>{item.salary}</Text>
                    <Text>{item.address}</Text>
                </View>
          </TouchableOpacity>
        );
    };
    const [showDescription, setShowDescription] = useState(true);
    const [showCompany, setShowCompany] = useState(false);
    const handleItem = (item: IRecr) => {
        navigation.navigate(NAVIGATION_TITLE.APPLY_JOB, { recrId: item.id });
    }; 
    const handleDescriptionPress = () => {
        setShowDescription(true);
        setShowCompany(false);
    };

    const handleCompanyPress = () => {
        setShowDescription(false);
        setShowCompany(true);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.head}>
                    <View>
                        <Text style={{fontSize:20, color: '#fff'}}>Welcome </Text>
                        <Text style={styles.headText}>Find your dream job</Text>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.navigate(NAVIGATION_TITLE.INFO_EMP)} >
                        <Image style={styles.image1}  source={require('../../../../assets/tabImg/icon.jpg') } />
                        <Text style={{fontSize:20, color: '#fff'}} >{infoUser.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sreachview} >
                    <TouchableOpacity style={styles.sreach} onPress={()=> navigation.navigate(NAVIGATION_TITLE.FIND)}>
                        
                        <Image style={styles.imagesreach} source={require('../../../../assets/iconsreach.jpg')}/>
                        <TextInput placeholder={"Find comapny, job, people"}></TextInput>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterbtn} onPress={()=> navigation.navigate(NAVIGATION_TITLE.FIND)}>
                        <Image style={styles.imagefilter} source={require('../../../../assets/ok.jpg')}/>
                    </TouchableOpacity>
                </View >
                <View>
                    <View style={{marginVertical:10, marginRight:10}}>
                        <Banner/>
                    </View>
                    <View style={styles.modal}>
                        <Pressable onPress={handleDescriptionPress} style={[styles.button, showDescription && styles.buttonPressed]}>
                            <Text style={[styles.buttonText, showDescription && styles.buttonTextPressed]}>Bài tuyển dụng mới</Text>
                        </Pressable>
                        <Pressable onPress={handleCompanyPress} style={[styles.button, showCompany && styles.buttonPressed]}>
                            <Text style={[styles.buttonText, showCompany && styles.buttonTextPressed]}>Đã apply</Text>
                        </Pressable>
                    </View>
                    <View>
                        {showDescription && (
                            <View>
                                <FlatList
                                data={listEntry}
                                renderItem={renderOverviewList}
                            />
                            </View>
                            
                        )}
                        {showCompany && (
                            <View >
                                <FlatList
                                data={listEntry2}
                                renderItem={renderOverviewListNotApply}
                            />
                            </View>
                        )}
                    </View>
                    
                </View>
            </View>
        </SafeAreaView>
        )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        alignItems:"center",
        padding: 20
    },    
    headText:{
        marginTop:10,
        fontWeight:'bold',
        fontSize:14,
        color:'#fff',
    },
    acc:{
        color:'#fff'
    },
    image1:{
        width:60,
        height:60,
        borderRadius:90
    },
    head:{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:25,
        padding:10,
        backgroundColor: "#F13333",
        marginHorizontal: 10,
        borderRadius:10
    },
    listItem: {
        flexDirection:'row',
        marginTop:10,
        alignItems:'center',
        backgroundColor:"#FFF",
        borderRadius:10,
        padding:10,
        justifyContent:'space-between', 
        marginLeft:10, 
        marginRight:10
    },
    jobtitle:{
        fontSize:16,
        fontWeight:"bold"
    },
    icon:{
        borderRadius:100,
        width:30,
        alignItems:"center"
    },
    sreachview:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        padding:10 ,
        height:68,
    },
    imagesreach:{
        width:25,
        height:25,
        marginTop:3,
        marginLeft:5
    },
    imagefilter:{
        width:35,
        height:35,
        marginTop:17,
        borderRadius:10,
    },
    filterbtn:{
        alignItems:"center",
        padding:10
    },
    sreach:{
        alignItems: "center",
        width: "85%",
        height:"80%",
        flexDirection: "row",
        marginTop:15,
        gap: 10,
        backgroundColor:"#FFF",
        borderRadius: 10,
    },
    modal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
    },
    button: {
        padding: 10,
        // paddingVertical: 12, 
        // paddingHorizontal: 20,
        backgroundColor: 'white',
        marginRight: 10,
        borderRadius: 5,
        // height:150,
        marginLeft:10
    },
    buttonText: {
        color: 'black',
        alignContent:'center',
        textAlign:'center',
        justifyContent:'center',
        fontSize:15,
        width: 150
    },
    buttonPressed: {
        backgroundColor: 'black',
    },
    buttonTextPressed: {
        color: 'white',
    },
    des:{
        marginTop:20,
        backgroundColor:'#fff',
        minHeight:500
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
    row: {
        flex: 1,
        flexDirection: 'row', // Make sure the container has a row direction
    },
    skillItem: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    }
});
export default HomeEmployee
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Image, FlatList, TextInput, Dimensions, Alert } from "react-native"
import { getItemObjectAsyncStorage } from "../../utils/asyncStorage";
import { KEY_STORAGE } from "../../constants/storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyAction } from "../../actions/companyActions";
import { deleteRecruitmentAction, getRecruitmentByCompanyAction } from "../../actions/recruitmentActions";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NAVIGATION_TITLE } from "../../constants/navigation";
import { IRecr } from "./recruitment/IRecruitment";
import Banner from "../../component/advertise";

const HomeCompany =()=>{
    const isFocused = useIsFocused();
    const dispatch = useDispatch<any>();
    const SLIDER_WIDTH = Dimensions.get('window').width
    const SLIDER_HEIGHT = SLIDER_WIDTH * 0.45
    const navigation = useNavigation<any>();
    const [listEntry, setListEntry] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    const [infoUser, setInfoUser] = useState({
        id: '',
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
        getListRecruitment()
    }, [isFocused]);
    const getInfoUser = () => {
        setLoading(false)
        dispatch(getCompanyAction())
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
        dispatch(getRecruitmentByCompanyAction())
        .then(res => {
            setLoading(false)
            const convertListRecruitment = res?.payload
            setListEntry(convertListRecruitment)
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
                    <Text>{item.status}</Text>
                    
                </View>
                <TouchableOpacity onPress={()=>handleDelete(item.id)}>
                    <Image
                        source={require('../../../assets/delete.png')}
                        style ={{width:25, height:25}}
                    />
                </TouchableOpacity>
          </TouchableOpacity>
        );
    };
    const handleDelete = (id) => {
        // Hiển thị hộp thoại xác nhận
        Alert.alert(
          'Xác nhận',
          'Bạn có chắc chắn muốn xóa tin tuyển dụng này?',
          [
            {
              text: 'Hủy',
              style: 'cancel',
            },
            {
              text: 'Xóa',
              onPress: async () => {
                try {
                    await dispatch(deleteRecruitmentAction(id));
                    getListRecruitment();
                } catch (error) {
                  console.error('Error deleting recruitment:', error);
                  // Xử lý lỗi nếu cần thiết
                }
              },
            },
          ],
          { cancelable: false }
        );
    };
    
    const handleItem = (item: IRecr) => {
        navigation.navigate(NAVIGATION_TITLE.INFO_RECR, { recrId: item.id });
    };
      

      
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.head}>
                    <View>
                        <Text style={{fontSize:20, color: '#fff'}}>Welcome </Text>
                        <Text style={styles.headText}>Find your dream job</Text>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.navigate(NAVIGATION_TITLE.INFO_COM)} >
                        <Image style={styles.image1}  source={require('../../../assets/tabImg/icon.jpg') } />
                        <Text style={{fontSize:20, color: '#fff'}} >{infoUser.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sreachview}>
                    <View style={styles.sreach}>
                        <Image style={styles.imagesreach} source={require('../../../assets/iconsreach.jpg')}/>
                        <TextInput placeholder={"Find comapny, job, people"}></TextInput>
                    </View>
                    <TouchableOpacity style={styles.filterbtn}>
                        <Image style={styles.imagefilter} source={require('../../../assets/ok.jpg')}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{marginRight:10}}>
                        <Banner/>
                    </View>
                    <View>
                    <ScrollView >
                        <FlatList
                            data={listEntry}
                            keyExtractor={(item)=> item.id.toString()}
                            renderItem={renderOverviewList}/>
                    </ScrollView>
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
    overviewItem: {
        height: 145,
        minWidth: 140,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginRight: 15,
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    cardIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    head:{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:15,
        padding:10,
        backgroundColor: "#F13333",
        marginHorizontal: 10,
        borderRadius:10
    },
    overviewContainer: {
        marginBottom: 20,
        marginTop: 10
    },

    listItem: {
        flexDirection:'row',
        marginTop:10,
        alignItems:'center',
        // width:350,        // height:100,
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

});
export default HomeCompany
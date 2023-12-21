import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IRecr } from "../../company/recruitment/IRecruitment";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { TouchableOpacity, View , Text, SafeAreaView, Image, TextInput, ScrollView, StyleSheet, FlatList, Modal} from "react-native";
import { getAllRecruitmentAction } from "../../../actions/recruitmentActions";



const SearchScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [tasks, setTasks] = useState<IRecr[]>([]); // Original tasks
  const [filteredTasks, setFilteredTasks] = useState<IRecr[]>([]); // Filtered tasks
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    getListRecruitment();
  }, []);

  const getListRecruitment = () => {
    setRefreshing(true);
    dispatch(getAllRecruitmentAction())
      .then((res) => {
        setRefreshing(false);
        const convertListRecruitment = res?.payload;
        setTasks(convertListRecruitment); // Update the original tasks
        handleSearch(convertListRecruitment); // Filter tasks based on the initial search keyword
      })
      .catch((err) => {
        setRefreshing(false);
        console.error('Error fetching all recruitments:', err);
      });
  };

  useEffect(() => {
    handleSearch(tasks); // Filter tasks based on the current search keyword
  }, [searchKeyword]);

  const handleSearch = (tasksToFilter: IRecr[]) => {
    const filteredTasks = tasksToFilter.filter(
      (item) =>
        item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.skillRequire.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredTasks(filteredTasks);
  };
  const handleItem = (recruitment: IRecr) => {
    navigation.navigate(NAVIGATION_TITLE.APPLY_JOB, { recrId: recruitment.id });
  };

  const renderOverviewList = ({ item }: { item: IRecr }) => (
    <TouchableOpacity onPress={() => handleItem(item)} style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.jobtitle}>{item.title}</Text>
        <Text>{item.salary}</Text>
        <Text>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.sreachview}>
          <View style={styles.sreach}>
            <Image style={styles.imagesreach} source={require('../../../../assets/iconsreach.jpg')} />
            <TextInput
              placeholder={'Tìm theo tiêu đề, kĩ năng'}
              value={searchKeyword}
              onChangeText={(value) => setSearchKeyword(value)}
            />
          </View>
          <TouchableOpacity style={styles.filterbtn} >
            <Image style={styles.imagefilter} source={require('../../../../assets/ok.jpg')} />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOverviewList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
  
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        alignItems:"center",
        padding: 20,
        // width:'100%'
    },    
    filterContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      // width:'100%',
      paddingHorizontal:10,
      
    },
    filter:{
      // borderWidth:1,
      width:100,
      alignItems:'center',
      marginVertical:10,
      backgroundColor:'#F13333',
      height:30,
      justifyContent:'center',
      
      // borderRadius:7
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
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Độ trong suốt của modal
    },

    addressOption: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      color:'white'
    },

});
export default SearchScreen
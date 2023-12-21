import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRecruitmentAction, searchAddressAction, searchSalaryAction, searchSkillAction } from "../../../actions/recruitmentActions";
import { IRecr } from "../../company/recruitment/IRecruitment";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { TouchableOpacity, View , Text, SafeAreaView, Image, TextInput, ScrollView, StyleSheet, FlatList, Modal} from "react-native";
import Picker from "react-native-picker-select";

// ... (import statements)

const SearchScreen = () => {
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();
    const [listEntry, setListEntry] = useState<IRecr[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [tasks, setTasks] = useState<IRecr[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<IRecr[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    // const [isModalVisible, setModalVisible] = useState(false);
    // const [isModalVisible2, setModalVisible2] = useState(false);
    // const [isModalVisible3, setModalVisible3] = useState(false);
    // const [selectedAddress, setSelectedAddress] = useState('Hà Nội');
    // const [selectedSkill, setSelectedSkill] = useState('Java');
    // const [selectedSalary, setSelectedSalary] = useState({ start: 0, end: 0 });

    // useEffect(() => {
    //   getListRecruitment();
    // }, [selectedAddress, selectedSkill, selectedSalary]);
  
    const getListRecruitment = () => {
      setRefreshing(true);
      dispatch(getAllRecruitmentAction())
        .then((res) => {
          setRefreshing(false);
          const convertListRecruitment = res?.payload;
          setListEntry(convertListRecruitment);
          setTasks(convertListRecruitment);
        })
        .catch((err) => {
          setRefreshing(false);
          console.error('Error fetching all recruitments:', err);
        });
    };
  
    useEffect(() => {
      const filteredTasks = tasks.filter(
        (item) =>
          item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          item.skillRequire.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredTasks(filteredTasks);
    }, [searchKeyword, tasks]);
  
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
    // const toggleModal = () => {
    //   setModalVisible(!isModalVisible);
    // };
  
    // const handleAddressSelect = (address) => {
    //   dispatch(searchAddressAction(address))
    //   .then(res => {
    //     setFilteredTasks(res.payload || [])
    //     console.log(res,'helloo')
    //   }) // Set the search results
    //   .catch((error) => {
    //     console.error('Error searching by address:', error);
    //     setFilteredTasks([]); // Handle errors by setting an empty array or handling it as needed
    //   });
    //   setSelectedAddress(address);
    //   toggleModal();
    // };
  
    // const toggleModal2 = () => {
    //   setModalVisible2(!isModalVisible2);
    // };
  
    // const handleSkillSelect = (skill) => {
    //   dispatch(searchSkillAction(skill))
    //   .then((res) => setFilteredTasks(res.payload || [])) // Set the search results
    //   .catch((error) => {
    //     console.error('Error searching by address:', error);
    //     setFilteredTasks([]); // Handle errors by setting an empty array or handling it as needed
    //   });
    //   setSelectedSkill(skill);
    //   toggleModal2();
    // };
  
    // const toggleModal3 = () => {
    //   setModalVisible3(!isModalVisible3);
    // };
  
    // const handleSalarySelect = ({ start, end }) => {
    //   dispatch(searchSalaryAction({start, end}))
    //   .then((res) => setFilteredTasks(res.payload || [])) // Set the search results
    //   .catch((error) => {
    //     console.error('Error searching by address:', error);
    //     setFilteredTasks([]); // Handle errors by setting an empty array or handling it as needed
    //   });
    //   setSelectedSalary({ start, end });
    //   toggleModal3();
    // };
  
    // const renderAddressOption = (address) => (
    //   <TouchableOpacity key={address} onPress={() => handleAddressSelect(address)}>
    //     <Text style={styles.addressOption}>{address}</Text>
    //   </TouchableOpacity>
    // );
  
    // const renderSkillOption = (skill) => (
    //   <TouchableOpacity key={skill} onPress={() => handleSkillSelect(skill)}>
    //     <Text style={styles.addressOption}>{skill}</Text>
    //   </TouchableOpacity>
    // );
  
    // const renderSalaryOption = ({ start, end }) => (
    //   <TouchableOpacity key={start} onPress={() => handleSalarySelect({ start, end })}>
    //     <Text style={styles.addressOption}>{`${start} - ${end}`}</Text>
    //   </TouchableOpacity>
    // );
    // const renderSearchResults = () => {
    //   if (filteredTasks.length === 0) {
    //     return <Text>No results found.</Text>;
    //   }
  
    //   return (
    //     <FlatList
    //       data={filteredTasks}
    //       keyExtractor={(item) => item.id.toString()}
    //       renderItem={renderOverviewList}
    //     />
    //   );
    // };
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
            <TouchableOpacity style={styles.filterbtn}>
              <Image style={styles.imagefilter} source={require('../../../../assets/ok.jpg')} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filter} onPress={toggleModal}>
            <Text style={{color:'#fff'}}>Địa điểm</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.filter} onPress={toggleModal2}>
              <Text style={{color:'#fff'}}>Kĩ năng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filter} onPress={toggleModal3}>
              <Text  style={{color:'#fff'}}>Lương</Text>
            </TouchableOpacity>
          </View>
          <Modal animationType="slide" transparent={true} visible={isModalVisible}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={toggleModal} >
                {['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh'].map(renderAddressOption)}
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal animationType="slide" transparent={true} visible={isModalVisible2}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={toggleModal2} >
                {['Java', '.Net', 'ReactJS'].map(renderSkillOption)}
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal animationType="slide" transparent={true} visible={isModalVisible3}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={toggleModal3} >
              {[{ start: 0, end: 5000000 },{ start: 5000000, end: 10000000 },{ start: 10000000, end: 30000000 } ].map(renderSalaryOption)}
              </TouchableOpacity>
            </View>
          </Modal> */}
          <ScrollView>
            <FlatList
              data={filteredTasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderOverviewList}
            />
          </ScrollView>
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
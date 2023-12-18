import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getRecruitmentAction, updateRecruitmentAction } from '../../../actions/recruitmentActions';
import { getCompanyByIdAction } from '../../../actions/companyActions';
import { IRecr } from '../../company/recruitment/IRecruitment';
import { createApplyAction, deleteApplyAction } from '../../../actions/applyJobActions';
import { showToast } from '../../../utils/Toast';
import { NAVIGATION_TITLE } from '../../../constants/navigation';

const ApplyJob = () => {
    const dispatch = useDispatch<any>();
    const route = useRoute();
    const navigation = useNavigation<any>();
    const { recrId } = route.params as { recrId: string };
    const [loading, setLoading] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [showCompany, setShowCompany] = useState(false);
    const [skills, setSkills] = useState<string[]>([]);
    
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
        companyId: 0,
    });
    const [infoUser, setInfoUser] = useState({
        email: '',
        name: '',
        companyOverview: '',
        companyType: '',
        imagePath: '',
        address: '',
        workingDay: '',
        companySize: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            await getCompany();
            await getRecruitment();
            
        };
    
        fetchData();
    }, []);
    

    const getRecruitment = async() => {
        setLoading(true)
        dispatch(getRecruitmentAction(recrId))
            .then((res) => {
                
                setInfoRe(res?.payload.result);
                getCompany
                setLoading(false);
                
            })
            .catch((err) => {
                setLoading(false);
            });
    };
    const getCompany = async () => {
        setLoading(false);
        dispatch(getCompanyByIdAction(Number(recrId)))
            .then((res) => {
                setLoading(true)
                setInfoUser(res?.payload.result);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };
    
    const handleDescriptionPress = () => {
        setShowDescription(true);
        setShowCompany(false);
    };

    const handleCompanyPress = () => {
        setShowDescription(false);
        setShowCompany(true);
    };
    const handleApply = async () =>{
        setLoading(false);
        dispatch(createApplyAction(Number(recrId)))
        .then(res =>{
            setLoading(true)
            showToast("Apply thành công",{duration:2})
            console.log(res)
            navigation.goBack();
            setLoading(false)
        })
        .catch(err =>{
            setLoading(false)
        })
    }
    const handlercancel = async()=>{
        dispatch(deleteApplyAction(Number(recrId)))
        .then(res =>{
            showToast("Hủy apply thành công",{duration:2})
            navigation.goBack();
            setLoading
        })
        .catch(err =>{
            setLoading(false)
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.head1}>
                <Image source={require('../../../../assets/shopeeicon.jpg')} style={{ width: 90, height: 100, justifyContent: 'center' }} />
                <View style={styles.inforHead}>
                    <Text style={styles.lineHead1}>{infoUser.name}</Text>
                    <Text style={styles.title}>{reInfo.title}</Text>
                    <Text style={styles.address}>{reInfo.address}</Text>
                    <View style={styles.row}>
                </View>
                </View>
            </View>
            <View style={styles.modal}>
                <Pressable onPress={handleDescriptionPress} style={[styles.button, showDescription && styles.buttonPressed]}>
                    <Text style={[styles.buttonText, showDescription && styles.buttonTextPressed]}>Description</Text>
                </Pressable>
                <Pressable onPress={handleCompanyPress} style={[styles.button, showCompany && styles.buttonPressed]}>
                    <Text style={[styles.buttonText, showCompany && styles.buttonTextPressed]}>Company</Text>
                </Pressable>
            </View>

            <ScrollView>
                {showDescription && (
                    <View style={styles.des}>
                        <Text>{reInfo.jobDescription}</Text>
                    </View>
                )}
                {showCompany && (
                    <View style={styles.des}>
                        <Text>{infoUser.name}</Text>
                    </View>
                )}
            </ScrollView>
            <View style ={styles.modal}>
                <TouchableOpacity style={[styles.btn]} onPress={handleApply}>
                    <Text style={styles.logintxt}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn]} onPress={handlercancel}>
                    <Text style={[styles.logintxt]}>Hủy</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        marginHorizontal:15
    },
    head1: {
        flexDirection: 'row',
        marginTop: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        minHeight: 120,
    },
    inforHead: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        display: 'flex',
    },
    lineHead1: {
        color: '#FF1E56',
        fontSize: 14,
        fontWeight: '500',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
    },
    address: {
        // textTransform: 'capitalize',
        marginTop: 7,
    },
    modal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
    },
    button: {
        padding: 10,
        paddingVertical: 12, 
        paddingHorizontal: 20,
        backgroundColor: 'white',
        // marginRight: 10,
        borderRadius: 5,
        width:150,
        // marginLeft:10
    },
    buttonText: {
        color: 'black',
        alignContent:'center',
        textAlign:'center',
        justifyContent:'center',
        fontSize:15
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

export default ApplyJob;

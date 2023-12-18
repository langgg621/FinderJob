import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION_TITLE } from '../constants/navigation';
import Register from '../screens/auth/register';
import Login from '../screens/auth/login';
import HomeCompany from '../screens/company/homeCompany';
import HomeEmployee from '../screens/employee/home/homeEmployee';
import RegisterCom from '../screens/company/registerCompany';
import RegisterEmp from '../screens/employee/registerEmployee';
import ChangePasswordCompany from '../screens/company/acc/changePasswordCompany';
import ChangePasswordEmployee from '../screens/employee/acc/changePasswordEmployee';
import inforCompany from '../screens/company/acc/inforCompany';
import MyBottomTabsCompany from './BottomTabCompany';
import MyBottomTabsEmployee from './BottomTabEmployee';
import inforRecruitment from '../screens/company/recruitment/inforRecruitment';
import ApplyJob from '../screens/employee/home/apply';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION_TITLE.LOGIN} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NAVIGATION_TITLE.TAB_COM} component={MyBottomTabsCompany} />
      <Stack.Screen name={NAVIGATION_TITLE.TAB_EMP} component={MyBottomTabsEmployee} />
      <Stack.Screen name={NAVIGATION_TITLE.LOGIN} component={Login} />
      <Stack.Screen name={NAVIGATION_TITLE.REGISTER} component={Register} />
      <Stack.Screen name={NAVIGATION_TITLE.HOME_COM} component={HomeCompany} />
      <Stack.Screen name={NAVIGATION_TITLE.HOME_EMP} component={HomeEmployee} />
      <Stack.Screen name={NAVIGATION_TITLE.REGISTER_COM} component={RegisterCom} />
      <Stack.Screen name={NAVIGATION_TITLE.REGISTER_EMP} component={RegisterEmp} />
      <Stack.Screen name={NAVIGATION_TITLE.CHANGE_PASS_COM} component={ChangePasswordCompany} />
      <Stack.Screen name={NAVIGATION_TITLE.CHANGE_PASS_EMP} component={ChangePasswordEmployee} />
      <Stack.Screen name={NAVIGATION_TITLE.INFO_COM} component={inforCompany} />
      <Stack.Screen name={NAVIGATION_TITLE.INFO_RECR} component={inforRecruitment} />
      <Stack.Screen name={NAVIGATION_TITLE.APPLY_JOB} component={ApplyJob} />

      
    </Stack.Navigator>
  );
};

export default StackNavigator;

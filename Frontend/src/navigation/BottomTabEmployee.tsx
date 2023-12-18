import React, { useCallback } from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NAVIGATION_TITLE } from "../constants/navigation";
import upCV from "../screens/employee/tool/upCv";
import InforEmployee from "../screens/employee/acc/inforEmployee";
import HomeEmployee from "../screens/employee/home/homeEmployee";
import { TabsDataEmployee } from "../constants/bottomTabEmployee";
import AccEmployee from "../screens/employee/acc/account";

const MyBottomTabsEmployee = () => {
  const Tab = createBottomTabNavigator();

  const onTabPress = useCallback((e, navigation, route) => {
    e?.preventDefault();
    navigation.navigate(route?.name);
  }, []);

  const getTabBarVisibility = useCallback((route) => {
    return { display: "flex" };
  }, []);

  const getOptions = useCallback(
    (props) => ({
      tabBarIcon: (data) => <TabBar props={{ ...data, tabName: props?.route?.name }} />,
      tabBarStyle: getTabBarVisibility(props?.route) as any,
    }),
    [getTabBarVisibility]
  );

  const TabBar = ({ props }) => {
    const { focused, tabName } = props;
    const tab = TabsDataEmployee.filter((item) => item?.name === tabName)[0];
    if (tabName === NAVIGATION_TITLE.ACC_EMP)
    return (
      <View>
        <Image
          source={tab?.icon}
          style={{height: 27, width: 27 }}
          resizeMode="contain"
        />
      </View>
    );
  else
    return (
      <Image
        source={tab?.icon}
        style={{ height: 50, width: 50 }}
        resizeMode="contain"
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Tab.Screen
        name={NAVIGATION_TITLE.HOME_EMP}
        component={HomeEmployee}
        options={getOptions}
      />
      <Tab.Screen
        name={NAVIGATION_TITLE.UP_CV}
        component={upCV}
        options={getOptions}
      />
      <Tab.Screen
        name={NAVIGATION_TITLE.ACC_EMP}
        component={AccEmployee}
        options={getOptions}
      />
    </Tab.Navigator>
  );
};

export default MyBottomTabsEmployee;

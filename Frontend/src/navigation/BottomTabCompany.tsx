import React, { useCallback } from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NAVIGATION_TITLE } from "../constants/navigation";
import AddRecruitment from "../screens/company/recruitment/createRecruitment";
import AccCompany from "../screens/company/acc/accountCompany";
import HomeCompany from "../screens/company/homeCompany";
import { TabsDataCompany } from "../constants/bottomTabCompany";

const MyBottomTabsCompany = () => {
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
    const tab = TabsDataCompany.filter((item) => item?.name === tabName)[0];

    if (tabName === NAVIGATION_TITLE.ADD_RECR)
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: "#000",
            top: -25,
          }}
        >
          <Image
            source={tab?.icon}
            style={{ tintColor: "#fff", height: 25, width: 25 }}
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
        name={NAVIGATION_TITLE.HOME_COM}
        component={HomeCompany}
        options={getOptions}
      />
      <Tab.Screen
        name={NAVIGATION_TITLE.ADD_RECR}
        component={AddRecruitment}
        options={getOptions}
      />
      <Tab.Screen
        name={NAVIGATION_TITLE.ACC_COM}
        component={AccCompany}
        options={getOptions}
      />
    </Tab.Navigator>
  );
};

export default MyBottomTabsCompany;

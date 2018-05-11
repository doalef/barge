import React from "react";
import {
  StackNavigator,
  NavigationActions,
  DrawerNavigator, 
  SwitchNavigator
} from "react-navigation";
import { Text, View, TouchableOpacity } from "react-native";
import MainScreen from "./../screens";
import Info from "./../screens/info";
import Favorite from "./../screens/favorites";
import MemoryView from "./../screens/memory";
import Feather from "react-native-vector-icons/Feather";
import controller from "./../../basement/database/controllers/user";
import Icon from "react-native-vector-icons/FontAwesome";

export const NormalStack = StackNavigator(
  {
    MainScreen: {
      screen: MainScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: "DimaWeb",
          marginLeft: "50%"
        },

        headerTitle: (
          <View style={{ position: "absolute", left: 0, right: 0 }}>
            <Text
              style={{
                alignSelf: "center",
                fontFamily: "DimaWeb",
                fontSize: 28,
                color: "#1F3240"
              }}
            >
              برگه
            </Text>
          </View>
        ),
        headerRight: <View />,
        headerLeft: (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DrawerOpen");
              }}
            >
              <Icon
                style={{ marginLeft: 8 }}
                size={20}
                color={"#1F3240"}
                name={"navicon"}
              />
            </TouchableOpacity>
          </View>
        )
      })
    },
    MemoryView: {
      screen: MemoryView
    }
  },
  {
    mode: "modal",
    headerMode: "float"
  }
);

export const FavoriteStack = StackNavigator({
  Favorite: {
    screen: Favorite,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <View style={{ position: "absolute", left: 0, right: 0 }}>
            <Text
              style={{
                alignSelf: "center",
                fontFamily: "DimaWeb",
                fontSize: 28,
                color: "#1F3240"
              }}
            >
              علاقه مندی ها
            </Text>
          </View>
      ),
      headerRight: <View/>,
      headerLeft: (
        <View>
          <TouchableOpacity onPress={() => {navigation.navigate('screen1')}} ><Feather size={24} color={'black'} name={'arrow-left'} /></TouchableOpacity>
        </View>
    )
    })
  },
  Memory: {
    screen: MemoryView
  }
})

const DrawerStack = DrawerNavigator({
  screen1: {
    screen: NormalStack,
    navigationOptions: {
      drawerLabel: 'صفحه اصلی',
      
      drawerIcon : <View><Icon name={'home'} size={22} /></View>
    }
  },

  screen2: {
    screen: FavoriteStack,
    navigationOptions: {
      drawerLabel: 'علافه مندی ها',
      
      drawerIcon : <View><Icon name={'star'} size={22} /></View>
    }
  }
});

export const FirstStack = StackNavigator(
  {
    Info: {
      screen: Info
    }
  },
  {
    headerMode: "none"
  }
);

export const Root = StackNavigator(
  {
    Screen: {
      screen: !controller.get().length > 0 ? FirstStack : DrawerStack
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

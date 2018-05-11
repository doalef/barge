import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Share,
  ScrollView,
  DeviceEventEmitter
} from "react-native";
import FirstMemo from "./../components/firstMemo";
import controller from "./../../basement/database/controllers/user";
import Icon from "react-native-vector-icons/FontAwesome";
import MemoItem from "./../components/memoItem";

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: controller.getMemo(),
      refreshing: false
    };

    DeviceEventEmitter.addListener('Refresh', () => {
      this.setState({memories: controller.getMemo()})
    });
  }


  state = {
    empty: false
  };



  newMemo() {
    controller.initMemo()
      .then((result) => {
        this.props.navigation.navigate('MemoryView',{memory: result,reload: () => {this.setState({memories: controller.getMemo()})}});
      }).catch((err) => {
        console.log(err);
      })
  }


  _onRefreshing() {
    this.setState({refreshing: true,memories: controller.getMemo()}, () => {
      this.setState({refreshing: false})
    })
  }

  _renderitems() {
    return this.state.memories.map((item, index) => {
      return <MemoItem key={index} memory={item} event={'Refresh'} navigate={result => {
        this.props.navigation.navigate("MemoryView", {
          memory: result
        });
      }} />;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={<RefreshControl onRefresh={() => {this._onRefreshing()}} refreshing={this.state.refreshing} />}
          style={{ width: "100%" }}
          contentContainerStyle={{ width: "100%" , justifyContent: 'center', paddingBottom: 20}}
        >
          {!this.state.memories.length ? (
            <View style={{justifyContent:'center',alignItems: 'center',marginTop: '25%'}}>
            <FirstMemo
              navigate={result => {
                this.props.navigation.navigate("MemoryView", {
                  memory: result,
                  reload: () => {this.setState({memories: controller.getMemo()})}
                });
              }}
            />
            </View>
          ) : (
            this._renderitems()
          )}
        </ScrollView>
        <TouchableOpacity onPress={() => {this.newMemo()}} >
          <View style={styles.bottom}>
            <Text style={{width: '100%',color: 'white',fontSize:18, fontFamily: 'DimaWeb',textAlign:'center'}}>برای نوشتن لمس کنید ...</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  bottom: {
    bottom: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C65362',
  }
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, DeviceEventEmitter } from "react-native";
import PersianDate from "persian-date";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import controller from "./../../basement/database/controllers/user";

export default class MemoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.memory.id,
      title: this.props.memory.title,
      favorite: this.props.memory.favorite,
      isVisible: false,
      loading: false
    };
  }

  openMemo() {
    controller
      .getMemoByID(this.state.id)
      .then(result => {
        this.props.navigate(result[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillReceiveProps() {
    if (
      this.state.title == this.props.memory.title &&
      this.state.favorite == this.props.memory.favorite
    ) {
      return;
    } else {
      this.setState({
        title: this.props.memory.title,
        favorite: this.props.memory.favorite
      });
    }
  }

  favorite() {
    this.setState({ favorite: !this.state.favorite }, () => {
      controller.updateMemo({
        id: this.state.id,
        favorite: this.state.favorite
      });
    });
  }
  
  async deleteMemo() {
    console.log('id',this.state.id)
    await this.setState({isVisible: false});
    setTimeout(() => {
        controller.deleteMemo(this.state.id).then((result) => {
            DeviceEventEmitter.emit('Refresh' , {});
        }).catch((err) => {
            console.log(err);
        })
    },200)
  }

  componentWillUnmount() {
      console.log('unmounted')
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.openMemo();
        }}
        onLongPress={() => {this.setState({isVisible: true})}}
      >
        <View style={styles.container}>
          <Modal
            onSwipe={() => this.setState({ isVisible: false })}
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
          >
            <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center' }}>
              <View style={{backgroundColor: 'white', elevation: 3, paddingHorizontal: 80,paddingVertical: 30}}>
                  <TouchableOpacity onPress={() => {this.deleteMemo()}}>
                      <Text style={{fontFamily: 'DimaWeb',fontSize: 22}} >حذف</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            onPress={() => {
              this.favorite();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}
            >
              <Icon
                size={18}
                color={this.state.favorite ? "#C65362" : "gray"}
                name={"star"}
              />
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: "stretch" }}>
            <Text style={styles.title}>
              {this.state.title ? this.state.title : "بدون عنوان"}
            </Text>
            <Text style={styles.date}>
              {new PersianDate(this.state.createdAt).format("DD MMMM YYYY")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    elevation: 2,
    borderRadius: 6,
    backgroundColor: "white"
  },
  title: {
    color: "#1F3240",
    fontFamily: "DimaWeb",
    fontSize: 20,
    textAlign: "right"
  },
  date: {
    color: "#1F3240",
    fontFamily: "DimaWeb",
    fontSize: 16,
    textAlign: "right",
    marginTop: 3
  }
});

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  DeviceEventEmitter
} from "react-native";
import PersianDate from "persian-date";
import Icon from "react-native-vector-icons/FontAwesome";
import controller from "./../../basement/database/controllers/user";

export default class MemoryView extends React.Component {
  constructor(props) {
    super(props);
    console.log("params", this.props.navigation.state);
    this.state = {
      id: this.props.navigation.state.params.memory.id,
      content: this.props.navigation.state.params.memory.content,
      title: this.props.navigation.state.params.memory.title,
      createdAt: this.props.navigation.state.params.memory.createdAt,
      favorite: this.props.navigation.state.params.memory.favorite,
      changed: false
    };
    console.log(this.state);
  }

  _onTitleChange(value) {
    this.setState({ title: value, changed: true }, () => {
      controller
        .updateMemo(this.state)
        .then(result => {})
        .catch(err => {});
    });
  }

  _onContentChange(value) {
    this.setState({ content: value, changed: true }, () => {
      controller
        .updateMemo(this.state)
        .then(result => {})
        .catch(err => {});
    });
  }

  _favorite() {
    this.setState({ favorite: !this.state.favorite }, () => {
      controller
        .updateMemo(this.state)
        .then(result => {})
        .catch(err => {});
    });
  }

  componentDidMount() {
    setTimeout(() => {
      DeviceEventEmitter.emit('RefreshFavorites' , {})
    }, 4000);
  }

  _share() {
    Share.share(
      {
        title: this.state.title,
        message: `${this.state.title} \n ${new PersianDate(this.state.createdAt).format("DD MMMM YYYY")} \n \n ${this.state.content}`
      },
      {
        dialogTitle: "خاطره ی خود را به اشتراک بگذارید"
      }
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit((this.props.navigation.state.params.event) ? "RefreshFavorites" : "Refresh", {});
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.bg}>
        <View style={styles.header}>
          <Text style={styles.date}>
            {new PersianDate(this.state.createdAt).format("DD MMMM YYYY")}
          </Text>
          <View style={styles.subHeader}>
            <TouchableOpacity
              onPress={() => {
                this._favorite();
              }}
            >
              <Icon
                style={{ marginRight: 20 }}
                name="star"
                color={this.state.favorite ? "#C65362" : "gray"}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this._share();
              }}
            >
              <Icon name="share-alt" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TextInput
            value={this.state.title}
            onChangeText={value => {
              this._onTitleChange(value);
            }}
            style={styles.title}
            disableFullscreenUI
            underlineColorAndroid={"transparent"}
            placeholder={"عنوان"}
          />
          <TextInput
            value={this.state.content}
            onChangeText={value => {
              this._onContentChange(value);
            }}
            style={styles.memo}
            disableFullscreenUI
            autoGrow
            multiline
            underlineColorAndroid={"transparent"}
            placeholder={"روزت را بنویس ..."}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "flex-start",
    minHeight: "100%"
  },
  date: {
    marginLeft: 10,
    fontFamily: "DimaWeb",
    fontSize: 20
  },
  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  subHeader: {
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    marginRight: 10,
    fontFamily: "DimaWeb",
    fontSize: 32
  },
  memo: {
    marginRight: 10,
    fontFamily: "DimaWeb",
    fontSize: 24
  }
});

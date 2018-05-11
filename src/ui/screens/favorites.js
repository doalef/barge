import React from 'react';
import { View , Text , DeviceEventEmitter , ScrollView , RefreshControl } from 'react-native';
import controller from './../../basement/database/controllers/user';
import MemoItem from './../components/memoItem';

export default class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memories: controller.getFaveMemos(),
            refreshing: false
        }
        DeviceEventEmitter.addListener('RefreshFavorites' , () => {
            this.setState({memories: controller.getFaveMemos()});
        });
    }

    componentWillUnmount() {
    }

    _renderItems() {
        return this.state.memories.map((item , index) => {
            return <MemoItem key={index} memory={item} event={'RefreshFavorites'} navigate={result => {
                this.props.navigation.navigate("Memory", {
                  memory: result,
                  fave: true
                });
              }} />
        });
    }

    _onRefreshing() {
        this.setState({refreshing: true} , () => {
            this.setState({memories: controller.getFaveMemos()} , () => {
                this.setState({refreshing: false});
            })
        });
    }

    render() {
        return (
            <ScrollView
            refreshControl={<RefreshControl onRefresh={() => {this._onRefreshing()}} refreshing={this.state.refreshing} />}
            >
                {this._renderItems()}
            </ScrollView>
        )
    }
}
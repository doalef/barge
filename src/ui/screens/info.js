import React from 'react';
import { View , Text , StyleSheet , TextInput, ImageBackground , TouchableOpacity, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import controller from './../../basement/database/controllers/user';
import PersianDate from 'persian-date';

import RNRestart from 'react-native-restart';
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: ''
        }

    }
    

    _changeFirstname(value) {
        this.setState({firstName: value});
    }

    _changeLastName(value) {
        this.setState({lastName: value});
    }

    _submit() {
        this.refs.first.blur();
        this.refs.last.blur();

        if (this.state.firstName && this.state.lastName) {
            controller.init(this.state.firstName, this.state.lastName)
                .then((result) => {
                    RNRestart.Restart();
                    //this.props.navigation.navigate('MainScreen');
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            ToastAndroid.show('لطفاً تمام قسمت ها را پر کنید', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView>
                <ImageBackground style={styles.img} source={require('./../resources/bg1.jpg')} >
                    <Text style={styles.title}>برگه</Text>
                    <TextInput ref='first' onChangeText={(value) => {this._changeFirstname(value)}} disableFullscreenUI underlineColorAndroid={'transparent'} style={styles.input} placeholder={'نام'} />
                    <TextInput ref='last' onChangeText={(value) => {this._changeLastName(value)}} disableFullscreenUI underlineColorAndroid={'transparent'} style={styles.input} placeholder={'نام خانوادگی'} />
                    <TouchableOpacity onPress={() => {this._submit()}} >
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>ثبت</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{marginTop: 25}} >
                        <Text style={{fontFamily:'DimaWeb',color:'white',textAlign:'center',fontSize:16}}>Made   With   {'<3'}   By   Doalef.</Text>
                        <Text style={{fontFamily:'DimaWeb',color:'white',textAlign:'center',fontSize:16}}>A Free Style For Unierr.</Text>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'DimaWeb',
        fontSize: 50,
        color: 'white'
    },
    img: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '68%',
        backgroundColor: 'rgba(255,255,255,0.35)',
        borderRadius: 50,
        marginTop: 10,
        textAlign: 'right',
        direction: 'rtl',
        fontFamily: 'DimaWeb',
        fontSize: 22,
        paddingRight: 9,
        color: 'white'
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal: 30,
        paddingVertical: 5,
        marginTop: 15
    },
    btnText: {
        fontFamily: 'DimaWeb',
        fontSize: 24,
        color: '#1F3240'
    }
})
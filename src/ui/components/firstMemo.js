import React from 'react';
import { View , Text , StyleSheet , TouchableOpacity} from 'react-native';
import controller from './../../basement/database/controllers/user';

export default class FirstMemo extends React.Component {
    constructor(props){
        super(props);
    }

    openNewMemo() {
        controller.initMemo()
            .then((result) => {
                this.props.navigate(result);
            }).catch((err) => {
                console.log('FirstMemo: ',err);
            })
    }

    render() {
        return (
            <View style={StyleSheet.container} >
                <Text style={styles.smiley}>:(</Text>
                <Text style={styles.description} >شما هنوز خاطرات خود را ثبت نکرده اید</Text>
                <TouchableOpacity onPress={() => {this.openNewMemo()}} >
                    <Text style={styles.tap}>
                        برای ثبت خاطره لمس کنید!
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smiley: {
        fontFamily: 'DimaWeb',
        fontSize: 70,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'DimaWeb',
        fontSize: 20,
    },
    tap: {
        fontFamily: 'DimaWeb',
        fontSize: 20,
        color: '#C65362',
        textAlign: 'center'
    }
})
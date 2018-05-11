import Realm from "realm";
import {
    UserSchema,
    MemorySchema
} from "./../models";
import UUID from 'react-native-uuid';

let realm = new Realm({
    schema: [UserSchema, MemorySchema],
    schemaVersion: 0
});

export default {
    get: () => {
        return realm.objects('User');
    },

    init: (firstName, lastName) => {
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    let user = realm.create('User', {
                        id: UUID.v4(),
                        firstName: firstName,
                        lastName: lastName
                    });
                    resolve(user);
                })
            } catch (error) {
                reject(error);
            }
        });
    },

    close: () => {
        realm.close();
    },


    getMemo: () => {
        return realm.objects('Memory').sorted([
            ['createdAt', true]
        ]);
    },

    initMemo: () => {
        return new Promise((resolve, reject) => {
            try {
                realm.write(async () => {
                    let memo = await realm.create('Memory', {
                        id: UUID.v1(),
                        title: '',
                        content: '',
                        favorite: false
                    });
                    resolve(memo);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    updateMemo: (memory) => {
        return new Promise((resolve, reject) => {
            try {
                realm.write(async () => {
                    let memo = await realm.create('Memory', memory, true);
                    resolve(memo);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    getMemoByID: (id) => {
        return new Promise((resolve, reject) => {
            try {
                let result = realm.objects('Memory').filtered(`id == "${id}"`);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },

    deleteMemo: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await realm.objects('Memory').filtered(`id == "${id}"`);
                realm.write(async () => {
                    console.log(result.isValid())
                    console.log(result);
                    let res = await realm.delete(result[0]);
                    resolve(res);
                });
            } catch (error) {
                reject(error);
            }
        })
    },

    getFaveMemos: () => {
        return realm.objects('Memory').filtered(`favorite == ${true}`).sorted([
            ['createdAt', true]
        ]);
    }
};
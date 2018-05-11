import UUID from "react-native-uuid";
export const UserSchema = {
  name: "User",
  primaryKey: "id",
  properties: {
    id: {
      type: "string"
    },

    firstName: "string?",
    lastName: "string?",
    password: "string?",

    createdAt: {
      type: "date",
      default: new Date()
    }
  }
};
export const MemorySchema = {
  name: "Memory",
  primaryKey: "id",
  properties: {
    id: {
      type: "string"
    },
    title: "string?",
    content: "string?",
    favorite: "bool?",
    
    createdAt: {
      type: "date",
      default: new Date()
    }
  }
};

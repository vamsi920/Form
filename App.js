import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { TextInput, RadioButton, Button } from "react-native-paper";
import { width, height, totalSize } from "react-native-dimension";
import CheckboxFormX from "react-native-checkbox-form";
import AsyncStorage from "@react-native-community/async-storage";
const mockData = [
  {
    label: "Cricket",
    value: "Cricket"
  },
  {
    label: "FootBall",
    value: "FootBall"
  },
  {
    label: "Dance",
    value: "Dance"
  }
];

export default class App extends Component<Props> {
  arr = [];
  id = 0;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      phone: "",
      item: [
        {
          id: 1,
          Email: "Null",
          Name: "Null",
          Phone: "Null"
        }
      ]
    };
  }
  setEmail = value => {
    this.setState({ email: value });
  };
  setName = value => {
    this.setState({ name: value });
  };
  setPhone = value => {
    this.setState({ phone: value });
  };

  _onSelect = item => {
    console.log(item);
  };
  storeData = async () => {
    this.arr.push({
      id: this.id,
      Email: this.state.email,
      Name: this.state.name,
      Phone: this.state.phone
    });
    this.id++;

    await AsyncStorage.setItem("list", JSON.stringify(this.arr));
    this.setState({
      item: JSON.parse(await AsyncStorage.getItem("list"))
    });
  };

  render() {
    if (this.state.item.length > 0) {
      renderList = this.state.item.map(item => {
        return (
          <View
            key={item.id}
            style={{ flexDirection: "row", justifyContent: "space-around" , flexWrap: "wrap" }}
          >
            <Text>{item.Email}</Text>
            <Text>{item.Name}</Text>
            <Text>{item.Phone}</Text>
          </View>
        );
      });
    } else {
      renderList = <Text>No values</Text>;
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.form}>
            <TextInput
              label="Email"
              value={this.state.email}
              onChangeText={this.setEmail}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Name"
              value={this.state.name}
              onChangeText={this.setName}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Phone"
              value={this.state.phone}
              onChangeText={this.setPhone}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />
            <Text style={{ fontSize: 20, color: "#000" }}>Hobbies:</Text>
            <View style={{ width: width(80), height: 100, marginTop: -20 }}>
              <CheckboxFormX
                style={{ paddingLeft: width(20) }}
                iconColor={"#000"}
                dataSource={mockData}
                itemShowKey="label"
                itemCheckedKey="RNchecked"
                iconSize={40}
                formHorizontal={true}
                labelHorizontal={false}
                onChecked={item => this._onSelect(item)}
              />
            </View>

            <TouchableOpacity
              onPress={this.storeData}
              style={{
                width: 80,
                height: 30,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "#000",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text> Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.table}>
            <View style={styles.headings}>
              <Text style={styles.headingtext}>Email</Text>
              <Text style={styles.headingtext}>Name</Text>
              <Text style={styles.headingtext}>Phone</Text>
            </View>
            <View>{renderList}</View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  form: {
    flex: 1,
    alignItems: "center"
  },
  table: {
    flex: 1,
    marginTop: 50,
    width:'100%'
  },
  input: {
    width: width(80)
  },
  headings: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around"
  },
  headingtext: {
    color: "#000",
    fontSize: 20
  }
});

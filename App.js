import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { width, height, totalSize } from "react-native-dimension";
import Modal from "react-native-modalbox";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
export default class App extends Component<Props> {
  arr = [];

  constructor(props) {
    super(props);
    this.state = {
      arr:[{
        arrid:0,
        arrEmail:'',
        arrName:'',
        arrPhone:'',
        arrHobby:'',
      }],
      id:0,
      email: "",
      isChecked:true,
      name: "",
      phone: "",
      editedHobby:'',
      isOpen: false,
      editedEmail:'',
      editedName:'',
      editedPhone:'',
      buttonValue:''
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

  updateEmail = value => {
    this.setState({ editedEmail: value });
  };
  updateName = value => {
    this.setState({ editedName: value });
  };
  updatePhone = value => {
    this.setState({ editedPhone: value });
  };
addData = () => {
  var arr1 = this.state.arr;
  var arrid = this.state.id;
  arrid++;
  var arrEmail = this.state.email;
  var arrName = this.state.name;
  var arrPhone = this.state.phone;
  var arrHobby=this.state.buttonValue;
  arr1.push({arrid, arrEmail, arrName, arrPhone, arrHobby});
  this.setState({

    arr: arr1,
    email: "",
    name: "",
    phone: "",

  });
  
}
deleteData=(row)=>{
var arr2 = this.state.arr;
  var index=arr2.indexOf(row);
  arr2.splice(index, 1);
  this.setState({
    arr:arr2,
  });
  
}
editData=(row)=>{
this.refs.modal2.close();
var arr3 = this.state.arr;
var arrid= this.state.id;
var index=arr3.indexOf(row);
var editedName= this.state.editedName;
var editedEmail= this.state.editedEmail;
var editedPhone= this.state.editedPhone;
var editedHobby= this.state.editedHobby;
this.state.arr.splice(index, 1);
this.state.arr.push(arrid, editedEmail, editedName, editedPhone, editedHobby);
}

List = () => {
  
  return this.state.arr.map((arr, arrid) => {
    return (
      <TouchableOpacity key={arrid} 
        
        onLongPress={()=>{
              Alert.alert(
                  'choose one:',
                  '',
                  [
    {text: 'Delete', onPress: () => {this.deleteData(arr)}},
    {
      text: 'Edit',
      onPress: () =>{ this.refs.modal2.open();} ,
    },
    {text: 'Do nothing', onPress: () =>{} },
  ],
                )
            }}
        style={{ flexDirection: "row", justifyContent:'space-around' , }}
      
       
      >
        <Text>{arr.arrEmail}</Text>
        <Text>{arr.arrName}</Text>
        <Text>{arr.arrPhone}</Text>
        <Text>{arr.arrHobby}</Text>
      </TouchableOpacity>
    );
  });
}

  render() {
     var radio_props = [
  {label: 'Cricket', value: 'Cricket' },
  {label: 'Football', value: 'Football' },
  {label: 'Dance', value : 'Dance' },
];
 
    return (
      <View style={styles.container}>
        <ScrollView>
        <Modal
              style={{backgroundColor:'#eee'}}
              backdrop={false}
            
              position={"top"}
              ref={"modal2"}
            >
            <TextInput
              label="Email"
              value={this.state.editedEmail}
              onChangeText={this.updateEmail}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Name"
              value={this.state.editedName}
              onChangeText={this.updateName}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Phone"
              value={this.state.editedPhone}
              onChangeText={this.updatePhone}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />
             <RadioForm
          radio_props={radio_props}
          initial={null}
          onPress={(value) => {this.setState({value:value, editedHobby:value})}}
          buttonColor={'#000'}
          formHorizontal={true}
          buttonSize={10}
          style={{paddingLeft:20, width:'80%', marginTop:20,}}
          labelStyle={{marginRight:20}}
        />
            <Button mode="outlined" onPress={()=>{
              this.editData(this.state.arr.arrid)
            }}><Text>edit data</Text></Button>
            </Modal>
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
            <RadioForm
          radio_props={radio_props}
          initial={null}
          onPress={(value) => {this.setState({value:value, buttonValue:value})}}
          buttonColor={'#000'}
          formHorizontal={true}
          buttonSize={10}
          style={{paddingLeft:20, width:'80%', }}
          labelStyle={{marginRight:20}}
        />
        <View style={{width:'80%', alignItems:'center'}}>
            <TouchableOpacity
              onPress={this.addData}
              style={{
                width: 80,
                height: 30,
                borderWidth: 2,
                borderRadius: 4,
                borderColor: "#000",
                alignItems: "center",
                justifyContent: "center",
                marginTop:20,

              }}
            >
              <Text> Submit</Text>
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.headings}>
              <Text style={styles.headingtext}>Email</Text>
              <Text style={styles.headingtext}>Name</Text>
              <Text style={styles.headingtext}>Phone</Text>
              <Text style={styles.headingtext}>Hobby</Text>
  
            </View>
            <View style={{justifyContent:'center'}}>
          {this.List()}
          </View></View>
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
   
  },
  table: {
    flex: 1,
    marginTop: 20,
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

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
      item: JSON.parse(await AsyncStorage.getItem("list")), 
      text:''
    });
  };
   if (this.state.item.length > 0) {
      renderList = this.state.item.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            style={{ flexDirection: "row", justifyContent: "space-around" , flexWrap: "wrap" }}
            onLongPress={()=>{
              Alert.alert(
                  'choose one:',
                  '',
                  [
    {text: 'Delete', onPress: () => {this.deleteData}},
    {
      text: 'Edit',
      onPress: () =>{} ,
    },
    {text: 'Do nothing', onPress: () =>{} },
  ],
                )
            }}
          >
            <Text>{item.Email}</Text>
            <Text>{item.Name}</Text>
            <Text>{item.Phone}</Text>
          </TouchableOpacity>
        );
      });
    } else {
      renderList = <Text>No values</Text>;
    }




    item: [
        {
          id: 1,
          Email: "Null",
          Name: "Null",
          Phone: "Null"
        }
      ]




      onLongPress={()=>{
              Alert.alert(
                  'choose one:',
                  '',
                  [
    {text: 'Delete', onPress: () => {this.deleteData}},
    {
      text: 'Edit',
      onPress: () =>{} ,
    },
    {text: 'Do nothing', onPress: () =>{} },
  ],
                )
            }}



editData=(row)=>{
this.refs.modal2.close();
var arr3 = this.state.arr;
var arrid= this.state.id;
var index=arr3.indexOf(row);
var editedName= this.state.editedName;
var editedEmail= this.state.editedEmail;
var editedPhone= this.state.editedPhone;
arr3.splice(index, 1);
arr3.push({arrid, editedEmail, editedName, editedPhone});
this.setState({
  arr:arr3,
 arrid:arrid, arrEmail:editedEmail, arrName:editedName, arrPhone:editedPhone
});

}



    arr3.push({ arrid, editedEmail, editedName, editedPhone });



    this.setState(arr:[...arr3.map(item=>item.arrid===arrid?{...item,arrEmail:editedEmail, arrName:editedName, arrPhone:editedPhone }:item)]);



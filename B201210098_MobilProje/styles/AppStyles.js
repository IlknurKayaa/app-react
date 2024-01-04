import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  noPadding: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red"
  },
  backgroundCover: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.7,
    padding: 16
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
  },
  fillSpace: {
    flex: 1
  },
  rightAligned: {
    justifyContent: "flex-end"
  },
  topMargin: {
    marginTop: 16
  },
  bottomMargin: {
    marginBottom: 16
  },
  rightMargin: {
    marginRight: 16
  },
  leftMargin: {
    marginLeft: 16
  },
  lightText: {
    color: "#fff"
  },
  errorText: {
    color: "#ff0000"
  },
  header: {
    color:'blue',
    fontSize: 20,
    alignSelf: "center"
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8
  },
  lightTextInput: {
    borderBottomColor: "#ffffff"
  },
  darkTextInput: {
    borderBottomColor: "#000000"
  },
  inlineTextButton: {
    color: "skyblue"
  },
  pressedInlineTextButton: {
    color: "blue",
    opacity: 0.6
  },
  buttonImage:{
    width:50,
    height:50,
    marginTop:10
  },
  button:{
      backgroundColor:'skyblue',
      marginTop:50,
      width:190,
      height:40,
      alignSelf:'center',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',

  },
  buttonText:{
    fontsize:25,
    color:'blue'
  },
  input:{
    paddingLeft:20,
    height:50,
    alignSelf:'center',
    borderWidth:1,
    borderColor:'gray',
    borderRadius:20,
    marginTop:30,
    width:'90%',
    
}
});

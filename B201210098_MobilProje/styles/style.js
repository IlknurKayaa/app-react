import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex:1
    },
    botView:{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position:'absolute',
        bottom:0,
        backgroundColor:'#fff'
    },
    botTab:{
        height: '100%',
        width: '20%',
        justifyContent:'center',
        alignItems:'center'

    },
    botTabImg:{
        width:30,
        height:30,
    },
    header:{
        height: 100,
        width: '100%',
        backgroundColor: '#fff',
        elevation: 5,
        paddingLeft: 20,
        justifyContent: 'center',

    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',
        marginTop:35,
        color:'#8b4513'
      },
    inputStyle: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 30,
        alignSelf: 'center',
      },
      pickBtn: {
        width: '90%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      uploadBtn: {
        backgroundColor: '#8b4513',
        width: '90%',
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
      imageStyle: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
      },
      itemlist:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius:20,
        width:'100%',
        height:30,
      },
      itemname:{
        fontSize:20,
        marginLeft:15
      },
      productName:{
        fontSize:20,
        color:'#8b4513'
      },
      productPrice:{
        fontSize:18,
        color:'#8b4513'
      },
      favwish:{
        width:25,
        height:25,
        marginTop:10,
        marginBottom:10
      },
      listItem: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
      },
      itemName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      itemPrice: {
        fontSize: 16,
        color: 'gray',
      },
      listContainer: {
        padding: 16,
      },
  });
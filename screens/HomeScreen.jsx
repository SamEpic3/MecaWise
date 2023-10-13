import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default function HomeScreen({ navigation }) {
    const menus = [
        {
          id: "pythagore",
          title: "Pythagore",
          imageSource: require('../res/icons/square_foot.png')
        },
        {
          id: "conversion",
          title: "Conversion de signaux",
          imageSource: require('../res/icons/chart.png')
        },
        {
          id: "scale",
          title: "Calculatrice d'échelle",
          imageSource: require('../res/icons/calculate.png')
        },
        {
          id: "cuttingSpeed",
          title: "Vitesse de coupe",
          imageSource: require('../res/icons/drill.png')
        },
      ];

    return (
      <View style={styles.container}>
        {
          menus.map((item) => 
            <TouchableHighlight 
              onPress={() => navigation.navigate(item.id)}
              style={styles.homeMenuButton}
              underlayColor="#eee"
              key={item.id}
            >
              <View style={styles.homeMenuButtonView}>
                <Image source={item.imageSource} style={styles.homeMenuButtonIcon} />
                <Text style={{textAlign: "center"}}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )
        }
      </View>
    );
  }

  const styles = StyleSheet.create({
    homeMenuButton: { 
      backgroundColor: "#f5f5f5",
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 10,
      margin: 10,
      padding: 10
    },
    homeMenuButtonView: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      aspectRatio: 1,
      minWidth: 100,
    },
    homeMenuButtonIcon: {
      width: 50,
      height: 50,
      aspectRatio: 1,
      resizeMode: "contain"
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center",
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: '#ededed',
    },    
  });
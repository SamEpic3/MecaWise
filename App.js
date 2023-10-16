import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import Pythagore from "./screens/Pythagore";
import Conversion from "./screens/Conversion/Conversion";
import Scale from "./screens/Scale";
import CuttingSpeed from "./screens/CuttingSpeed/CuttingSpeed";
import MaterialList from "./screens/CuttingSpeed/MaterialList";
import MaterialDetails from "./screens/CuttingSpeed/MaterialDetails";
import CuttingSpeedHelp from './screens/CuttingSpeed/CuttingSpeedHelp';
import ConversionHelp from './screens/Conversion/ConversionHelp';
import { getCuttingSpeedData, storeCuttingSpeedData, getSettings, storeSettings } from "./utils/localstorage";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import color from "color";
import AppDataContext from './contexts/AppDataContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [data, setData] = useState([]);
  const [localDataLoading, setLocalDataLoading] = useState(false);

  useEffect(() => {
    let storedData;
    async function fetchLocalData() {
      setLocalDataLoading(true);
      storedData = await getCuttingSpeedData();
      if(storedData) {
        setData(storedData);
      }
      setLocalDataLoading(false);
    }

    fetchLocalData();
  }, []);

  useEffect(() => {
    async function storeLocalData() {
      storeCuttingSpeedData(data);
    }

    storeLocalData();
  }, [data]);

  const mainTheme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#0077bb',
      accent: '#0055ff',
      background: '#ededed',
      surface: "#fff",
      error: '#B00020',
      text: "#000",
      onSurface: '#000000',
      disabled: color("#000").alpha(0.26).rgb().string(),
      placeholder: color("#000").alpha(0.54).rgb().string(),
      backdrop: color("#000").alpha(0.5).rgb().string(),
      notification: "#bb5555",
      elevation: {
        ...DefaultTheme.colors.elevation,
        level3: "#ededed"
      }
    }
  };

  return (
    
    <PaperProvider theme={mainTheme}>
      <AppDataContext.Provider value={{ data, setData }}>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ 
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#0077bb"
              }
          }}>
            <Stack.Screen 
              name="home"
              component={HomeScreen} 
              options={{
                title: "MecaWise"
              }}
            />
            <Stack.Screen 
              name="pythagore"
              component={Pythagore} 
              options={{
                title: "Pythagore"
              }}
            />
            <Stack.Screen 
              name="conversion"
              component={Conversion} 
              options={{
                title: "Conversion de signaux"
              }}
            />
            <Stack.Screen 
              name="conversionHelp"
              component={ConversionHelp} 
              options={{
                title: "Conversion de signaux - Aide"
              }}
            />
            <Stack.Screen 
              name="scale"
              component={Scale} 
              options={{
                title: "Calculatrice d'échelle"
              }}
            />
            <Stack.Screen 
              name="cuttingSpeed"
              component={CuttingSpeed} 
              options={{
                title: "Vitesse de coupe"
              }}
            />
            <Stack.Screen 
              name="cuttingSpeedHelp"
              component={CuttingSpeedHelp} 
              options={{
                title: "Vitesse de coupe - Aide"
              }}
            />
            <Stack.Screen 
              name="materialList"
              component={MaterialList} 
              options={{
                title: "Liste de matériaux"
              }}
            />
            <Stack.Screen 
              name="materialDetails"
              component={MaterialDetails}
              options={{
                title: "Détails"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" backgroundColor="#0077bb"/>
      </AppDataContext.Provider>
    </PaperProvider>
  );
}

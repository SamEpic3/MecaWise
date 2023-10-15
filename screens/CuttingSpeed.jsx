import { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, Text, View, Pressable } from 'react-native';
import { SegmentedButtons, TextInput, useTheme } from 'react-native-paper';
import { roundXDec } from "../utils/math";
import AppDataContext from "../contexts/AppDataContext";
import { defaultMaterialOptions } from "../utils/defaultCuttingSpeeds";
import { Feather } from '@expo/vector-icons';

export default function CuttingSpeed({ navigation, route }) {

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Pressable onPress={() => navigation.navigate("cuttingSpeedHelp")} hitSlop={10}>
                <Feather name="help-circle" size={24} color="white" />
            </Pressable>
          </View>
        )
      },
      gestureEnabled: false
    });
  }, []);

    const [material, setMaterial] = useState(defaultMaterialOptions[0]);
    const [tool, setTool] = useState("hss");
    const [units, setUnits] = useState("imperial");
    const [diameter, setDiameter] = useState("");
    const [rpm, setRpm] = useState("");

    const theme = useTheme();

    const { data } = useContext(AppDataContext);

    const unitsModifier = {
      "imperial" : 1,
      "metric" : 25.4
    }

    const toolOptions = [
        {
          value: "hss",
          label: "HSS",
          checkedColor: "#fff",
          style: { 
            backgroundColor: (tool == "hss" ? theme.colors.primary : theme.colors.surface)
          }
        },
        {
          value: "carbide",
          label: "Carbure",
          checkedColor: "#fff",
          style: { 
            backgroundColor: (tool == "carbide" ? theme.colors.primary : theme.colors.surface) 
          }
        }
    ];

    const unitsOptions = [
      {
        value: "imperial",
        label: "Pouces",
        checkedColor: "#fff",
        style: { 
          backgroundColor: (units == "imperial" ? theme.colors.primary : theme.colors.surface)
        }
      },
      {
        value: "metric",
        label: "Millimètres",
        checkedColor: "#fff",
        style: { 
          backgroundColor: (units == "metric" ? theme.colors.primary : theme.colors.surface)
        }
      }
    ];

    function handleTextChange(value) {
        if((!isNaN(value) || value === ".") && value[value.length-1] !== " ") {
          setDiameter(value);
        }
    }

    function handleMaterialPress() {
      navigation.navigate("materialList");
    }

    useEffect(() => {
      let newRpm = "";
      if(!isNaN(diameter) && diameter > 0 && material.sfm[tool] >= 1) {
        newRpm = Math.round((12 * material.sfm[tool]) / (Math.PI * (diameter / unitsModifier[units])));
        if(newRpm > 100000) newRpm = 100000;
        setRpm(roundXDec(newRpm, 3));
      }
      else {
          setRpm("");
      }
    }, [material, tool, units, diameter]);

    useEffect(() => {
      if(route.params?.selectedMaterial) setMaterial(route.params.selectedMaterial);
    }, [route.params?.selectedMaterial, data]);
  
    return (
      <ScrollView contentContainerStyle={styles.cuttingSpeedContainer}>
        <Pressable onPress={handleMaterialPress} style={{ flexDirection: "row" }} android_ripple={{ color: "#bbb"}}>
          <TextInput 
            mode="outlined"
            onPress={handleMaterialPress}
            label="Matériau"
            style={styles.textInput}
            activeOutlineColor="#0077bb"
            value={material.label}
            editable={false}
          />
        </Pressable>
        <View style={styles.segmentedButtonsView}>
          <SegmentedButtons
            value={tool}
            onValueChange={setTool}
            buttons={toolOptions}
          />
        </View>
        <View style={styles.segmentedButtonsView}>
          <SegmentedButtons
            value={units}
            onValueChange={setUnits}
            buttons={unitsOptions}
          />
        </View>
        <TextInput 
            mode="outlined"
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text)}
            label={"Diamètre (" + (units == "imperial" ? "po" : "mm") + ")"}
            style={styles.textInput}
            activeOutlineColor="#0077bb"
            value={diameter}
        />
        {rpm !== "" && <Text style={styles.rpmText}>{rpm} rpm</Text>}
        {material.sfm[tool] <= 0 && <Text style={styles.rpmText}>Vitesse de coupe non définie pour ce matériau avec cet outil</Text>}
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    cuttingSpeedContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ededed',
        paddingTop: 10
    },
    segmentedButtonsView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "75%",
      margin: 7
    },
    textInput: {
        backgroundColor: "#f5f5f5",
        width: "75%",
        margin: 7
    },
    rpmText: {
        textAlign: "center",
        fontSize: 20,
        margin: 10,
        width: "75%"
    }
  });
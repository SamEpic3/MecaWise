import { useState, useRef, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { round3Dec } from "../../utils/math";
import { Feather } from '@expo/vector-icons';

export default function Conversion({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Pressable onPress={() => navigation.navigate("conversionHelp")} hitSlop={10}>
                <Feather name="help-circle" size={24} color="white" />
            </Pressable>
          </View>
        )
      },
      gestureEnabled: false
    });
  }, []);

  const [inputs, setInputs] = useState({
      minX: "",
      maxX: "",
      minY: "",
      maxY: "",
      valX: "",
      valY: ""
  });

  const inputsRef = {
      minX: useRef(),
      maxX: useRef(),
      minY: useRef(),
      maxY: useRef(),
      valX: useRef(),
      valY: useRef()
  }

  const [formula, setFormula] = useState("");

  function handleTextChange(text, name) {
      let newInputs = { ...inputs, [name]: text };
      
      let minX = Number.parseFloat(newInputs.minX);
      let maxX = Number.parseFloat(newInputs.maxX);
      let minY = Number.parseFloat(newInputs.minY);
      let maxY = Number.parseFloat(newInputs.maxY);
      
      if(!isNaN(minX) &&
          !isNaN(maxX) &&
          !isNaN(minY) &&
          !isNaN(maxY)) {
          
        let variation = (maxY - minY) / (maxX - minX);
        let origin = round3Dec(minY - (minX * variation));
    
        let variation2 = (maxX - minX) / (maxY - minY)
        let origin2 = round3Dec(minX - (minY * variation2));
        
        let formula = "";
        if(!isFinite(variation)) {
            formula = "y = [" + minY + ", " + maxY + "]";
        }
        else {
            formula = "y = " + round3Dec(variation) + "x";
            if(origin > 0) formula += " + " + origin;
            if(origin < 0) formula += " - " + origin * -1;
        }
    
        setFormula(formula);

        if(name === "valX") {
            if(text == "") {
              newInputs.valY = "";
            }
            else if(isFinite(variation) && !isNaN(text)) {
              newInputs.valY = round3Dec(variation * text + origin).toString();
            }
        }
        else if(name === "valY") {
            if(text == "") {
              newInputs.valX = "";
            }
            else if(isFinite(variation2) && !isNaN(text)) {
              newInputs.valX = round3Dec(variation2 * text + origin2).toString(); 
            }
        }
      }
      else {
        setFormula("");
        newInputs.valX = "";
        newInputs.valY = "";
      }

      if((!isNaN(text) || text === "-" || text === ".") && text[text.length-1] !== " ") {
        setInputs(newInputs);
      }
      else {
        inputsRef[name].current.setNativeProps({ text: inputs[name]});
      }   
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        mode="outlined" 
          keyboardType="numeric"
          onChangeText={(text) => handleTextChange(text, "minX")}
          label="Min. X"
          style={ styles.textInput }
          activeOutlineColor="#0077bb"
          value={inputs.minX}
          ref={inputsRef.minX}
          onSubmitEditing={() => inputsRef.maxX.current.focus()}
      />
      <TextInput
        mode="outlined" 
          keyboardType="numeric"
          onChangeText={(text) => handleTextChange(text, "maxX")}
          label="Max. X"
          style={ styles.textInput }
          activeOutlineColor="#0077bb"
          value={inputs.maxX}
          ref={inputsRef.maxX}
          onSubmitEditing={() => inputsRef.minY.current.focus()}
      />
      <TextInput
        mode="outlined" 
          keyboardType="numeric"
          onChangeText={(text) => handleTextChange(text, "minY")}
          label="Min. Y"
          style={ styles.textInput }
          activeOutlineColor="#0077bb"
          value={inputs.minY}
          ref={inputsRef.minY}
          onSubmitEditing={() => inputsRef.maxY.current.focus()}
      />
      <TextInput
        mode="outlined" 
          keyboardType="numeric"
          onChangeText={(text) => handleTextChange(text, "maxY")}
          label="Max. Y"
          style={ styles.textInput }
          activeOutlineColor="#0077bb"
          value={inputs.maxY}
          ref={inputsRef.maxY}
          onSubmitEditing={() => inputsRef.valX.current.focus()}
      />

      {formula ? <Text>{formula}</Text> : null}

      <View style={styles.bottomContainer}>
        <TextInput
          mode="outlined" 
          keyboardType="numeric"
          onChangeText={(text) => handleTextChange(text, "valX")}
          label="X"
          style={ styles.textInputBottom }
          activeOutlineColor="#0077bb"
          value={inputs.valX}
          ref={inputsRef.valX}
        />
        <TextInput
          mode="outlined" 
          keyboardType="numeric"
          onChangeText={(text) => handleTextChange(text, "valY")}
          label="Y"
          style={ styles.textInputBottom }
          activeOutlineColor="#0077bb"
          value={inputs.valY}
          ref={inputsRef.valY}
        />
      </View>
    </ScrollView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ededed',
      paddingTop: 10
    },
    textInput: {
      backgroundColor: "#f5f5f5",
      width: "75%",
      margin: 5
    },
    bottomContainer: {
      display: "flex",
      flexDirection: "row",
      width: "75%",
      justifyContent: "space-around"
    },
    textInputBottom: {
      backgroundColor: "#f5f5f5",
      flex: 1,
      margin: 5
    }
  });
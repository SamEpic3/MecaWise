import { useState, useRef } from "react";
import { StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { roundXDec } from "../utils/math";

export default function Scale({ navigation }) {
    const [inputs, setInputs] = useState({
        shortWanted: "",
        shortReal: "",
        longWanted: "",
        longReal: "",
        currentScale: ""
    });

    const inputsRef = {
        shortWanted: useRef(),
        shortReal: useRef(),
        longWanted: useRef(),
        longReal: useRef(),
        currentScale: useRef()
    }

    const [scale, setScale] = useState("");
    
    function handleTextChange(text, name) {
        let newInputs = {...inputs, [name]: text};
    
        let shortWanted = Number.parseFloat(newInputs.shortWanted);
        let shortReal = Number.parseFloat(newInputs.shortReal);
        let longWanted = Number.parseFloat(newInputs.longWanted);
        let longReal = Number.parseFloat(newInputs.longReal);
        let currentScale = Number.parseFloat(newInputs.currentScale);
        let newScale = currentScale;
    
        if(!isNaN(shortWanted) &&
           !isNaN(shortReal) &&
           !isNaN(longWanted) &&
           !isNaN(longReal) &&
           !isNaN(currentScale)) {
          newScale = roundXDec(((longWanted - shortWanted)*currentScale) / (longReal - shortReal), 5) + 
          " ou " +
          roundXDec(((longReal - shortReal)*currentScale) / (longWanted - shortWanted), 5);
          if(newScale === currentScale) newScale = "Échelle déjà correcte"
          setScale(newScale);
        }
        else {
          setScale("");
        }
    
        if((!isNaN(text) || text === ".") && text[text.length-1] !== " ") {
          setInputs(newInputs);
        }
    }
    
  
    return (
      <ScrollView contentContainerStyle={styles.scaleContainer}>
        <TextInput
            mode="outlined" 
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, "shortWanted")}
            label="Mesure courte voulue"
            style={styles.textInput}
            activeOutlineColor="#0077bb"
            value={inputs.shortWanted}
            ref={inputsRef.shortWanted}
            onSubmitEditing={() => inputsRef.shortReal.current.focus()}
        />
        <TextInput
            mode="outlined" 
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, "shortReal")}
            label="Mesure courte réelle"
            style={styles.textInput}
            activeOutlineColor="#0077bb"
            value={inputs.shortReal}
            ref={inputsRef.shortReal}
            onSubmitEditing={() => inputsRef.longWanted.current.focus()}
        />
        <TextInput
            mode="outlined" 
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, "longWanted")}
            label="Mesure longue voulue"
            style={styles.textInput}
            activeOutlineColor="#0077bb"
            value={inputs.longWanted}
            ref={inputsRef.longWanted}
            onSubmitEditing={() => inputsRef.longReal.current.focus()}
        />
        <TextInput
            mode="outlined" 
            keyboardType="numeric" 
            onChangeText={(text) => handleTextChange(text, "longReal")} 
            label="Mesure longue réelle"
            style={styles.textInput}
            activeOutlineColor="#0077bb"
            value={inputs.longReal}
            ref={inputsRef.longReal}
            onSubmitEditing={() => inputsRef.currentScale.current.focus()}
        />
        <TextInput
            mode="outlined" 
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, "currentScale")}
            label="Échelle courante"
            style={styles.textInput}
            activeOutlineColor="#0077bb"
            value={inputs.currentScale}
            ref={inputsRef.currentScale}
        />
        {scale !== "" ? <Text style={styles.scaleText}>Nouvelle échelle{"\n" + scale}</Text> : null}
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    scaleContainer: {
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
    scaleText: {
        textAlign: "center",
        fontSize: 20,
        margin: 10
    }
  });
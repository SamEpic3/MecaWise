import { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { round3Dec, toDegrees, toRadians } from "../utils/math";

export default function Pythagore({ navigation }) {
    const [inputs, setInputs] = useState({
        catA: "",
        catB: "",
        hyp: "",
        angleA: "",
        angleB: "",
      });

      const ref_input_catA = useRef();
      const ref_input_catB = useRef();
      const ref_input_hyp = useRef();
      const ref_input_angleA = useRef();
      const ref_input_angleB = useRef();
    
    const defaultInputColor = "#f5f5f5";
    const historyColor = "#ccffcc";
    const [givenInputColor, setGivenInputColor] = useState(historyColor);

    const [changeHistory, setChangeHistory] = useState([]);
    const [hypLessThanCatError, setHypLessThanCatError] = useState(false);

    useEffect(() => {
        setGivenInputColor(hypLessThanCatError ? "#ff9999" : historyColor);
      }, [hypLessThanCatError]);

    function handleTextChange(text, name) {
        let newInputs = { ...inputs, [name]: text };
        let newChangeHistory = changeHistory;
        setHypLessThanCatError(false);

        if (changeHistory.length < 2 && !changeHistory.includes(name)) {
            newChangeHistory = [].concat(name, changeHistory);
        } 
        else if (
            changeHistory.length >= 2 &&
            changeHistory[0] !== name
        ) {
            newChangeHistory = [].concat(name, changeHistory[0]);
        }

        let catA = Number.parseFloat(newInputs.catA);
        let catB = Number.parseFloat(newInputs.catB);
        let hyp = Number.parseFloat(newInputs.hyp);
        let angleA = Number.parseFloat(newInputs.angleA);
        let angleB = Number.parseFloat(newInputs.angleB);

        if (
            newChangeHistory.includes("catA") &&
            newChangeHistory.includes("catB")
          ) {
            hyp = round3Dec(Math.sqrt(Math.pow(catA, 2) + Math.pow(catB, 2)));
            angleA = round3Dec(toDegrees(Math.atan(catA / catB)));
            angleB = round3Dec(toDegrees(Math.atan(catB / catA)));
          } else if (
            newChangeHistory.includes("catA") &&
            newChangeHistory.includes("hyp")
          ) {
            if (catA > hyp) {
              setHypLessThanCatError(true);
            } else {
              catB = round3Dec(Math.sqrt(Math.pow(hyp, 2) - Math.pow(catA, 2)));
              angleA = round3Dec(toDegrees(Math.atan(catA / catB)));
              angleB = round3Dec(toDegrees(Math.atan(catB / catA)));
            }
          } else if (
            newChangeHistory.includes("catB") &&
            newChangeHistory.includes("hyp")
          ) {
            if (catB > hyp) {
              setHypLessThanCatError(true);
            } else {
              catA = round3Dec(Math.sqrt(Math.pow(hyp, 2) - Math.pow(catB, 2)));
              angleA = round3Dec(toDegrees(Math.atan(catA / catB)));
              angleB = round3Dec(toDegrees(Math.atan(catB / catA)));
            }
          } else if (
            newChangeHistory.includes("catA") &&
            newChangeHistory.includes("angleA")
          ) {
            catB = round3Dec(catA / Math.tan(toRadians(angleA)));
            hyp = round3Dec(catA / Math.sin(toRadians(angleA)));
            angleB = round3Dec(90 - angleA);
          } else if (
            newChangeHistory.includes("catA") &&
            newChangeHistory.includes("angleB")
          ) {
            catB = round3Dec(catA * Math.tan(toRadians(angleB)));
            hyp = round3Dec(catA / Math.cos(toRadians(angleB)));
            angleA = round3Dec(90 - angleB);
          } else if (
            newChangeHistory.includes("catB") &&
            newChangeHistory.includes("angleA")
          ) {
            catA = round3Dec(catB * Math.tan(toRadians(angleA)));
            hyp = round3Dec(catB / Math.cos(toRadians(angleA)));
            angleB = round3Dec(90 - angleA);
          } else if (
            newChangeHistory.includes("catB") &&
            newChangeHistory.includes("angleB")
          ) {
            catA = round3Dec(catB / Math.tan(toRadians(angleB)));
            hyp = round3Dec(catB / Math.sin(toRadians(angleB)));
            angleA = round3Dec(90 - angleB);
          } else if (
            newChangeHistory.includes("hyp") &&
            newChangeHistory.includes("angleA")
          ) {
            catA = round3Dec(hyp * Math.sin(toRadians(angleA)));
            catB = round3Dec(hyp * Math.cos(toRadians(angleA)));
            angleB = round3Dec(90 - angleA);
          } else if (
            newChangeHistory.includes("hyp") &&
            newChangeHistory.includes("angleB")
          ) {
            catA = round3Dec(hyp * Math.sin(toRadians(angleB)));
            catB = round3Dec(hyp * Math.cos(toRadians(angleB)));
            angleA = round3Dec(90 - angleB);
          } else if (
            newChangeHistory.includes("angleA") &&
            newChangeHistory.includes("angleB")
          ) {
            catA = "";
            catB = "";
            hyp = "";
          }
      
          if (isNaN(catA)) catA = "";
          if (isNaN(catB)) catB = "";
          if (isNaN(hyp)) hyp = "";
          if (isNaN(angleA)) angleA = "";
          if (isNaN(angleB)) angleB = "";

          newInputs = {
            catA: catA.toString(),
            catB: catB.toString(),
            hyp: hyp.toString(),
            angleA: angleA.toString(),
            angleB: angleB.toString(),
          };

          if (
            text[text.length - 1] === "." &&
            !text.slice(0, text.length - 1).includes(".")
          ) {
            newInputs[name] = text;
          } else if (
            text[text.length - 1] === "." &&
            text.slice(0, text.length - 1).includes(".")
          ) {
            newInputs[name] = text.slice(
              0,
              text.length - 1
            );
          }
      
          setInputs(newInputs);
          setChangeHistory(newChangeHistory);
    }
  
    return (
      <ScrollView contentContainerStyle={styles.pythagoreContainer}>
        <TextInput
            mode="outlined" 
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, "catA")}
            label="Cathète a"
            style={[ styles.textInput, {backgroundColor: changeHistory.includes("catA")
            ? givenInputColor
            : defaultInputColor} ]}
            value={inputs.catA}
            ref={ref_input_catA}
            onSubmitEditing={() => ref_input_catB.current.focus()}
        />
        <TextInput
            mode="outlined" 
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, "catB")}
            label="Cathète b"
            style={[ styles.textInput, {backgroundColor: changeHistory.includes("catB")
            ? givenInputColor
            : defaultInputColor} ]}
            activeOutlineColor="#0077bb"
            value={inputs.catB}
            ref={ref_input_catB}
            onSubmitEditing={() => ref_input_hyp.current.focus()}
        />
        <TextInput
            mode="outlined" 
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, "hyp")}
            label="Hypothénuse c"
            style={[ styles.textInput, {backgroundColor: changeHistory.includes("hyp")
            ? givenInputColor
            : defaultInputColor} ]}
            activeOutlineColor="#0077bb"
            value={inputs.hyp}
            ref={ref_input_hyp}
            onSubmitEditing={() => ref_input_angleA.current.focus()}
        />
        <TextInput
            mode="outlined" 
            keyboardType="numeric" 
            onChangeText={(text) => handleTextChange(text, "angleA")} 
            label="Angle α"
            style={[ styles.textInput, {backgroundColor: changeHistory.includes("angleA")
            ? givenInputColor
            : defaultInputColor} ]} 
            activeOutlineColor="#0077bb"
            value={inputs.angleA}
            ref={ref_input_angleA}
            onSubmitEditing={() => ref_input_angleB.current.focus()}
        />
        <TextInput
            mode="outlined" 
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, "angleB")}
            label="Angle β"
            style={[ styles.textInput, {backgroundColor: changeHistory.includes("angleB")
            ? givenInputColor
            : defaultInputColor} ]}
            activeOutlineColor="#0077bb"
            value={inputs.angleB}
            ref={ref_input_angleB}
        />
        <Image source={require("../res/assets/rightTriangle.png")} style={{ width: "75%", resizeMode: "contain"}} />
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    pythagoreContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ededed',
      paddingTop: 10
    },
    textInput: {
        width: "75%",
        margin: 5
    }
  });
import { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, BackHandler, Alert} from 'react-native';
import { Divider } from 'react-native-paper';
import { TextInput } from '../../components/TextInput';
import { Feather, Ionicons } from '@expo/vector-icons';
import AppDataContext from "../../contexts/AppDataContext";
import { removeTrailingZeros } from '../../utils/math';


export default function MaterialDetails({ navigation, route }) {
    const { setData } = useContext(AppDataContext);

    const [label, setLabel] = useState(route.params.material.label);
    const [sfm, setsfm] = useState({ 
        hss: route.params.material.sfm.hss,
        carbide: route.params.material.sfm.carbide
    });
    const [mMin, setMMin] = useState({ 
        hss: route.params.material?.mMin?.hss,
        carbide: route.params.material?.mMin?.carbide
    });
    const [changeMade, setChangeMade] = useState(false);

    const labelInputRef = useRef(null);
    const sfmHSSInputRef = useRef(null);
    const sfmCarbideInputRef = useRef(null);
    const mMinHSSInputRef = useRef(null);
    const mMinCarbideInputRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable style={{marginRight: 30}} onPress={() => changeMade ? customBackAction() : navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white"/>
                </Pressable>
            ),
            headerRight: () => {
                return (
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>  
                        {route.params.customMaterial && !route.params.newMaterial &&
                            <Pressable onPress={() => deleteMaterial()} hitSlop={10}>
                                <Feather name="trash-2" size={24} color="white" />
                            </Pressable>
                        }
                        {changeMade &&
                            <Pressable onPress={() => saveChanges()} hitSlop={10} style={{marginLeft: 15}}>
                                <Feather name="check" size={24} color="white" />
                            </Pressable>
                        }
                    </View>
                )
            },
            gestureEnabled: false
        });
    }, [navigation, changeMade, label, sfm]);

    useEffect(() => {  
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => customBackAction(),
        );

        return () => backHandler.remove();
    }, [navigation, changeMade, label, sfm]);

    function customBackAction() {
        if(changeMade) {
            Alert.alert(
                'Modifications non sauvegardées', 
                'Voulez-vous sauvegarder les modifications apportées?', 
                [
                    {text: 'Non', onPress: () => navigation.goBack()},
                    {text: 'Oui', onPress: () => saveChanges()}
                ]
            );
            return true;
        }
    }

    function handleLabelChange(text) {
        setLabel(text);
        text.length >= 1 ? setChangeMade(true) : setChangeMade(false);
    }
    
    function handleCutSpeedChange(text, unit, tool, removeZeros = false) {
        setChangeMade(true);
        if(!isNaN(+text) && text.length < 10) {
            let newCutSpeed = removeZeros && text > 0 ? removeTrailingZeros(+text).toString() : text;
            if(unit == "sfm") {
                setsfm((previoussfm) => ({ ...previoussfm, [tool]: newCutSpeed }));
                setMMin((previousMMin) => ({ ...previousMMin, [tool]: newCutSpeed > 0 ? removeTrailingZeros(+newCutSpeed * 0.3048).toString() : "" }));
            } 
            else if(unit == "mMin") {
                setsfm((previoussfm) => ({ ...previoussfm, [tool]: newCutSpeed > 0 ? removeTrailingZeros(+newCutSpeed / 0.3048).toString() : "" }));
                setMMin((previousMMin) => ({ ...previousMMin, [tool]: newCutSpeed }));
            }
        }
    }

    function saveChanges() {
        setData((previousData) => {
            let newData = [...previousData];
            let newLabel = label.length >= 1 ? label : "Sans nom";
            if(route.params.newMaterial) {
                newData.push({ label: newLabel, sfm, mMin });
            }
            else {
                newData[route.params.index] = { label: newLabel, sfm, mMin };
            }
            return newData;
        });
        navigation.navigate("materialList");
    }

    function deleteMaterial() {
        Alert.alert(
            'Confirmation', 
            'Êtes-vous certain de vouloir supprimer ce matériau?', 
            [
                {text: 'Non', onPress: () => {}},
                {text: 'Oui', onPress: () => {
                    setData((previousData) => {
                        let newData = [...previousData];
                        newData.splice(route.params.index, 1);
                        return newData;
                    });
                    navigation.navigate("materialList");
                }}
            ]
        );
    }

    return (
        <>  
            {
                route.params.customMaterial ?

                //Custom material

                <ScrollView contentContainerStyle={styles.materialEditContainer} keyboardShouldPersistTaps='handled'>
                    <Pressable style={styles.itemPressable} onPress={() => labelInputRef.current.focus()}>
                        <Text style={styles.itemText}>Nom</Text>
                        <TextInput 
                            ref={labelInputRef}
                            keyboardType={"default"}
                            style={styles.textInput}
                            value={label}
                            onChangeText={(text) => handleLabelChange(text)}
                            placeholder="Entrez un nom"
                            textAlign="right"
                            maxLength={24}
                        />
                    </Pressable>
                    <Divider style={{ backgroundColor: "black" }}/>
                    <Text style={styles.subTitleText}>SFM</Text>
                    <Divider style={{ backgroundColor: "black" }}/>
                    <Pressable style={styles.itemPressable} onPress={() => sfmHSSInputRef.current.focus()}>
                        <Text style={styles.itemText}>HSS</Text>
                        <TextInput 
                            ref={sfmHSSInputRef}
                            keyboardType={"numeric"}
                            style={styles.textInput}
                            value={sfm.hss.toString()}
                            onChangeText={(text) => handleCutSpeedChange(text, "sfm", "hss")}
                            placeholder="Entrez une valeur"
                            textAlign="right"
                            maxLength={8}
                            onEndEditing={(event) => handleCutSpeedChange(event.nativeEvent.text, "sfm", "hss", true)}
                        />
                    </Pressable>
                    <Divider style={{ backgroundColor: "black" }}/>
                    <Pressable style={styles.itemPressable} onPress={() => sfmCarbideInputRef.current.focus()}>
                        <Text style={styles.itemText}>Carbure</Text>
                        <TextInput 
                            ref={sfmCarbideInputRef}
                            keyboardType={"numeric"}
                            style={styles.textInput}
                            value={sfm.carbide.toString()}
                            onChangeText={(text) => handleCutSpeedChange(text, "sfm", "carbide")}
                            placeholder="Entrez une valeur"
                            textAlign="right"
                            maxLength={8}
                            onEndEditing={(event) => handleCutSpeedChange(event.nativeEvent.text, "sfm", "carbide", true)}
                        />
                    </Pressable>
                    
                    <Divider style={{ backgroundColor: "black" }}/>
                    <Text style={styles.subTitleText}>Mètre/Minute</Text>
                    <Divider style={{ backgroundColor: "black" }}/>
                    <Pressable style={styles.itemPressable} onPress={() => mMinHSSInputRef.current.focus()}>
                        <Text style={styles.itemText}>HSS</Text>
                        <TextInput 
                            ref={mMinHSSInputRef}
                            keyboardType={"numeric"}
                            style={styles.textInput}
                            value={mMin.hss.toString()}
                            onChangeText={(text) => handleCutSpeedChange(text, "mMin", "hss")}
                            placeholder="Entrez une valeur"
                            textAlign="right"
                            maxLength={8}
                            onEndEditing={(event) => handleCutSpeedChange(event.nativeEvent.text, "mMin", "hss", true)}
                        />
                    </Pressable>
                    <Divider style={{ backgroundColor: "black" }}/>
                    <Pressable style={styles.itemPressable} onPress={() => mMinCarbideInputRef.current.focus()}>
                        <Text style={styles.itemText}>Carbure</Text>
                        <TextInput 
                            ref={mMinCarbideInputRef}
                            keyboardType={"numeric"}
                            style={styles.textInput}
                            value={mMin.carbide.toString()}
                            onChangeText={(text) => handleCutSpeedChange(text, "mMin", "carbide")}
                            placeholder="Entrez une valeur"
                            textAlign="right"
                            maxLength={8}
                            onEndEditing={(event) => handleCutSpeedChange(event.nativeEvent.text, "mMin", "carbide", true)}
                        />
                    </Pressable>
                </ScrollView>
                :

                //Default material

                <ScrollView contentContainerStyle={styles.materialEditContainer}>
                <View style={styles.itemPressable}>
                    <Text style={styles.itemText}>Nom</Text>
                    <Text style={styles.itemText}>{label}</Text>
                </View>
                <Divider style={{ backgroundColor: "black" }}/>
                <View style={styles.itemPressable}>
                    <Text style={styles.itemText}>SFM - HSS</Text>
                    <Text style={styles.itemText}>{sfm.hss}</Text>
                </View>
                <Divider style={{ backgroundColor: "black" }}/>
                <View style={styles.itemPressable}>
                    <Text style={styles.itemText}>SFM - carbure</Text>
                    <Text style={styles.itemText}>{sfm.carbide}</Text>
                </View>
                <Divider style={{ backgroundColor: "black" }}/>
                <View style={styles.itemPressable}>
                    <Text style={styles.itemText}>Mètre/min. - HSS</Text>
                    <Text style={styles.itemText}>{sfm.hss * 0.3048}</Text>
                </View>
                <Divider style={{ backgroundColor: "black" }}/>
                <View style={styles.itemPressable}>
                    <Text style={styles.itemText}>Mètre/min. - carbure</Text>
                    <Text style={styles.itemText}>{sfm.carbide * 0.3048}</Text>
                </View>
            </ScrollView>
                
            }
        </>
    );
}

const styles = StyleSheet.create({
    materialEditContainer: {
        flex: 1,
        backgroundColor: '#ededed',
        paddingTop: 10
    },
    itemPressable: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
    subTitleText: {
        fontSize: 21,
        padding: 15
    },
    itemText: {
        fontSize: 16
    },
    textInput: {
        fontSize: 16
    }
  });
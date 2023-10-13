import { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, BackHandler, Alert} from 'react-native';
import { Divider } from 'react-native-paper';
import { TextInput } from '../components/TextInput';
import { Feather, Ionicons } from '@expo/vector-icons';
import AppDataContext from "../contexts/AppDataContext";


export default function MaterialDetails({ navigation, route }) {
    const { setData } = useContext(AppDataContext);

    const [label, setLabel] = useState(route.params.material.label);
    const [sfm, setsfm] = useState({ 
        hss: route.params.material.sfm.hss,
        carbide: route.params.material.sfm.carbide
    });
    const [changeMade, setChangeMade] = useState(false);

    const labelInputRef = useRef(null);
    const sfmHSSInputRef = useRef(null);
    const sfmCarbideInputRef = useRef(null);

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
        if(text.length >= 1) {
            setChangeMade(true);
        }
        else {
            setChangeMade(false);
        }
    }

    function handleSfmHSSChange(text) {
        setChangeMade(true);
        if(!isNaN(+text) && text.length < 10) {
            setsfm((previoussfm) => ({...previoussfm, hss: text}));
        }
    }

    function handleSfmCarbideChange(text) {
        setChangeMade(true);
        if(!isNaN(+text) && text.length < 10) {
            setsfm((previoussfm) => ({...previoussfm, carbide: text}));
        }
    }

    function saveChanges() {
        setData((previousData) => {
            let newData = [...previousData];
            let newLabel = label.length >= 1 ? label : "Sans nom";
            if(route.params.newMaterial) {
                newData.push({ label: newLabel, sfm });
            }
            else {
                newData[route.params.index] = { label: newLabel, sfm };
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
                        />
                    </Pressable>
                    <Divider style={{ backgroundColor: "black" }}/>
                    <Pressable style={styles.itemPressable} onPress={() => sfmHSSInputRef.current.focus()}>
                        <Text style={styles.itemText}>SFM (HSS)</Text>
                        <TextInput 
                            ref={sfmHSSInputRef}
                            keyboardType={"numeric"}
                            style={styles.textInput}
                            value={sfm.hss.toString()}
                            onChangeText={(text) => handleSfmHSSChange(text)}
                            placeholder="Entrez une valeur"
                            textAlign="right"
                        />
                    </Pressable>
                    <Divider style={{ backgroundColor: "black" }}/>
                    <Pressable style={styles.itemPressable} onPress={() => sfmCarbideInputRef.current.focus()}>
                        <Text style={styles.itemText}>SFM (carbure)</Text>
                        <TextInput 
                            ref={sfmCarbideInputRef}
                            keyboardType={"numeric"}
                            style={styles.textInput}
                            value={sfm.carbide.toString()}
                            onChangeText={(text) => handleSfmCarbideChange(text)}
                            placeholder="Entrez une valeur"
                            textAlign="right"
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
                    <Text style={styles.itemText}>SFM (HSS)</Text>
                    <Text style={styles.itemText}>{sfm.hss}</Text>
                </View>
                <Divider style={{ backgroundColor: "black" }}/>
                <View style={styles.itemPressable}>
                    <Text style={styles.itemText}>SFM (carbure)</Text>
                    <Text style={styles.itemText}>{sfm.carbide}</Text>
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
    itemText: {
        fontSize: 19
    },
    textInput: {
        fontSize: 19
    }
  });
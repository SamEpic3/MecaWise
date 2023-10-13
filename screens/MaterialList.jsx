import { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Divider, List } from "react-native-paper";
import { defaultMaterialOptions } from "../utils/defaultCuttingSpeeds";
import AppDataContext from '../contexts/AppDataContext';

export default function MaterialList({ navigation, route }) {
    const { data, setData } = useContext(AppDataContext);

    function handleItemPress(material) {
        navigation.navigate({
            name: "cuttingSpeed", 
            params: { selectedMaterial: material },
            merge: true
        });
    }

    function handleItemLongPress(material, customMaterial, index) {
        navigation.navigate({
            name: "materialDetails", 
            params: { material, customMaterial, index }
        });
    }

    function addMaterial() {
        navigation.navigate({
            name: "materialDetails", 
            params: { 
                material: {label: "", sfm: {hss: "", carbide: ""}}, 
                customMaterial: true,
                newMaterial: true 
            }
        });
    }

    return (
        <ScrollView contentContainerStyle={styles.materialListContainer}>
            <List.Section style={styles.listStyle}>
                <List.Subheader style={styles.listSubheader}>Matériaux par défaut</List.Subheader>
                {defaultMaterialOptions.map((item, index) => 
                    <Pressable 
                        onPress={() => handleItemPress(item)} 
                        onLongPress={() => handleItemLongPress(item, false)}
                        key={item.value}
                        android_ripple={{ color: "#bbb"}}
                    >
                        {index == 0 ? <Divider style={{ backgroundColor: "black" }} /> : null}
                        <List.Item
                            title={item.label}
                        />
                        <Divider style={{ backgroundColor: "black" }} />
                    </Pressable>
                )}
            </List.Section>
            <List.Section style={styles.listStyle}>
                <List.Subheader style={styles.listSubheader}>Matériaux personnalisés</List.Subheader>
                {data != undefined && data.map((item, index) => 
                    <Pressable 
                        onPress={() => handleItemPress(item)}
                        onLongPress={() => handleItemLongPress(item, true, index)}
                        key={index}
                        android_ripple={{ color: "#bbb"}}
                    >
                        {index == 0 ? <Divider style={{ backgroundColor: "black" }} /> : null}
                        <List.Item
                            title={item.label}
                        />
                        <Divider style={{ backgroundColor: "black" }} />
                    </Pressable>
                )}
                <Pressable
                    onPress={() => addMaterial()}
                    android_ripple={{ color: "#bbb"}}
                >
                    <List.Item
                        title={"Ajouter un matériau"}
                    />
                </Pressable>
            </List.Section>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    materialListContainer: {
        flex: 1,
        backgroundColor: '#ededed',
        paddingTop: 10
    },
    listStyle: {
        width: "100%"
    },
    listSubheader: {
        fontSize: 21
    }
  });
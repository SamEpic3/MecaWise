import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

export function ExpandableCard(props) {

    const [isExpanded, setIsExpanded] = useState(false);

    function toggle() {
        setIsExpanded(previousState => !previousState);
    }
    
    return (
        <View style={[styles.mainView, props?.style]}>
            <Pressable style={props?.topViewStyle} onPress={() => toggle()}>
                {props?.topContent}
                <View style={styles.caret}>
                {isExpanded ? 
                    <Feather name="chevron-up" size={24} color="black" /> :
                    <Feather name="chevron-down" size={24} color="black" />}
                </View>
            </Pressable>
            {isExpanded && 
                <View style={props?.bottomViewStyle}>
                    {props?.children}
                </View>
            }
        </View>
    );
        
}

const styles = StyleSheet.create({
    mainView: {
        overflow: "hidden"
    },
    caret: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        paddingRight: 10
    }
});
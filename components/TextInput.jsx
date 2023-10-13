import { forwardRef, useEffect, useRef } from "react";
import { TextInput as RNTextInput, Keyboard } from "react-native";

export const TextInput = forwardRef(function TextInput(props, parentRef) {
        const localInputRef = parentRef ? parentRef : useRef();
        
        const keyboardDidHideCallback = () => {
            localInputRef.current.blur?.();   
        }
        
        useEffect(() => {
            const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHideCallback);
            
            return () => {
                keyboardDidHideSubscription?.remove();
            };
        }, []);
        
        return (
            <RNTextInput
                ref={localInputRef}
                {...props}
            />
        );
        
}
)
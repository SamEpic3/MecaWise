import { Fragment } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { ExpandableCard } from "../components/ExpandableCard";
import { Divider } from "react-native-paper";

export const HelpScrollView = ({ helpData }) => {
    return (
        <ScrollView contentContainerStyle={styles.helpScrollView}>
            {helpData.map((item, index) => 
                <Fragment key={index}>
                    <ExpandableCard
                        style={styles.expandableCardStyle}
                        topViewStyle={styles.expandableCardTopViewStyle}
                        bottomViewStyle={styles.expandableCardBottomViewStyle}
                        topContent={<Text style={styles.titleStyle}>{item.title}</Text>}
                    >
                        <Text style={styles.descriptiveTextStyle} selectable>
                            {item.text}
                        </Text>
                    </ExpandableCard>
                    <Divider bold={true}/>
                </Fragment>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    helpScrollView: {
        height: "100%",
        backgroundColor: '#ededed',
        paddingTop: 10
    },
    expandableCardStyle: {
        width: "100%",
        paddingHorizontal: 10
    },
    expandableCardTopViewStyle: {
        paddingVertical: 10
    },
    expandableCardBottomViewStyle: {
        paddingBottom: 10
    },
    titleStyle: {
        fontSize: 20
    },
    descriptiveTextStyle: {
        fontSize: 16
    }
  });
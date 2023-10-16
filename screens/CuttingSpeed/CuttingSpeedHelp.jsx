import { Fragment } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { ExpandableCard } from "../../components/ExpandableCard";
import { Divider } from "react-native-paper";

export default function CuttingSpeedHelp() {

    const helpData = [
        {
            title: "Calcul d'un rpm",
            text: "Pour calculer un rpm avec l'application, c'est simple. Sélectionnez le matériau que vous utilisez, l'outil avec lequel vous " +
            "coupez, l'unité de mesure de votre outil et entrez le diamètre dans la dernière case et le rpm calculé apparaîtra."
        },
        {
            title: "Détails d'un matériau",
            text: "Pour accéder aux détails d'un matériau, maintenez le doigt enfoncé sur celui-ci dans la liste de matériaux. " +
            "Vous verrez son nom ainsi que les vitesses de coupe pour un outil carbure et pour un outil HSS."
        },
        {
            title: "Ajout d'un matériau",
            text: "Pour ajouter un matériau, cliquez sur \"Ajouter un matériau\" dans la liste de matériaux, sous \"Matériaux personnalisés\". " +
            "Entrez un nom et les valeurs de vitesse de coupe pour votre matériau dans l'unité que vous voulez. " + 
            "La valeur de l'autre unité se calculera automatiquement. Appuyez sur le crochet en haut à droite pour sauvegarder."
        },
        {
            title: "Suppression d'un matériau",
            text: "Pour supprimer un matériau, cliquez sur l'icône de poubelle en haut à droite lorsque vous êtes dans la page de détails du matériau."
        },
        {
            title: "RPM",
            text: "Une révolution par minute (rpm) est une unité de mesure pour exprimer une vitesse de rotation. Un outil qui tourne à 1000 rpm " +
            "fera 1000 tours par minute."
        },
        {
            title: "Vitesse linéaire",
            text: "SFM est surtout utilisé en Amérique du nord et signifie \"surface feet per minute\". Il représente la vitesse maximum en pieds par minute " +
            "à laquelle un outil donné peut travailler sur un matériau donné sans surchauffer. On peut utiliser cette valeur avec un diamètre pour calculer le rpm. " +
            "Il est aussi possible d'entrer cette valeur en mètre/minute dans l'application."
        },
        {
            title: "Comment est calculé le rpm?",
            text: "Si le diamètre donné est en pouce, la formule pour calculer le rpm est la suivante : \n\n(12 * SFM) / (π * diamètre)\n\n" +
            "En millimètres, la formule est la suivante : \n\n(1000 * m/min) / (π * diamètre)"
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.cuttingSpeedHelpContainer}>
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
    cuttingSpeedHelpContainer: {
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
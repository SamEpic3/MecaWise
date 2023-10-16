import { HelpScrollView } from "../../components/HelpScrollView";

export default function ConversionHelp() {

    const helpData = [
        {
            title: "À quoi ça sert?",
            text: "Avec la conversion de signaux, vous pouvez convertir un signal en un autre en gardant les mêmes proportions. " +
            "Par exemple, si vous avez un thermocouple relié a un transmetteur qui converti la température lue par le thermocouple en " +
            "signal 4 à 20 mA, vous pouvez reconvertir ce signal en température. Vous pouvez vérifier si le transmetteur et le thermocouple fonctionne bien " + 
            "en comparant la température calculée et la température réelle avec un autre instrument de mesure."
        },
        {
            title: "Comment ça fonctionne?",
            text: "Dans l'application, il y a 4 valeurs à entrer avant de pouvoir réaliser une conversion. Il vous faut entrer les valeurs minimum " +
            "et maximum de chaque plage de données. Par exemple, on peut entrer respectivement 4 et 20 dans Min. X et Max. X si on a un signal variant " +
            "de 4 à 20 mA. Dans Min. Y et Max. Y, c'est la même chose, mais pour l'autre signal. Si vous voulez convertir le signal d'un transmetteur de " +
            "température par exemple, ce pourrait être des valeurs comme -200 à 1200 °C. Si vous ne connaissez pas ces valeurs, vous devriez les trouver " +
            "sur le transmetteur lui-même ou dans son manuel d'utilisation. Après avoir entré ces 4 valeurs, une fonction affine apparaîtra, dans le format " + 
            "y = ax + b. Vous pouvez vous servir de cette fonction pour faire vos calculs ou calculer avec l'application. Entrez une valeur en mA dans la case X " +
            "pour faire apparaître la valeur en température dans la case Y. Vous pouvez également entrer une valeur en température dans la case Y pour connaître " +
            "la valeur en mA dans la case X."
        }
    ];

    return (
        <HelpScrollView helpData={helpData}/>
    );
}
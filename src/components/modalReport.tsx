import { View, Text } from "react-native";
import React from "react";
import Modal from "./modal";
import { RadioButton } from "react-native-paper";
import tw from "../lib/tailwind";
import Button from "./button";

interface ModalReportProps {
    visible: boolean;
    onClose: () => void;
}

const ModalReport: React.FC<ModalReportProps> = ({ visible, onClose }) => {
    const [value, setValue] = React.useState<string>("");
    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Denunciar vendedor"
            subtitle="Por que você está denunciando este vendedor?"
        >
            <View style={tw`flex-row items-center justify-between py-2`}>
                <Text style={tw`font-medium text-grayscale-100 text-base`}>
                    Spam
                </Text>
                <RadioButton
                    value="spam"
                    status={value === "spam" ? "checked" : "unchecked"}
                    onPress={() => setValue("spam")}
                    color="#fbfcff"
                />
            </View>
            <View style={tw`flex-row items-center justify-between py-2`}>
                <Text style={tw`font-medium text-grayscale-100 text-base`}>
                    Fraude ou Golpe
                </Text>
                <RadioButton
                    value="fraude"
                    status={value === "fraude" ? "checked" : "unchecked"}
                    onPress={() => setValue("fraude")}
                    color="#fbfcff"
                />
            </View>
            <View style={tw`flex-row items-center justify-between py-2`}>
                <Text style={tw`font-medium text-grayscale-100 text-base`}>
                    Conteúdo inapropriado
                </Text>
                <RadioButton
                    value="inapropriado"
                    status={value === "inapropriado" ? "checked" : "unchecked"}
                    onPress={() => setValue("inapropriado")}
                    color="#fbfcff"
                />
            </View>
            <View style={tw`flex-row items-center justify-between py-2`}>
                <Text style={tw`font-medium text-grayscale-100 text-base`}>
                    Outro
                </Text>
                <RadioButton
                    value="other"
                    status={value === "other" ? "checked" : "unchecked"}
                    onPress={() => setValue("other")}
                    color="#fbfcff"
                />
            </View>

            <View style={tw`flex-row items-center gap-x-3 mt-5`}>
                <Button title="Cancelar" onPress={onClose} />
                <Button
                    title="Denunciar"
                    onPress={() => console.log("Vendedor denunciado.")}
                />
            </View>
        </Modal>
    );
};

export default ModalReport;

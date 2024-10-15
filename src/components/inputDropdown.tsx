import { View, Text } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import RNPickerSelect from "react-native-picker-select";
import { Feather } from "@expo/vector-icons";

interface InputDropdownProps {
    valuePlaceholder: string;
    options: { label: string; value: string | number | null }[];
    onValueChange: (value: number | undefined) => void;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
    valuePlaceholder,
    options,
    onValueChange,
}) => {
    return (
        <View style={tw`mb-4`}>
            <RNPickerSelect
                onValueChange={onValueChange}
                items={options}
                style={{
                    inputIOS: {
                        ...tw`w-full border p-3 rounded-lg bg-transparent text-base border-grayscale-60 text-grayscale-60`,
                        paddingRight: 30,
                        textAlignVertical: "center",
                    },
                    inputAndroid: {
                        ...tw`w-full border p-3 rounded-lg bg-transparent text-base border-grayscale-60 text-grayscale-60`,
                        paddingRight: 30,
                        textAlignVertical: "center",
                    },
                }}
                placeholder={{
                    label: valuePlaceholder,
                    value: null,
                }}
                Icon={() => (
                    <View style={tw`absolute right-3 top-4`}>
                        <Feather name="chevron-down" size={20} color="gray" />
                    </View>
                )}
            />
        </View>
    );
};

export default InputDropdown;

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from "@expo/vector-icons";

interface InputDataProps {
    valuePlaceholder: string;
    onValueChange: (date: Date | undefined) => void;
}

const InputData: React.FC<InputDataProps> = ({
    valuePlaceholder,
    onValueChange,
}) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        onValueChange(currentDate);
    };

    return (
        <View style={tw`mb-4`}>
            <TouchableOpacity onPress={() => setShow(true)} style={tw`w-full border p-3 rounded-lg bg-transparent text-base border-grayscale-60 text-grayscale-60`}>
                <Text style={tw`text-grayscale-60`}>
                    {date ? date.toLocaleDateString() : valuePlaceholder}
                </Text>
                <View style={tw`absolute right-3 top-4`}>
                    <Feather name="chevron-down" size={20} color="gray" />
                </View>
            </TouchableOpacity>
            
            {show && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default InputData;

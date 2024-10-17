import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";

interface InputDataProps {
    valuePlaceholder: string;
    onValueChange: (date: Date | undefined | null) => void;
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
        <View>
            <TouchableOpacity
                onPress={() => setShow(true)}
                style={tw`w-full border p-3 rounded-lg bg-transparent text-base border-grayscale-60 text-grayscale-60 flex-row items-center justify-between`}
            >
                <View style={tw`flex-row items-center`}>
                    <Feather
                        name="calendar"
                        size={20}
                        color="gray"
                        style={tw`mr-2`}
                    />
                    <Text style={tw`text-grayscale-60 text-base`}>
                        {date ? date.toLocaleDateString() : valuePlaceholder}
                    </Text>
                </View>
                <Feather name="chevron-down" size={20} color="gray" />
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

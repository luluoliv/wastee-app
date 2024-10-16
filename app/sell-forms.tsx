import { View, Text, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import tw from "@/src/lib/tailwind";

import Header from "@/src/components/header";
import Input from "@/src/components/input";
import Button from "@/src/components/button";

import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import InputData from "@/src/components/inputData";

const SellForm = () => {
  const [selectedRG, setSelectedRG] = useState<string | null>(null);
  const [selectedSelfie, setSelectedSelfie] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const pickImage = async (type: "RG" | "Selfie") => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permissão para acessar galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      if (type === "RG") {
        setSelectedRG(imageUri);
      } else {
        setSelectedSelfie(imageUri);
      }
    }
  };

  const removeImage = (type: "RG" | "Selfie") => {
    if (type === "RG") {
      setSelectedRG(null);
    } else {
      setSelectedSelfie(null);
    }
  };

  return (
    <View style={tw`w-full flex-1 pt-10 px-3 gap-y-5 bg-grayscale-20`}>
      <Header
        title="Se torne um vendedor"
        titleStyle={tw`text-grayscale-100`}
        moreIconName=""
      />

      <Text style={tw`font-medium text-grayscale-100 text-xl`}>
        Identificação Fiscal
      </Text>
      <View>
        <Controller
          control={control}
          name="CPF"
          render={({ field }) => (
            <Input name="CPF" control={control} label="CPF" />
          )}
        />
        <InputData  />
      </View>

      <Text style={tw`font-medium text-grayscale-100 text-xl`}>
        Documento de identidade
      </Text>

      <Button
        title="Frente e verso (RG)"
        style={tw`bg-grayscale-40`}
        textStyle={tw`text-grayscale-100`}
        onPress={() => pickImage("RG")}
      />
      {selectedRG && (
        <View style={tw`flex flex-row items-center gap-x-2`}>
          <Image
            source={{ uri: selectedRG }}
            style={tw`w-12 h-12 rounded-xl`}
          />
          <View style={tw`flex-1`}>
            <Text style={tw`text-grayscale-100 font-semibold text-base`}>
              RG selecionado
            </Text>
            <Text style={tw`text-grayscale-60 font-normal text-base`}>
              RG selecionado
            </Text>
          </View>

          <TouchableOpacity style={tw`ml-2`} onPress={() => removeImage("RG")}>
            <Feather name="x-circle" size={16} color="grey" />
          </TouchableOpacity>
        </View>
      )}

      <Button
        title="Selfie com o documento"
        style={tw`bg-grayscale-40`}
        textStyle={tw`text-grayscale-100`}
        onPress={() => pickImage("Selfie")}
      />
      {selectedSelfie && (
        <View style={tw`flex flex-row items-center gap-x-2`}>
          <Image
            source={{ uri: selectedSelfie }}
            style={tw`w-12 h-12 rounded-xl`}
          />
          <View style={tw`flex-1`}>
            <Text style={tw`text-grayscale-100 font-semibold text-base`}>
              RG selecionado
            </Text>
            <Text style={tw`text-grayscale-60 font-normal text-base`}>
              RG selecionado
            </Text>
          </View>

          <TouchableOpacity style={tw`ml-2`} onPress={() => removeImage("Selfie")}>
            <Feather name="x-circle" size={16} color="grey" />
          </TouchableOpacity>
        </View>
      )}

      <Button
        title="Continuar"
        style={tw`bg-grayscale-100 mt-5`}
        textStyle={tw`text-grayscale-20`}
      />
    </View>
  );
};

export default SellForm;

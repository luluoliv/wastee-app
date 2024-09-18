import React from "react";
import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { RadioButton } from "react-native-paper";
import tw from "../lib/tailwind";
import Modal from "./modal";
import Button from "./button";
import Input from "./input";

interface ModalReportProps {
  visible: boolean;
  onClose: () => void;
}

const ModalReport: React.FC<ModalReportProps> = ({ visible, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data: any) => {
    console.log(
      "Vendedor denunciado:",
      data.reason === "other" ? data.otherReason : data.reason
    );
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Denunciar vendedor"
      subtitle="Por que você está denunciando este vendedor?"
    >
      {["spam", "fraude", "inapropriado", "other"].map((reason) => (
        <View
          key={reason}
          style={tw`flex-row items-center justify-between py-2`}
        >
          <Text style={tw`font-medium text-grayscale-100 text-base`}>
            {reason === "spam"
              ? "Spam"
              : reason === "fraude"
              ? "Fraude ou Golpe"
              : reason === "inapropriado"
              ? "Conteúdo inapropriado"
              : "Outro"}
          </Text>
          <Controller
            control={control}
            name="reason"
            render={({ field: { onChange, value } }) => (
              <RadioButton
                value={reason}
                status={value === reason ? "checked" : "unchecked"}
                onPress={() => {
                  onChange(reason);
                  if (reason !== "other") {
                    setValue("otherReason", "");
                  }
                }}
                color="#fbfcff"
              />
            )}
          />
        </View>
      ))}


      <Controller
        control={control}
        name="otherReason"
        render={({ field }) => (
          <View style={tw`mt-2`}>
            <Input
              label="Nos conte mais"
              control={control}
              error={errors?.otherReason?.message}
              style={tw`border border-grayscale-60 p-2 rounded`}
              {...field}
            />
            <Text style={tw`text-sm text-grayscale-60 font-medium`}>Opcional</Text>
          </View>
        )}
      />

      <View
        style={tw`w-full flex-row items-center justify-between gap-x-3 mt-5`}  
      >
        <Button
          title="Cancelar"
          onPress={onClose}
          style={tw`flex-1 bg-transparent border border-grayscale-60`}
          textStyle={tw`text-grayscale-100`}
        />
        <Button
          title="Denunciar"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          style={tw`flex-1 bg-grayscale-100`}
          textStyle={tw`text-grayscale-20`}
        />
      </View>
    </Modal>
  );
};

export default ModalReport;

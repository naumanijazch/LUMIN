import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { TextInput } from "react-native";
import { useRef } from "react";

type OTPInputProps = {
  length: number;
  code: Array<string>;
  setCode: (code: Array<string>) => void;
};

const Otp = ({ length, code, setCode }: OTPInputProps) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const onChangeValue = (text: string, index: number) => {
    const tempCode = [...code];
    tempCode[index] = text;
    setCode(tempCode);
  };

  const handleChange = (text: string, index: number) => {
    onChangeValue(text, index);

    if (text.length !== 0) {
      return inputRefs.current[index + 1]?.focus();
    }
    return inputRefs?.current[index - 1]?.focus();
  };

  const handleBackspace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const { nativeEvent } = event;

    if (nativeEvent.key === "Backspace") {
      handleChange("", index);
    }
  };

  return (
    <View style={{ display: "flex", flexDirection: "row", marginVertical: 20 }}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            ref={(el) => {
              if (el && !inputRefs.current.includes(el)) {
                inputRefs.current = [...inputRefs.current, el];
              }
            }}
            key={index}
            style={{
              height: 40,
              width: 40,
              borderColor: "#35C2C1",
              borderBottomWidth: 1,
              margin: 5,
              borderRadius: 5,
              textAlign: "center",
              color: "#fff",
              fontSize: 25,
            }}
            maxLength={1}
            contextMenuHidden
            selectTextOnFocus
            testID={`OTPinput-${index}`}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleBackspace(event, index)}
          />
        ))}
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({});

import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

interface OTPInputProps {
  length?: number;
  onOtpComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onOtpComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return; // Prevent pasting multiple characters

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus to the next field if input is entered
    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Call the OTP complete function when all fields are filled
    if (newOtp.join("").length === length) {
      onOtpComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous field when backspace is pressed
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputsRef.current[index] = el!)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={otp[index]}
          onChangeText={(text) => handleChange(text, index)}
        //   onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#333",
    textAlign: "center",
    fontSize: 18,
    margin: 5,
    borderRadius: 5,
  },
});

export default OTPInput;

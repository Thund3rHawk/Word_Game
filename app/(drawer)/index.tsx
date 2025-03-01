import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { alphabets, Word } from "@/constants";
import OTPInput from "@/components/otpInput";

export default function index() {
  const [words, setWords] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [singleWord, setSingleWord] = useState<string>();
  const [point, setPoint] = useState(0);

  const wordSet = new Set(Word);

  function getRandomLetters(
    length: number,
    word: string,
    wordlength: number
  ): string[] {
    let result: string[] = [];
    let random: string[] = [];

    for (let i = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * alphabets.length);
      result.push(alphabets[randomIndex]);
    }

    for (let i = 1; i < wordlength; i++) {
      result.push(word[i]);
    }

    while (result.length) {
      const randomIndex: number = Math.floor(Math.random() * result.length);
      random.push(result.splice(randomIndex, 1)[0]);
    }
    return random;
  }

  useEffect(() => {
    function generateKeyBoard() {
      const random =
        Array.from(wordSet)[Math.floor(Math.random() * wordSet.size)];
      setSingleWord(random[0]);
      setWords(getRandomLetters(8 - random.length + 1, random, random.length));
      setText("");
    }
    
    generateKeyBoard();
    const timer = setTimeout(() => {
      Alert.alert("Time's up!", `Your score is ${point}`);
      setPoint(0);
      setText("")
      generateKeyBoard();
    }, 10000);

    return () => clearTimeout(timer);
  }, [point]);


  useEffect(() => {
    if (wordSet.has(singleWord + text)) {
      setPoint(point + 1);
      setText("");
    }
  }, [text]);

  return (
    <View style={styles.container}>
      <View style={styles.pointView}>
        <Text> Point: {point}</Text>
      </View>

      <Text>
        {singleWord}
        {text}
      </Text>

      <View style={styles.buttonClass}>
        {words.map((items, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.keys}
              onPress={() => setText(text + items)}
            >
              <Text style={styles.buttonText}>{items}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keys: {
    width: "23%", // Slightly less than 25% to allow for margins
    aspectRatio: 1, // Keeps the item square (optional)
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
  },
  buttonClass: {
    paddingHorizontal: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    bottom: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 600,
    margin: 0,
    padding: 0,
  },
  pointView: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

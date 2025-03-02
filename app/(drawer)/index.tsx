import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { alphabets, Word } from '@/constants';

export default function index() {
  const [words, setWords] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [successfulWords, setSuccessfullWords] = useState<string[]>([]);
  const [timer, setTimer] = useState(60);
  const [singleWord, setSingleWord] = useState<string>();
  const [point, setPoint] = useState(0);

  const wordSet = new Set(Word);

  function getRandomLetters(
    length: number,
    word: string,
    wordlength: number,
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
      setText('');
    }

    generateKeyBoard();
    setTimer(60);
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(countdown);
          Alert.alert("Time's up!", `Your score is ${point}`);
          setPoint(0);
          setText('');
          setSuccessfullWords([]);
          generateKeyBoard();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [point]);

  useEffect(() => {
    if (wordSet.has(singleWord + text)) {
      setSuccessfullWords(prevWords => {
        const newWords = [...prevWords, singleWord + text];
        return newWords.length > 9 ? newWords.slice(-9) : newWords;
      });
      setPoint(point + 1);
      setText('');
    }
  }, [text]);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Points: {point}</Text>
        <Text style={styles.scoreText}>Time: {timer}</Text>
      </View>

      <View style={styles.successWordsContainer}>
        {successfulWords.map((item, index) => (
          <View key={index}>
            <Text style={styles.successWordText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>
            {singleWord}
            {text}
          </Text>
        </View>

        <View style={styles.keyboardContainer}>
          {words.map((items, index) => (
            <TouchableOpacity
              key={index}
              style={styles.keyButton}
              onPress={() => setText(text + items)}
            >
              <Text style={styles.keyText}>{items}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            setText('');
          }}
        >
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFFE4',
    alignItems: 'center',
  },

  scoreContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f8f9fa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3d5afe',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreText: {
    color: '#3d5afe',
    fontWeight: '700',
    fontSize: 16,
  },

  successWordsContainer: {
    position: 'absolute',
    top: 80,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    height: 370,
    overflow: 'hidden',
  },
  // successWordBadge: {
  //   backgroundColor: '#A3D1C6',
  //   borderRadius: 15,
  //   // borderWidth: 1,
  //   // borderColor: '#3D8D7A',
  //   paddingVertical: 6,
  //   paddingHorizontal: 12,
  //   marginVertical: 4,
  //   width: '60%',
  //   alignItems: 'center',
  // },
  successWordText: {
    color: '#00879E',
    fontSize: 22,
    paddingVertical: 6,
    fontWeight: '500',
  },

  bottomSection: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
  },
  inputText: {
    color: '#3D8D7A',
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 10,
  },
  backspaceButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6eaff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3d5afe',
  },
  backspaceText: {
    color: '#3d5afe',
    fontSize: 22,
    fontWeight: '700',
  },

  // Keyboard styling
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  keyButton: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#B3D8A8',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3D8D7A',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  keyText: {
    color: '#2C3930',
    fontSize: 22,
    fontWeight: '700',
  },
  clearBtn: {
    width: '80%',
    borderColor: 'red',
    borderWidth: 2,
    marginTop: 0,
    borderRadius: 10,
  },
  clearText: {
    paddingVertical: 10,
    textAlign: 'center',
    color: 'red',
  },
});

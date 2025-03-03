import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { alphabets, Word } from '@/constants';

export default function index() {
  const [popupCard, setPopupCard] = useState(true);
  const [alertText, setAlertText] = useState<string>('');
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
    if (!popupCard) {
      function generateKeyBoard() {
        const random =
          Array.from(wordSet)[Math.floor(Math.random() * wordSet.size)];
        setSingleWord(random[0]);
        setWords(
          getRandomLetters(8 - random.length + 1, random, random.length),
        );
        setText('');
      }

      generateKeyBoard();
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(countdown);
            setAlertText(`Time's up! Your score is ${point}`);
            setPoint(0);
            setText('');
            setSuccessfullWords([]);
            setPopupCard(true);
            generateKeyBoard();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [point, popupCard]);

  useEffect(() => {
    if (wordSet.has(singleWord + text)) {
      setSuccessfullWords(prevWords => {
        const newWords = [...prevWords, singleWord + text];
        return newWords.length > 9 ? newWords.slice(-9) : newWords;
      });
      setTimer(timer + 2);
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

      {popupCard && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupCard}>
            <Text style={styles.popupTitle}>Game Instructions</Text>
            <View style={styles.divider} />

            <Text style={styles.alertMessage}>{alertText}</Text>

            <View style={styles.rulesContainer}>
              <Text style={styles.rulesTitle}>Game Rules:</Text>
              <View style={styles.bulletPoint}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.ruleText}>
                  Complete the word using the given letters
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.ruleText}>
                  Collect coins to purchase power-ups
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.ruleText}>
                  Avoid obstacles to maintain your health bar
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.ruleText}>
                  Time-limited challenges award bonus points
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setPopupCard(false)}
            >
              <Text style={styles.startButtonText}>Start Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFE8',
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
    borderColor: '#4CC9FE',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreText: {
    color: '#4CC9FE',
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

  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  keyButton: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#E1FFEE',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4CC9FE',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  keyText: {
    color: '#277BC0',
    fontSize: 22,
    fontWeight: '700',
  },
  clearBtn: {
    width: '80%',
    backgroundColor: '#FFE2E2',
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
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupCard: {
    width: '85%',
    backgroundColor: '#FFFECB',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  popupTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#09122C',
    textAlign: 'center',
    marginBottom: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#37AFE1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#37AFE1',
    marginBottom: 15,
  },
  alertMessage: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  rulesContainer: {
    backgroundColor: '#F5F4B3',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    textAlign: 'justify',
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontSize: 18,
    color: '#3498db',
    marginRight: 8,
    lineHeight: 24,
  },
  ruleText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    flex: 1,
  },
  startButton: {
    backgroundColor: '#4CC9FE',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function about (){
  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit placeat iste incidunt suscipit amet dignissimos, esse quibusdam autem non itaque aliquid possimus! Voluptate corporis id quam repellat provident atque eos! Earum natus adipisci similique ea quia alias excepturi iure molestiae. Sit, libero ipsam beatae deserunt unde maiores, reprehenderit nesciunt laborum ducimus saepe minima quos. Consequatur minima ea velit sequi voluptates consectetur labore iusto ullam inventore vero nesciunt eligendi impedit praesentium blanditiis officia nobis deserunt odio ducimus, ad minus. Sapiente alias quos voluptatem doloremque? Illum voluptate quidem consectetur dolore at labore ex pariatur inventore voluptas enim. Officia rerum magni fugit commodi!</Text>
    </View>
  )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        paddingHorizontal: 20,
        textAlign: 'justify'
    }
})
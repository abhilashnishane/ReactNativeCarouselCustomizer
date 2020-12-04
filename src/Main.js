import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

class Main extends Component {

  state = {
    searchText: '',
    carouselArray: [
      {
        img: './src/assets/ab.jpg',
        name: 'Image Name 1',
        desc: 'Image Description 1'
      },
      {
        img: './src/assets/ab.jpg',
        name: 'Image Name 2',
        desc: 'Image Description 2'
      },
      {
        img: './src/assets/ab.jpg',
        name: 'Image Name 3',
        desc: 'Image Description 3'
      },
      {
        img: './src/assets/ab.jpg',
        name: 'Image Name 4',
        desc: 'Image Description 4'
      }
    ]
  }

  _renderItem = ({ item, index }) => {

    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.img }} style={styles.img} />
        <View style={styles.imgCaptionContainer}>
          <Text>{item.name}</Text>
          <Text>{item.desc}</Text>
        </View>
      </View>
    );
  }

  onChangeText(value) {
    this.setState({ searchText: value });
  }



  render() {

    const sliderWidth = 350;
    const itemWidth = 300;

    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Knowello</Text>
        </View>
        <View style={styles.carouselContainer}>
          <Carousel
            containerCustomStyle={styles.carouselSelf}
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.state.carouselArray}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </View>

        <View>
          <View style={styles.searchBoxContainer}>
            <TextInput
              style={styles.searchBox}
              onChangeText={value => this.onChangeText(value)}
              value={this.state.searchText}
            />
          </View>

          <View>
            <Text>collection</Text>
          </View>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    height: 50,
    elevation: 10,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 18,
    paddingHorizontal: 8
  },
  carouselContainer: {
    alignItems: 'center',
    paddingVertical: 30
  },
  carouselSelf: {
    // backgroundColor: '#f5f5f5'
  },
  slide: {
    backgroundColor: '#e1e1e1',
    height: 380
  },
  img: {
    width: '100%',
    height: 300
  },
  imgCaptionContainer: {
    alignItems: 'center'
  },
  searchBoxContainer: {
    borderTopColor: '#cacaca',
    borderTopWidth: 1,
    borderBottomColor: '#cacaca',
    borderBottomWidth: 1,
  },
  searchBox: {
    height: 32,
    backgroundColor: '#e1e1e1',
    borderRadius: 100,
    marginHorizontal: 20,
    marginVertical: 4,
    width: '60%',
    paddingVertical: 0,
    paddingHorizontal: 8
  }
});

export default Main;
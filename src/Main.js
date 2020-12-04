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
import Draggable from 'react-native-draggable';

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
    ],
    collectionArray: [
      {
        img: './src/assets/big.jpg',
        name: 'Image Name 21',
        desc: 'Image Description 21'
      },
      {
        img: './src/assets/big.jpg',
        name: 'Image Name 22',
        desc: 'Image Description 22'
      },
      {
        img: './src/assets/big.jpg',
        name: 'Image Name 23',
        desc: 'Image Description 23'
      },
      {
        img: 'big.jpg',
        name: 'Image Name 24',
        desc: 'Image Description 24'
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

  dropOnCarousel(item, dragIndex) {

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

            <View style={styles.collectionContainer}>
              {
                this.state.collectionArray.map((item, index) => {
                  return (
                    <View key={item.name} style={{ marginTop: index > 0 ? 70 : 0 }}>
                      <Draggable onDragRelease={() => this.dropOnCarousel(item, index)}>
                        <View style={styles.collectionItem}>
                          <Image source={{ uri: item.img }} style={styles.imgthumb} />
                          <View>
                            <Text>{item.name}</Text>
                            <Text>{item.desc}</Text>
                          </View>
                        </View>
                      </Draggable>
                    </View>
                  )
                })
              }
            </View>

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
  },
  collectionContainer: {
    borderWidth: 1,
    borderColor: '#999',
    margin: 20,
    height: 180,
  },
  collectionItem: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#e1e1e1',
    padding: 10,
    borderRadius: 15
  },
  imgthumb: {
    width: 40,
    height: 40
  }
});

export default Main;
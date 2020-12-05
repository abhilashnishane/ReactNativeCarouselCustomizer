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
  TouchableOpacity,
  KeyboardAvoidingView
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
      },
      {
        img: './src/assets/ab.jpg',
        name: 'Image Name 5',
        desc: 'Image Description 5'
      },
      {
        img: './src/assets/ab.jpg',
        name: 'Image Name 6',
        desc: 'Image Description 6'
      },
      {
        img: './src/assets/ab.jpg',
        name: 'Image Name 7',
        desc: 'Image Description 7'
      },
      {
        img: './src/assets/ab.jpg',
        name: 'Image Name 8',
        desc: 'Image Description 8'
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
        <TouchableOpacity style={styles.deleteBtn} onPress={() => this.deleteCarouselItem(item, index)}><Text style={styles.deleteText}>x</Text></TouchableOpacity>
      </View>
    );
  }

  onChangeText(value) {
    this.setState({ searchText: value });
  }

  submitSearch(event) {
    console.log(event.nativeEvent.text);
    const searchText = event.nativeEvent.text;

    var bearer = 'Client-ID' + ' ' + 'FPc35COH1cdG_2eYN3wysGC-58bIvmru1n7BvjiPS4I';

    fetch('https://api.unsplash.com' + '/search/photos/?page=1&query=' + searchText, {
      method: "GET",
      headers: {
        'Authorization': bearer,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        // console.log(json.results[0].urls.small);

        const collectionArray = [];

        json.results.map((item, index) => {
          let obj = {
            img: item.urls.small,
            // img: item.urls.regular,
            name: 'Image Name 10' + index,
            desc: 'Image Description 10' + index
          };
          collectionArray.push(obj);
        });

        this.setState({ collectionArray });

      })
      .catch((error) => console.error(error))

  }

  dropOnCarousel(item, dragIndex) {
    // item -> item that has been dragged
    const elementsIndex = this._carousel.currentIndex;
    let newArray = [...this.state.carouselArray];
    // newArray[elementsIndex] = item;
    newArray.splice(elementsIndex, 0, item); // Add 'item' at index 'elementsIndex' in array 'newArray' (and delete '0' elements)

    let newCollectionArray = this.state.collectionArray;
    newCollectionArray.splice(dragIndex, 1);

    this.setState({
      carouselArray: newArray
    }, () => {

      this.setState({
        collectionArray: newCollectionArray
      });

    });

  }

  // dropOnCollections(item, dragIndex) {

  // }

  deleteCarouselItem(item, index) {
    // index -> index to delete from carousel
    console.log('hello');
    console.log(item, index);

    let newCarouselArray = [...this.state.carouselArray];
    newCarouselArray.splice(index, 1);
    this.setState({
      carouselArray: newCarouselArray
    });
  }

  componentDidMount() {

    var bearer = 'Client-ID' + ' ' + 'FPc35COH1cdG_2eYN3wysGC-58bIvmru1n7BvjiPS4I';

    fetch('https://api.unsplash.com' + '/photos', {
      method: "GET",
      headers: {
        'Authorization': bearer,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {

        const collectionArray = [];

        json.map((item, index) => {
          let obj = {
            img: item.urls.small,
            name: 'Image Name 20' + index,
            desc: 'Image Description 20' + index
          };
          collectionArray.push(obj);
        });

        this.setState({ collectionArray });

      })
      .catch((error) => console.error(error))

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

        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30} >
          <View style={{ backgroundColor: '#fff' }}>
            <View style={styles.searchBoxContainer}>
              <TextInput
                placeholder="search"
                style={styles.searchBox}
                onChangeText={value => this.onChangeText(value)}
                value={this.state.searchText}
                returnKeyType="search"
                // onSubmitEditing={({nativeEvent: {text, eventCount, target}}) => this.submitSearch({nativeEvent: {text, eventCount, target}})}
                onSubmitEditing={(event) => this.submitSearch(event)}
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
                            <View style={styles.itemDetails}>
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
        </KeyboardAvoidingView>

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
  deleteBtn: {
    position: 'absolute',
    right: 7,
    top: 7,
    backgroundColor: '#cacaca',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    opacity: 0.5
  },
  deleteText: {
    marginBottom: 4
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
    // maxHeight: 180,
    // overflow: 'scroll'
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
  },
  itemDetails: {
    marginLeft: 10
  }
});

export default Main;
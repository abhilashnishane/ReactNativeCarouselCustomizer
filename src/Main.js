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
    currentPage: 1,
    copiedCollectionItem: null,
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
    collectionArray: []
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

  dropOnCarousel(item) {
    // item -> item that has been dragged
    const elementsIndex = this._carousel.currentIndex;
    let newArray = [...this.state.carouselArray];
    // newArray[elementsIndex] = item;
    newArray.splice(elementsIndex, 0, item); // Add 'item' at index 'elementsIndex' in array 'newArray' (and delete '0' elements)

    this.setState({
      carouselArray: newArray
    }, () => {

      this.setState({
        copiedCollectionItem: null
      });

    });

  }


  collectionItemLongPress(item, dragIndex) {
    this.setState({ copiedCollectionItem: item });
  }

  createCopyOfCollectionItem(item) {
    return (
      <View style={{ paddingVertical: 20, position: 'absolute', left: 100, bottom: 65, zIndex: 100 }}>
        <Text style={{ width: 230 }}></Text>
        <Draggable onDragRelease={() => this.dropOnCarousel(item)}>
          <View style={[styles.collectionItem, styles.copiedCollectionItem]}>
            <Image source={{ uri: item.img }} style={styles.imgthumb} />
            <View style={styles.itemDetails}>
              <Text>{item.name}</Text>
              <Text>{item.desc}</Text>
            </View>
          </View>
        </Draggable>
      </View>
    )
  }

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

  gotoPrevPage() {
    const { searchText, currentPage } = this.state;
    const page = currentPage - 1;
    this.fetchPrevOrNextPage(searchText, page);
  }

  gotoNextPage() {
    const { searchText, currentPage } = this.state;
    const page = currentPage + 1;
    this.fetchPrevOrNextPage(searchText, page);
  }

  fetchPrevOrNextPage(searchText, page) {

    var bearer = 'Client-ID' + ' ' + 'FPc35COH1cdG_2eYN3wysGC-58bIvmru1n7BvjiPS4I';

    fetch('https://api.unsplash.com' + '/search/photos/?page=' + page + '&query=' + searchText, {
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

        json.results.map((item, index) => {
          let obj = {
            img: item.urls.small,
            // img: item.urls.regular,
            name: 'Image Name 10' + index,
            desc: 'Image Description 10' + index
          };
          collectionArray.push(obj);
        });

        this.setState({ collectionArray, currentPage: page });

      })
      .catch((error) => console.error(error))

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
      <ScrollView>
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

            {
              this.state.copiedCollectionItem
                ? this.createCopyOfCollectionItem(this.state.copiedCollectionItem)
                : null
            }

            <View style={styles.searchBoxContainer}>
              <TextInput
                placeholder="search"
                style={styles.searchBox}
                onChangeText={value => this.onChangeText(value)}
                value={this.state.searchText}
                returnKeyType="search"
                onSubmitEditing={(event) => this.submitSearch(event)}
              />
            </View>

            <View>

              <ScrollView horizontal style={styles.collectionContainer}>
                {
                  this.state.collectionArray.map((item, index) => {
                    return (
                      <View key={item.name}>
                        <View style={styles.draggablesSibling}></View>
                        <TouchableOpacity onLongPress={() => this.collectionItemLongPress(item, index)}>
                          <View style={styles.collectionItem}>
                            <Image source={{ uri: item.img }} style={styles.imgthumb} />
                            <View style={styles.itemDetails}>
                              <Text>{item.name}</Text>
                              <Text>{item.desc}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
              </ScrollView>

              <View style={styles.paginationContainer}>
                {
                  this.state.currentPage > 1
                    ?
                    <TouchableOpacity style={styles.navBtn} onPress={() => this.gotoPrevPage()}>
                      <Text>prev</Text>
                    </TouchableOpacity>
                    :
                    null
                }

                <TouchableOpacity style={styles.navBtn} onPress={() => this.gotoNextPage()}>
                  <Text>next</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </KeyboardAvoidingView>

      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca',
    height: 180
  },
  draggablesSibling: {
    width: 230
  },
  collectionItem: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#e1e1e1',
    padding: 10,
    borderRadius: 15
  },
  copiedCollectionItem: {
    margin: 0
  },
  imgthumb: {
    width: 40,
    height: 40
  },
  itemDetails: {
    marginLeft: 10
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  navBtn: {
    backgroundColor: '#e1e1e1',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 20
  }
});

export default Main;
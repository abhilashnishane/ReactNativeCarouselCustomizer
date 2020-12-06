import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');

export default class DragTest extends Component {
  constructor(props) {
    super(props);

    this.dataDrag = [1, 2, 3, 4],
      this.pan = this.dataDrag.map(() => new Animated.ValueXY());

    this.state = {
      showDraggable: true,
      dropZoneValues: null,
      entries: ['Apple1', 'Apple2', 'Apple3'],
      dataDrag: [...this.dataDrag],
      dataDragged: [],
    };
  }

  getPanResponder(index) {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderMove: Animated.event([null, {
        dx: this.pan[index].x,
        dy: this.pan[index].y
      }]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          let idx = this.state.dataDrag.indexOf(index + 1);
          this.setState({
            showDraggable: false,
            dataDrag: [...this.state.dataDrag.slice(0, idx), ...this.state.dataDrag.slice(idx + 1, this.state.dataDrag.length - 1)],
            dataDragged: [...this.state.dataDragged, this.state.dataDrag[idx]],
          });
        } else {
          Animated.spring(
            this.pan[index],
            { toValue: { x: 0, y: 0 } }
          ).start();
        }
      }
    });
  }

  isDropZone(gesture) {
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  setDropZoneValues(event) {
    this.setState({
      dropZoneValues: event.nativeEvent.layout
    });
  }

  _renderItem({ item, index }) {
    return (
      <View style={{ width: Dimensions.get('window').width - 100, height: 150, backgroundColor: 'red', marginLeft: 50, marginRight: 50 }}>
        <Text style={{ color: 'black', marginTop: 20 }}>{item}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        <ScrollView>
          <View onLayout={this.setDropZoneValues.bind(this)}
            style={[styles.dropZone, { marginTop: 10 }]}>
          </View>
          <View onLayout={this.setDropZoneValues.bind(this)}
            style={[styles.dropZone, { marginTop: 10 }]}>
          </View>
          <View onLayout={this.setDropZoneValues.bind(this)}
            style={[styles.dropZone, { marginTop: 10 }]}>
          </View>

          {this.state.dataDragged.map((d, index) => (
            <Animated.View
              key={d - 1}
              style={[styles.draggableContainer, this.pan[d - 1].getLayout(), styles.circle]}>
              <Text style={styles.text}>Drag {d - 1}</Text>
            </Animated.View>
          ))}

        </ScrollView>

        {this.state.dataDrag.map((d, index) => (
          <Animated.View
            key={d - 1}
            {...this.getPanResponder(d - 1).panHandlers}
            style={[styles.draggableContainer, this.pan[d - 1].getLayout(), styles.circle]}>
            <Text style={styles.text}>Drag {d - 1}</Text>
          </Animated.View>
        ))}



      </View>
    );
  }
}

let styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  dropZone: {
    height: 100,
    backgroundColor: '#2c3e50'
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff'
  },
  draggableContainer: {
    position: 'absolute',
    marginTop: Window.height / 2 - CIRCLE_RADIUS,
    marginLeft: Window.width / 2 - CIRCLE_RADIUS,
  },
  circle: {
    backgroundColor: '#1abc9c',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
});
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Animated, Dimensions, SafeAreaView } from 'react-native';

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height
var images = [
  { id: 1, src: require('./src/Images/manas.jpg'), name: 'Manas Devslopes', desc: "An iOS developer is responsible for developing applications for mobile devices powered by Apple's iOS operating system. iOS developers must also have a strong understanding of the patterns and practices that revolve around the iOS platform." },
  { id: 2, src: require('./src/Images/1.jpg'), name: 'Kanishk Devs', desc: 'A Web developer is a kind of programmer who specializes in the development of applications relating to the World Wide Web or distributed network applications, which typically run protocols like HTTP from a Web server to a client browser using associated programming languages like HTML/CSS,Javascript, nodeJs' },
  { id: 3, src: require('./src/Images/2.jpg'), name: 'Kalyani Di', desc: 'Designers create visual concepts, by hand or using computer software, to communicate ideas that inspire, inform, or captivate consumers. They develop the overall layout and production design for App, Games, Websites, etc.' },
  { id: 4, src: require('./src/Images/3.jpg'), name: 'Ketaki', desc: 'Human resources specialists are responsible for recruiting, screening, interviewing and placing workers. They may also handle employee relations, payroll, benefits, and training. Human resources managers plan, direct and coordinate the administrative functions of an organization.' },
  { id: 5, src: require('./src/Images/4.jpg'), name: 'Divya (Dabbu)', desc: 'Engineers, as practitioners of engineering, are professionals who invent, design, analyze, build, and test machines, systems, structures and materials to fulfill objectives and requirements while considering the limitations imposed by practicality, regulation, safety, and cost.' },
  { id: 6, src: require('./src/Images/5.jpg'), name: 'Anu Sista', desc: 'There are rare people who will show up at the right time, help you through the hard times and stay into your best times... those are the keepers.' },
  { id: 7, src: require('./src/Images/6.jpg'), name: 'Shikha Sista', desc: 'Sometimes we need someone to simply be there. Not to fix anything, or to do anything in particular, but just to let us feel that we are cared for and supported.' },
  { id: 8, src: require('./src/Images/7.jpg'), name: 'Steve Jobs', desc: 'Here’s to the crazy ones, the misfits, the rebels, the troublemakers, the round pegs in the square holes… the ones who see things differently — they’re not fond of rules… You can quote them, disagree with them, glorify or vilify them, but the only thing you can’t do is ignore them because they change things… they push the human race forward, and while some may see them as the crazy ones, we see genius, because the ones who are crazy enough to think that they can change the world, are the ones who do.' },
  { id: 9, src: require('./src/Images/8.jpg'), name: 'Mark Zukerberg', desc: "By giving people the power to share, we're making the world more transparent." },
  { id: 10, src: require('./src/Images/9.jpg'), name: 'Bill Gates', desc: 'I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.' },

]


export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      activeImage: null
    }
  }
  componentWillMount() {
    this.allImages = {}
    this.oldPosition = {}
    this.position = new Animated.ValueXY()
    this.dimensions = new Animated.ValueXY()
    this.animation = new Animated.Value(0)
    this.activeImageStyle = null
  }

  openImage = (index) => {

    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX
      this.oldPosition.y = pageY
      this.oldPosition.width = width
      this.oldPosition.height = height

      this.position.setValue({
        x: pageX,
        y: pageY
      })

      this.dimensions.setValue({
        x: width,
        y: height
      })

      this.setState({
        activeImage: images[index]
      }, () => {
        this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {

          Animated.parallel([
            Animated.timing(this.position.x, {
              toValue: dPageX,
              duration: 300
            }),
            Animated.timing(this.position.y, {
              toValue: dPageY,
              duration: 300
            }),
            Animated.timing(this.dimensions.x, {
              toValue: dWidth,
              duration: 300
            }),
            Animated.timing(this.dimensions.y, {
              toValue: dHeight,
              duration: 300
            }),
            Animated.timing(this.animation, {
              toValue: 1,
              duration: 300
            })
          ]).start()
        })
      })
    })
  }
  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 250
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 250
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 250
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 250
      })
    ]).start(() => {
      this.setState({
        activeImage: null
      })
    })
  }
  render() {

    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    }

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    })

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1]
    })
    const borderRadius = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [20, 40, 20]
    })

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [{
        translateY: animatedContentY
      }]
    }

    const animatedCrossOpacity = {
      opacity: this.animation
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {images.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => this.openImage(index)}
                key={item.id}>
                <Animated.View
                  style={{ height: SCREEN_HEIGHT - 150, width: SCREEN_WIDTH, padding: 15 }}
                >
                  <Image
                    ref={(image) => (this.allImages[index] = image)}
                    source={item.src}
                    style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            )
          })}
        </ScrollView>
        <View style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? "auto" : "none"}
        >
          <View style={{ flex: 2, zIndex: 1001, }} ref={(view) => (this.viewImage = view)}>
            <Animated.Image
              source={this.state.activeImage ? this.state.activeImage.src : null}
              style={[{ resizeMode: 'cover', top: 0, left: 0, height: null, width: null, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }, activeImageStyle]}
            >
            </Animated.Image>
            <TouchableWithoutFeedback onPress={() => this.closeImage()}>
              <Animated.View style={[{ position: 'absolute', top: 30, right: 30 }, animatedCrossOpacity]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>X</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View style={[{ flex: 1, zIndex: 1000, backgroundColor: 'white', padding: 20, paddingTop: 50 }, animatedContentStyle]}>
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>{this.state.activeImage ? this.state.activeImage.name : null}</Text>
            <Text>{this.state.activeImage ? this.state.activeImage.desc : null}</Text>
          </Animated.View>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
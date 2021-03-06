import * as React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Content, Card, CardItem, Body, Text } from 'native-base';
import axios from 'react-native-axios';
import Post from './components/posts/Post'


class Home extends React.Component {


  state = {
    Categories: []
  }


  componentDidMount = () => {
    axios.get("http://localhost:5001/api/categories")
      .then(response => this.setState({ Categories: response.data }))
      .catch(function (error) { console.log(error) })
  };


  render() {
    return (
      <>
        <Container>
          <Content>

            {
              this.state.Categories.map(c => <Card key={c.id}>
                <CardItem>
                  <Body>
                    <Button title={c.name}
                      onPress={() => {
                        this.props.navigation.navigate("Post", { 
                          id: c.id,
                          title: c.name
                        })
                      }}
                    />
                  </Body>
                </CardItem>
              </Card>
              )
            }
          </Content>
        </Container>
      </>
    )
  }
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
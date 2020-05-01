import * as React from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import axios from 'react-native-axios';
class Post extends React.Component {


    state = {
        Posts: []
    }


    componentDidMount = () => {

        const id = this.props.route.params.id;
        const title = this.props.route.params.title;


        axios.get("http://localhost:5001/api/posts/" + id)
            .then(response => this.setState({ Posts: response.data }))
            .catch(function (error) { console.log(error) })
        this.props.navigation.setOptions({ title: title })
    };


    render() {
        return (
            <>
                <Container>
                    <Content>
                        {

                            (this.state.Posts.postCategories && this.state.Posts.postCategories.length) > 0 ?
                                this.state.Posts.postCategories.map(p =>
                                    <Card key={p.postId}>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={{ uri: p.img }} />
                                                <Body>
                                                    <Text>{p.fullName}</Text>
                                                    <Text note>{p.content}</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem cardBody>
                                            <Image source={{ uri: p.img }} style={{ height: 200, width: null, flex: 1 }} />
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Button transparent>
                                                    <Icon active name="thumbs-up" />
                                                    <Text>12 Likes</Text>
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Button transparent>
                                                    <Icon active name="chatbubbles" />
                                                    <Text>4 Comments</Text>
                                                </Button>
                                            </Body>
                                            <Right>
                                                <Text>11h ago</Text>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                )
                                :

                                <View style={[styles.container, styles.horizontal]}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                        }

                    </Content>
                </Container>
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
export default Post;
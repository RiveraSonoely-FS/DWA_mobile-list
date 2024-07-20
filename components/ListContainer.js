import { StyleSheet, FlatList, View } from 'react-native'
import ListItem from './ListItem'

export default function ListContainer() {

    const DATA = [
        {
            id: '66934c472280dbe9bb208c0a',
            title: 'Jaws',
        },
        {
            id: '669b47301fdf96c7e5306253',
            title: 'The Shining',
        },
        {
            id: '669b47c21fdf96c7e530625e',
            title: 'Coraline',
        },
    ];

    const renderItem = ({ item }) => (
        <ListItem>{item.title}</ListItem>
    );

    return (
        <FlatList data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}/>
    );
}
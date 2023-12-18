import { Modal, View, Image, Text, ActivityIndicator } from "react-native"
import st from './styles'

const Loading = ({visiable, description}:{visiable: boolean, description?: string}) => {
    const styles = st();
    return (
        <Modal transparent visible={visiable} animationType="fade">
            <View style={styles.container}>
                <View style={styles.mainBlock}>
                    <Image source={require('../../../assets/appicon.png')} style={styles.img} />
                    <View style={styles.flr}>
                        <Text style={styles.mgr} >{description ? description : "Đang tải"}</Text>
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                </View>
            </View>
        </Modal>
    )
} 

export default Loading;
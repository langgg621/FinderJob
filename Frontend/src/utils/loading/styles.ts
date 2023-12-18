import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../Dimension";

const styles = () => {
    const st = StyleSheet.create({
        container: {width: SCREEN_WIDTH, height: SCREEN_HEIGHT, position: "absolute", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.6)"},
        mainBlock: { width: 230, height: 130,  borderRadius: 8, alignItems: "center", justifyContent: 'center'},
        img: {resizeMode: 'contain', height: 50, marginBottom: 10},
        flr: {flexDirection: "row", alignItems: 'center'},
        mgr: {marginRight: 8, fontSize: 14, fontWeight: '500'}
    })
    
    return st
}

export default styles
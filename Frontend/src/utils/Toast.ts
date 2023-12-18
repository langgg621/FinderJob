import Toast from "react-native-root-toast";

interface ToastOptions {
    duration?: number ;
    position?: number; 
}

export const showToast = (message: string, options: ToastOptions = {}) => {
    const { duration = Toast.durations.SHORT, position = Toast.positions.BOTTOM } = options;

    Toast.show(message, { duration: duration *1000, position });
};

import { DefaultTheme, MD3Theme } from "react-native-paper";

const customFonts = {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    semibold: "Poppins_600SemiBold",
    bold: "Poppins_700Bold",
    light: "Poppins_300Light",
    thin: "Poppins_100Thin",
};

// Create a theme object
const theme: MD3Theme = {
    ...DefaultTheme,
    fonts: {
        ...DefaultTheme.fonts,
        ...customFonts,
    },
};

export default theme;

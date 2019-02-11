module.exports = {
    getTransformModulePath() {
        return require.resolve("react-native-typescript-transform");
    },
    getSourceExts() {
        return ["ts", "tsx"];
    }
}
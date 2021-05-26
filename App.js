import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from 'react-native';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker'
import tinycolor from 'tinycolor2';
 
const {
    width,
} = Dimensions.get('window');
 
export default class SliderColorPickerExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldColor: "#FF7700",
            redValue: 255,
            greenValue: 119,
            blueValue: 0
        };
    }
 
    changeColor = (colorHsvOrRgb) => {
            this.setState({
                oldColor: tinycolor(colorHsvOrRgb).toHexString(),
                redValue: tinycolor(colorHsvOrRgb).toRgb().r,
                greenValue: tinycolor(colorHsvOrRgb).toRgb().g,
                blueValue: tinycolor(colorHsvOrRgb).toRgb().b
            });
    }

    async changeColorReverse(colorValue, colorKey) {
        try {
            await this.setState({ 
                [colorKey]: colorValue
            });
            await this.setState({
                oldColor: tinycolor({
                    r: this.state.redValue, 
                    g: this.state.greenValue, 
                    b: this.state.blueValue 
                }).toHexString()
            });
        } catch (error) {
            console.log('*****changeColorReverse*****');
        };
    }
 
    render() {
        const {
            oldColor,
            redValue,
            greenValue,
            blueValue
        } = this.state;

        const sliderStyle = {width: 200, height: 40};
        const numericInputStyle = {totalWidth: 140, totalHeight: 50}
 
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 350, width: width - 48}}>
                    <ColorPicker
                        ref={r => { this.picker = r }}
                        color={oldColor}
                        onColorChange={this.changeColor}
                        onColorChangeComplete={this.changeColor}
                        thumbSize={40}
                        sliderSize={40}
                        row={false}
                        swatches={false}
                    />
                </View> 

                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text> Color channels value</Text>
                </View>

                <View style={styles.sliderContainer}>
                    <Slider
                        style={sliderStyle}
                        value={redValue}
                        thumbTintColor='#ad0000'
                        minimumTrackTintColor='#ff0000'
                        tapToSeek='true'
                        minimumValue={0}
                        maximumValue={255}
                        step={1}
                        onValueChange={async (value) => {
                            try {
                                await this.changeColorReverse(value, 'redValue');
                                this.picker.revert();
                            } catch(error) {
                                console.log('*********', error);
                            }
                        }}
                    />

                    <View style={styles.textCon}>
                        <Text>{0}</Text>
                        <Text style={{borderColor: 'black', borderWidth: 0.25, height: 30, width: 55, textAlign: 'center', textAlignVertical: 'center', fontSize: 20}}>
                            {redValue}
                        </Text>
                        <Text>{255}</Text>
                    </View>


                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={sliderStyle}
                        value={greenValue}
                        thumbTintColor='#00ad00'
                        minimumTrackTintColor='#00ff00'
                        tapToSeek='true'
                        minimumValue={0}
                        maximumValue={255}
                        step={1}
                        onValueChange={async (value) => {
                            try {
                                await this.changeColorReverse(value, 'greenValue');
                                this.picker.revert();
                            } catch(error) {
                                console.log('*********', error);
                            }
                        }}
                    />
                    <View style={styles.textCon}>
                        <Text>{0}</Text>
                        <Text style={{borderColor: 'black', borderWidth: 0.25, height: 30, width: 55, textAlign: 'center', textAlignVertical: 'center', fontSize: 20}}>
                            {greenValue}
                        </Text>
                        <Text>{255}</Text>
                    </View>

                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={sliderStyle}
                        value={blueValue}
                        thumbTintColor='#0000ad'
                        minimumTrackTintColor='#0000ff'
                        tapToSeek='true'
                        minimumValue={0}
                        maximumValue={255}
                        step={1}
                        onValueChange={async (value) => {
                            try {
                                await this.changeColorReverse(value, 'blueValue');
                                this.picker.revert();
                            } catch(error) {
                                console.log('*********', error);
                            }
                        }}
                    />
                    <View style={styles.textCon}>
                        <Text>{0}</Text>
                        <Text style={{borderColor: 'black', borderWidth: 0.25, height: 30, width: 55, textAlign: 'center', textAlignVertical: 'center', fontSize: 20}}>
                            {blueValue}
                        </Text>
                        <Text>{255}</Text>
                    </View>

                </View>

                <View style={{marginTop: 10}}>
                    <Text style={{textAlign: 'center'}}> Color HEX code:</Text>
                    <Text style={{borderColor: 'black', borderWidth: 1, height: 50, width: 150, textAlign: 'center', textAlignVertical: 'center', fontSize: 30}} selectable = {true}>
                        {oldColor}
                    </Text>
                </View>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        margin: 10
    },
    thumb: {
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.35,
    },
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    textCon: {
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});
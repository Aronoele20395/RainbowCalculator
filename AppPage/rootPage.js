import React from 'react';
import { connect } from 'react-redux';
import { changeColorAction, changeColorComponent } from '../actions/actionList';
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from 'react-native';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker'
import tinycolor from 'tinycolor2';
import NumericInput from 'react-native-numeric-input';
 
const {
    width,
} = Dimensions.get('window');

class SliderColorPickerExample extends React.Component {
    constructor(props) {
        super(props);

        this.changeColor = this.changeColor.bind(this);
        this.changeColorReverse = this.changeColorReverse.bind(this);
    }
 
    changeColor = (colorHsvOrRgb) => {
        this.props.changeOldColor(colorHsvOrRgb);
    }

    changeColorReverse = (colorValue, colorKey) => {
        const { redValue, greenValue, blueValue } = this.props;
        const oldColor = colorKey === 'RED_UPDATE' ? tinycolor({
            r: colorValue, 
            g: greenValue, 
            b: blueValue 
        }).toHexString() :
        colorKey === 'GREEN_UPDATE' ? tinycolor({
            r: redValue, 
            g: colorValue, 
            b: blueValue 
        }).toHexString() :
        tinycolor({
            r: redValue, 
            g: greenValue, 
            b: colorValue 
        }).toHexString();
        this.props.changeColorChannel(colorValue, colorKey, oldColor);
    }
 
    render() {
        const {
            oldColor,
            redValue,
            greenValue,
            blueValue
        } = this.props;

        const sliderStyle = {width: 200, height: 40};
 
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 350, width: width - 48}}>
                    <ColorPicker
                        ref={r => { this.picker = r }}
                        color={oldColor}
                        onColorChange={this.changeColor}
                        onColorChangeComplete={this.changeColor}
                        thumbSize={30}
                        sliderSize={30}
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
                        onValueChange={(value) => {
                            this.changeColorReverse(value, 'RED_UPDATE');
                        }}
                        onSlidingComplete={() => {
                            this.picker.revert();
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
                        onValueChange={(value) => {
                            this.changeColorReverse(value, 'GREEN_UPDATE');
                        }}
                        onSlidingComplete={() => {
                            this.picker.revert();
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
                        onValueChange={(value) => {
                            this.changeColorReverse(value, 'BLUE_UPDATE');
                        }}
                        onSlidingComplete={() => {
                            this.picker.revert();
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

const mapStateToProps = state => {
    return {
        redValue: state.redValue,
        greenValue: state.greenValue,
        blueValue: state.blueValue,
        oldColor: state.oldColor
    };
};

const mapDispatchToProps = dispatch => {
    const changeOldColor = color => {
        dispatch(changeColorAction(color));
    };
    const changeColorChannel = (colorValue, colorKey, newColor) => {
        dispatch(changeColorComponent(colorValue, colorKey, newColor));
    };

    return {
        changeOldColor,
        changeColorChannel
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderColorPickerExample);
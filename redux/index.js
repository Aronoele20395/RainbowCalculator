import { combineReducers } from 'redux';
import tinycolor from 'tinycolor2';

const initialState = {
    oldColor: "#FF7700",
    redValue: 255,
    greenValue: 119,
    blueValue: 0,
};

const redValue = (state = initialState.redValue, action) => {
    switch(action.type) {
        case 'RED_UPDATE':
            return action.value;
        case 'COLOR_UPDATE':
            return tinycolor(action.oldColor).toRgb().r;
        default:
            return state;
    }
};

const greenValue = (state = initialState.greenValue, action) => {
    switch(action.type) {
        case 'GREEN_UPDATE':
            return action.value;
        case 'COLOR_UPDATE':
            return tinycolor(action.oldColor).toRgb().g;
        default:
            return state;
    }
};

const blueValue = (state = initialState.blueValue, action) => {
    switch(action.type) {
        case 'BLUE_UPDATE':
            return action.value;
        case 'COLOR_UPDATE':
            return tinycolor(action.oldColor).toRgb().b;
        default:
            return state;
    }
};

const oldColor = (state = initialState.oldColor, action) => {
    switch(action.type) {
        case 'COLOR_UPDATE':
            return tinycolor(action.oldColor).toHexString();
        case 'RED_UPDATE':
            return action.newColor;
        case 'GREEN_UPDATE':
            return action.newColor;
        case 'BLUE_UPDATE':
            return action.newColor;
        default:
            return state;
    }
};

export const colors = combineReducers({
  redValue,
  greenValue,
  blueValue,
  oldColor
});
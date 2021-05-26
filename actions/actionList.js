export const changeColorAction = oldColor => ({
    type: 'COLOR_UPDATE',
    oldColor
});

export const changeColorComponent = (value, type, newColor) => ({
    type,
    value,
    newColor
});
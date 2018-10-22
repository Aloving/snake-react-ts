import {SettingsAction} from '../enums/actions/settings';

export const updateWidth = (width: number) => ({
    payload: width,
    type: SettingsAction.WIDTH
});

export const updateHeight = (height: number) => ({
    payload: height,
    type: SettingsAction.HEIGHT
});

export const updateSpeed = (speed: number) => ({
    payload: speed,
    type: SettingsAction.SPEED
});
import * as Sentry from '@sentry/react-native';
import React from "react";
import { Button } from "react-native";

interface ISelectTuningLandingScreen {

}

export default function SelectTuningLandingScreen(props: ISelectTuningLandingScreen) {
    /* ******************** Hooks ******************** */
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <Button title='Try!' onPress={() => { Sentry.captureException(new Error('First error')) }} />

    );
}
import * as Sentry from '@sentry/react-native';
import React from "react";
import { Button } from 'react-native';

interface IbassTuning {
  
}

export default function bassTuninScreen(props: IbassTuning) {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
         <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
    
  );
}
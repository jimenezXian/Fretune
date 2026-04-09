import React from "react";
import { TouchableOpacity } from "react-native";
import { Typography } from "../ui";

// export type TTuning {
//     name: string;
// }

interface ITuneSetProps {
    name: string;
}

export function TuneSet({ name }: ITuneSetProps) {
    /* ******************** Hooks ******************** */
    
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <TouchableOpacity onPress={() => dispatch()}>
            <Typography variant="p1">
                {name}
            </Typography>
        </TouchableOpacity>
    );
}
import { Icon, Typography, useColors } from "@/components/ui";
import { useSelectedInstrument, useTunerStore } from "@/store/useTunerStore";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

export default function ManageInstrumentsScreen() {
    /* ******************** Hooks ******************** */
    const { $color } = useColors();

    const { instruments, selectInstrument } = useTunerStore(useShallow((state) => ({
        instruments: state.instruments,
        selectInstrument: state.selectInstrument,
    })));

    const currentInstrument = useSelectedInstrument();

    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <SafeAreaView edges={["top", "bottom"]}>
            {
                instruments.map((instrument) => {
                    const isCurrentlySelected = instrument.id == currentInstrument.id;

                    return (
                        <TouchableOpacity key={instrument.id}
                            onPress={isCurrentlySelected ? undefined : () => selectInstrument(instrument.id)}
                            style={[s.instrumentContainer, { borderColor: $color.border }]}>
                            <View style={s.icon}>
                                {instrument?.icon &&
                                    <Icon name="guitar" color={isCurrentlySelected ? "primary" : "text"} />
                                }
                            </View>
                            <Typography variant="h5" color={isCurrentlySelected ? "primary" : "text"}>
                                {instrument.name}
                            </Typography>
                            <View>
                                {!isCurrentlySelected && <Icon name="chevron-right" />}
                            </View>
                        </TouchableOpacity >
                    )
                })
            }

        </SafeAreaView >
    );
}

const s = StyleSheet.create({
    instrumentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 0.5,
        padding: 20,
    },
    icon: {
        width: 20,
        height: 20,
    },
    border: {
        borderWidth: 0.5
    }
})
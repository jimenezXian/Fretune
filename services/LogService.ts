import { settings } from "@/utils/settingsUtils";
import * as Sentry from '@sentry/react-native';
import React from "react";

export const LogService = {
    init: () => {
        Sentry.init({
            dsn: settings.SENTRY_DSN,
            sendDefaultPii: true,
            enableLogs: true,
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1,
            integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
        });
    },
    wrapRoot: (component: React.ComponentType<Record<string, unknown>>) => {
        return Sentry.wrap(component);
    },
    info: ({ action, data }: { action: string; data?: Record<string, unknown> }) => {
        console.info(action, data);
        Sentry.logger.info(action, data);
    },
    error: ({ action, error, data }: { action: string; error: Error | unknown; data?: Record<string, unknown> }) => {
        console.error(action, error, data);
        const sentryEventId = Sentry.captureException(new Error(action), {
            originalException: error,
        });
        Sentry.logger.error(action, {
            ...data,
            sentryEventId,
        });
    },
};
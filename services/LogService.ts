import { settings } from "@/utils/settingsUtils";
import * as Sentry from '@sentry/react-native';
import type { ComponentType } from "react";

interface ILogParams {
    action: string;
    data?: Record<string, unknown>;
}

interface IErrorLogParams extends ILogParams {
    error: unknown;
}

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
    wrapRoot: (component: ComponentType<Record<string, unknown>>) => {
        return Sentry.wrap(component);
    },
    info: ({ action, data }: ILogParams) => {
        console.info(action, data);
        Sentry.logger.info(action, data);
    },
    error: ({ action, error, data }: IErrorLogParams) => {
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

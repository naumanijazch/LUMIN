import { Actor, Notification } from "../types/notificationTypes";

export const groupNotifications = (
    notifications: Notification[],
    threshold: number = 21600000
) => {
    // Initialize an object to store grouped notifications
    const groupedNotifications: { [key: string]: Notification[] } = {};

    // Iterate through each notification
    notifications.forEach((notification) => {
        // Extract relevant information
        const { _id, actor, entity, onModel, timestamp, type } = notification;

        // Check if the notification type is supported for grouping
        if (type === "like" || type === "comment") {
            // Iterate through existing groups
            let grouped = false;
            for (const key in groupedNotifications) {
                const group = groupedNotifications[key];
                const lastNotification = group[group.length - 1];

                // Calculate the time difference between the current notification and the last one in the group
                const timeDiff =
                    new Date(timestamp).getTime() -
                    new Date(lastNotification.timestamp).getTime();
                // If the time difference is within the threshold and the notifications are similar, group them
                if (
                    timeDiff <= threshold &&
                    lastNotification.type === type &&
                    lastNotification.actor._id === actor._id &&
                    lastNotification.entity._id === entity._id
                ) {
                    group.push(notification);
                    grouped = true;
                    break;
                }
            }

            // If the notification couldn't be grouped with any existing group, create a new group
            if (!grouped) {
                groupedNotifications[_id] = [notification];
            }
        }
    });

    // Generate consolidated notification messages
    const consolidatedNotifications: {
        message: string;
        group: Notification[];
    }[] = [];
    for (const key in groupedNotifications) {
        const group = groupedNotifications[key].sort(
            (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
        );
        const notification = group[0];
        const actorName = notification.actor.fullname;
        const othersCount = group.length - 1;
        const message =
            othersCount > 0
                ? ` and ${othersCount} others ${
                      notification.type === "like" ? "liked" : "commented on"
                  } your ${notification.onModel}`
                : ` ${
                      notification.type === "like" ? "liked" : "commented on"
                  } your ${notification.onModel}`;
        consolidatedNotifications.push({ message, group });
    }

    return consolidatedNotifications;
};

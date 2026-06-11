"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { type NotificationItem, useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const { notifications, loading, markAsRead } = useNotifications();

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId);
  };

  const getNotificationTone = (type: string) => {
    switch (type) {
      case "overdue_prospects":
        return { label: "O", color: "bg-red-100 text-red-600" };
      case "milestone":
        return { label: "M", color: "bg-green-100 text-green-600" };
      case "alert":
        return { label: "!", color: "bg-yellow-100 text-yellow-700" };
      default:
        return { label: "N", color: "bg-blue-100 text-blue-600" };
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="mt-2 text-gray-600">
          Stay updated with alerts about overdue prospects and important events
        </p>
      </div>

      {notifications && notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification: NotificationItem) => {
            const { label, color } = getNotificationTone(notification.type || "default");
            const title = notification.title || "Notification";
            const message = notification.message || "";
            const createdAt = notification.createdAt || new Date().toISOString();

            return (
              <div
                key={notification.id}
                className={`rounded-lg border p-4 ${
                  !notification.read ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                } transition-shadow hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 text-lg ${color}`}>{label}</div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{message}</p>
                      </div>
                      {!notification.read && (
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {new Date(createdAt).toLocaleDateString()} at{" "}
                        {new Date(createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          <Check size={16} />
                          Mark as read
                        </button>
                      )}
                    </div>

                    {notification.type === "overdue_prospects" &&
                      notification.metadata?.prospectIds && (
                        <Link
                          href="/dashboard"
                          className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          View prospects in Kanban &rarr;
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center">
          <div className="mb-4 text-5xl">🎉</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">All caught up!</h2>
          <p className="text-gray-600">
            You have no notifications at the moment. Great job staying organized!
          </p>
        </div>
      )}

      {notifications && notifications.length > 0 && (
        <div className="flex justify-center pt-4">
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

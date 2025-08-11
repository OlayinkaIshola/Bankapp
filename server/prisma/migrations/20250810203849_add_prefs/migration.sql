-- CreateTable
CREATE TABLE "NotificationPreferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "txEmail" BOOLEAN NOT NULL DEFAULT true,
    "txSMS" BOOLEAN NOT NULL DEFAULT false,
    "txPush" BOOLEAN NOT NULL DEFAULT true,
    "billRemindersEmail" BOOLEAN NOT NULL DEFAULT true,
    "marketingEmail" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "NotificationPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreferences_userId_key" ON "NotificationPreferences"("userId");

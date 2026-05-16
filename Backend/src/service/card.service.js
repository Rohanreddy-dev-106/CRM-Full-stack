import prisma from "../db/prismaClient.js";
import { createOnboardingChecklist } from "../utils/onbord.chicklist.js";

export const updateCardService = async (cardId, payload) => {
    const existing = await prisma.prospect.findUnique({
        where: { id: cardId }
    });
    if (!existing) throw new Error("Card not found");

    const previousStage = existing.stage;

    const data = {
        ...payload
    };

    if (Object.prototype.hasOwnProperty.call(data, "lastContactDate")) {
        data.lastContactDate = data.lastContactDate ? new Date(data.lastContactDate) : null;
    }

    if (Object.prototype.hasOwnProperty.call(data, "nextFollowUpDate")) {
        data.nextFollowUpDate = data.nextFollowUpDate ? new Date(data.nextFollowUpDate) : null;
    }

    const updated = await prisma.prospect.update({
        where: { id: cardId },
        data
    });

    if (
        previousStage !== "Pilot Closed" &&
        updated.stage === "Pilot Closed"
    ) {
        await createOnboardingChecklist(updated.id);
    }

    return updated;
};
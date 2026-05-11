import Card from "../models/card.schema.js";
import { createOnboardingChecklist } from "../utils/onbord.chicklist.js";

export const updateCardService = async (cardId, payload) => {
    const existing = await Card.findById(cardId);
    if (!existing) throw new Error("Card not found");

    const previousStage = existing.stage;

    const updated = await Card.findByIdAndUpdate(
        cardId,
        { $set: payload },
        { returnDocument: 'after', runValidators: true }
    );
   //TODO:IMPORTEND lOGIC 
    if (
        previousStage !== "Pilot Closed" &&
        updated.stage === "Pilot Closed"
    ) {
        await createOnboardingChecklist(updated._id);
    }

    return updated;
};
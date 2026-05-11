import Card from "../models/card.schema.js";
import Note from "../models/notes.schema.js";
import Checklist from "../models/checklist.schema.js";

export default class Repositories {
    // CARDS (Prospects)

    async getAllCards({ page, limit }) {

        //for frontend data must be in order  for cards to be created..

        const skip = (page - 1) * limit;

        const [totalItems, cards] = await Promise.all([
            Card.countDocuments(),
            Card.find({})
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
        ]);

        const groupedMap = new Map();

        for (const card of cards) {
            if (!groupedMap.has(card.stage)) {
                groupedMap.set(card.stage, []);
            }

            groupedMap.get(card.stage).push({
                id: card._id,
                name: card.name,
                school: card.school,
                role: card.role,
                email: card.email,
                phone: card.phone,
                source: card.source,
                lastContactDate: card.lastContactDate,
                nextFollowUpDate: card.nextFollowUpDate,
                createdAt: card.createdAt
            });
        }

        const data = Array.from(groupedMap.entries()).map(([stage, prospects]) => ({
            _id: stage,
            prospects
        }));

        return {
            data,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / limit))
            }
        };
    }

    async getCardById(id) {
        return await Card.findById(id);
    }

    async createCard(data) {
        const card = new Card(data);
        return await card.save();
    }

    async deleteCard(id) {
        return await Card.findByIdAndDelete(id);
    }

     // NOTES (Append-only in side cards)

    async addNote(prospectId, content) {
        const note = new Note({ prospectId, content });
        return await note.save();
    }

    async getNotesByProspect(prospectId, { page, limit }) {
        const skip = (page - 1) * limit;

        const [totalItems, notes] = await Promise.all([
            Note.countDocuments({ prospectId }),
            Note.find({ prospectId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
        ]);

        return {
            data: notes,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / limit))
            }
        };
    }

    // ONBOARDING CHECKLIST(when stage is set to "Pilot Closed" )

    async getChecklistByProspect(prospectId, { page, limit }) {
        const skip = (page - 1) * limit;

        const [totalItems, checklist] = await Promise.all([
            Checklist.countDocuments({ prospectId }),
            Checklist.find({ prospectId })
                .sort({ stepNumber: 1 })
                .skip(skip)
                .limit(limit)
        ]);

        return {
            data: checklist,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / limit))
            }
        };
    }


    async checklistExists(prospectId) {
        return await Checklist.exists({ prospectId });
    }

    async updateChecklistStatus(id, status) {
        return await Checklist.findByIdAndUpdate(
            id,
            { $set: { status } },
            { returnDocument: 'after', runValidators: true }
        );
    }
}
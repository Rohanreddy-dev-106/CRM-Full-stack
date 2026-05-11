import Checklist from "../models/checklist.schema.js";

const CHECKLIST_STEPS = [
    "School KYC completed",
    "Admin account created",
    "Teachers onboarded",
    "Student data uploaded",
    "Class structure setup",
    "Fee module configured",
    "Attendance module enabled",
    "Timetable created",
    "Training session completed",
    "Go-live confirmation"
];

export const createOnboardingChecklist = async (prospectId) => {
    const existing = await Checklist.findOne({ prospectId });

    // SAFETY CHECK
    if (existing) return; // if exists

    const checklistDocs = CHECKLIST_STEPS.map((title, index) => ({
        prospectId,
        stepNumber: index + 1,
        title,
        description: title,
        assignee: "KALNET Ops",
        status: "todo",
        dueDate: new Date(Date.now() + (index + 1) * 86400000)
    }));

    await Checklist.insertMany(checklistDocs); // insert all checklist at once
};
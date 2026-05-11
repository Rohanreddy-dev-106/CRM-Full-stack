import AnalyticsRepository from "../repo/analytics.repo.js";

// Frontend stage mapping: backend "Title Case" → frontend "UPPER_SNAKE"
const STAGE_TO_FRONTEND = {
    "Cold": "COLD",
    "Contacted": "CONTACTED",
    "Demo Booked": "DEMO_BOOKED",
    "Demo Done": "DEMO_DONE",
    "Proposal Sent": "PROPOSAL_SENT",
    "Pilot Closed": "PILOT_CLOSED",
};

export default class AnalyticsController {
    constructor() {
        this.repo = new AnalyticsRepository();
    }

    async getAnalytics(req, res, next) {
        try {
            const analytics = await this.repo.getFullAnalytics();

            // Map stage names to frontend format
            analytics.stageBreakdown = analytics.stageBreakdown.map((item) => ({
                ...item,
                stage: STAGE_TO_FRONTEND[item.stage] || item.stage,
            }));

            res.status(200).json({ success: true, data: analytics });
        } catch (err) {
            next(err);
        }
    }
}

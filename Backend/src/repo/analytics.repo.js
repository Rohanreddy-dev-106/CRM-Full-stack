import Card from "../models/card.schema.js";

export default class AnalyticsRepository {
    
    async getStageBreakdown() {
        const now = new Date();

        return Card.aggregate([
            {
                $group: {
                    _id: "$stage",
                    count: { $sum: 1 },
                    avgDaysInStage: {
                        $avg: {
                            $divide: [
                                { $subtract: [now, "$createdAt"] },
                                1000 * 60 * 60 * 24 // ms → days
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    stage: "$_id",
                    count: 1,
                    avgDays: { $round: ["$avgDaysInStage", 1] },
                    _id: 0
                }
            },
            { $sort: { stage: 1 } }
        ]);
    }

    /**
     * Count of prospects with overdue follow-ups
     */
    async getOverdueCount() {
        return Card.countDocuments({
            nextFollowUpDate: { $lt: new Date() },
            stage: { $ne: "Pilot Closed" }
        });
    }

    /**
     * Count of prospects closed this calendar month
     */
    async getClosedThisMonth() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return Card.countDocuments({
            stage: "Pilot Closed",
            updatedAt: { $gte: startOfMonth }
        });
    }

    /**
     * Monthly trend: cards created per month (last 6 months)
     */
    async getMonthlyTrend() {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        return Card.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    year: "$_id.year",
                    month: "$_id.month",
                    count: 1,
                    _id: 0
                }
            },
            { $sort: { year: 1, month: 1 } }
        ]);
    }

    /**
     * Full analytics summary in a single call
     */
    async getFullAnalytics() {
        const [stageBreakdown, overdueCount, closedThisMonth, monthlyTrend, totalProspects, closedTotal] =
            await Promise.all([
                this.getStageBreakdown(),
                this.getOverdueCount(),
                this.getClosedThisMonth(),
                this.getMonthlyTrend(),
                Card.countDocuments(),
                Card.countDocuments({ stage: "Pilot Closed" })
            ]);

        const conversionRate = totalProspects > 0
            ? Number(((closedTotal / totalProspects) * 100).toFixed(1))
            : 0;

        return {
            stageBreakdown,
            totalProspects,
            conversionRate,
            overdueCount,
            closedCount: closedTotal,
            closedThisMonth,
            monthlyTrend
        };
    }
}

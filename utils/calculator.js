/**
 * @file calculator.js
 * @description Core Logic Engine for the Admission Ranking System.
 * * This module implements a weighted multi-factor ranking algorithm to normalize 
 * student performance across different academic institutions and prioritize 
 * major-specific technical expertise (Specialization Ratio).
 * * @author [Hau Ching Haye] 
 * @version 1.0.0
 * * @logic_summary
 * 1. Academic Rigor (60%): Normalizes raw GPA and applies an Institutional Multiplier (M_inst)
 * to account for varying grading standards across colleges.
 * 2. Specialist Ratio (20%): Calculates the density of Major-Related credits (C_rel) 
 * against total elective credits to identify technical focus.
 * 3. Elite Ranking (20%): Awards bonus points based on verified percentile ranking (Top 5%, 10%, etc.).
 */

/**
 * Calculates the final Admission Score for a student applicant.
 * * @param {Object} data - The student's academic data object.
 * @param {number} data.raw_cgpa - The actual GPA earned by the student.
 * @param {number} data.max_cgpa - The maximum GPA scale (e.g., 4.0 or 4.3).
 * @param {number} data.inst_multiplier - The institutional rigor weight (0.95 - 1.30).
 * @param {number} data.rank_bonus - Pre-calculated points based on percentile rank.
 * @param {number} data.related_credits - Number of completed Major-Related credits.
 * @param {number} data.total_credits - Total number of elective/major credits attempted.
 * * @returns {number} The total calculated Admission Score (0-100), rounded to 2 decimal places.
 * Gemini AI is used in co-creating the algorithm logic
 */

/**
 * admissionCalculator: Converts raw academic data into a weighted score (0-100)
 * Logic: (GPA Weight 60%) + (Ranking Bonus 20%) + (Specialist Credit 20%)
 */
export const calculateAdmissionScore = (data) => {
  const { raw_cgpa, max_cgpa, inst_multiplier, rank_bonus, related_credits, total_credits } = data;

  // 1. Normalized GPA with Institutional Multiplier (Base 60)
  const gpaPoints = (raw_cgpa / max_cgpa) * 60 * inst_multiplier;

  // 2. Specialization Ratio (Base 20)
  // Rewards students who use elective credits on related subjects
  const specialistPoints = (related_credits / total_credits) * 20;

  // 3. Final Sum
  // Total = GPA (weighted) + Rank Bonus + Specialist (weighted)
  const totalScore = gpaPoints + rank_bonus + specialistPoints;

  return parseFloat(totalScore.toFixed(2)); // Return clean number like 86.75
};

// front end should display the related GPA and other variables quickly when hovered over the final score, for transparency and user understanding of the calculation.
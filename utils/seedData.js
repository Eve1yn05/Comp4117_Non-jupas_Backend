// utils/seedData.js
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');
const { HK_INSTITUTIONS, PERCENTILES, TARGET_PROGRAMMES, getInstitutionMultiplier, getRankBonus } = require('./constants');
require('dotenv').config();

/**
 * Calculates the final Admission Score for a student applicant.
 * Formula: (GPA Weight 60%) + (Ranking Bonus 20%) + (Specialist Credit 20%)
 */
const calculateAdmissionScore = (data) => {
  const { raw_cgpa, max_cgpa, inst_multiplier, rank_bonus, related_credits, total_credits } = data;

  // 1. Normalized GPA with Institutional Multiplier (Base 60)
  const gpaPoints = (raw_cgpa / max_cgpa) * 60 * inst_multiplier;

  // 2. Specialization Ratio (Base 20)
  const specialistPoints = (related_credits / total_credits) * 20;

  // 3. Final Score
  const totalScore = gpaPoints + rank_bonus + specialistPoints;

  return parseFloat(totalScore.toFixed(2));
};

async function seedStudents() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('applicationsDB');
    
    const students = Array.from({ length: 50 }, () => {
      const institution = faker.helpers.arrayElement(HK_INSTITUTIONS);
      const percentile = faker.helpers.arrayElement(PERCENTILES);
      const related_credits = faker.number.int({ min: 12, max: 24 });
      const total_credits = faker.number.int({ min: 12, max: 30 });
      const raw_cgpa = faker.number.float({ min: 2.0, max: 4.0, precision: 0.01 });
      const inst_multiplier = getInstitutionMultiplier(institution);
      const rank_bonus = getRankBonus(percentile);
      
      // Calculate admission score using backend logic
      const admission_score = calculateAdmissionScore({
        raw_cgpa,
        max_cgpa: 4.0,
        inst_multiplier,
        rank_bonus,
        related_credits,
        total_credits
      });
      
      return {
        application: {
          category: 'Non-JUPAS',
          target_programme: faker.helpers.arrayElement(TARGET_PROGRAMMES),
          years_applied: [2026],
          status: faker.helpers.arrayElement(['Pending', 'Verified', 'Rejected']),
          applied_at: faker.date.past()
        },
        personal: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          is_local: faker.datatype.boolean(),
          entry_year: 2026,
          banding: faker.number.int({ min: 1, max: 3 })
        },
        academic: {
          institution: institution,
          raw_cgpa: raw_cgpa,
          max_cgpa: 4.0,
          inst_multiplier: inst_multiplier,
          percentile: percentile,
          related_credits: related_credits,
          total_credits: total_credits,
          admission_score: admission_score
        },
        test_scores: {
          dse_best_5: faker.number.int({ min: 10, max: 40 }),
          csd_grade: faker.helpers.arrayElement(['Attained', 'Unattained', '-'])
        },
        records: {
          transcript_present: faker.datatype.boolean(),
          transcript_url: faker.image.url(),
          achievement: faker.datatype.boolean() ? faker.lorem.word() : '-',
          is_verified: faker.datatype.boolean()
        },
        evaluation: {
          score: faker.number.int({ min: 1, max: 10 }),
          comments: faker.lorem.sentence(),
          interviewer_id: faker.string.uuid()
        }
      };
    });
    
    await db.collection('students').insertMany(students);
    console.log('✓ 50 dummy students inserted into applicationsDB');
    console.log('✓ Admission scores calculated using institution-specific multipliers');
  } catch (error) {
    console.error('✗ Error seeding data:', error.message);
  } finally {
    await client.close();
  }
}

seedStudents();
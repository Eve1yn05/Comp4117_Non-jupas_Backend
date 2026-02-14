// utils/seedData.js
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

async function seedStudents() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('applicationsDB');
    
    const students = Array.from({ length: 50 }, () => ({
      application: {
        category: 'Non-JUPAS',
        target_programme: faker.helpers.arrayElement(['CST', 'ISA']),
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
        institution: faker.company.name(),
        raw_cgpa: faker.number.float({ min: 2.0, max: 4.0, precision: 0.01 }),
        max_cgpa: 4.0,
        inst_multiplier: faker.number.float({ min: 0.9, max: 1.2, precision: 0.01 }),
        percentile: faker.helpers.arrayElement(['Top 10%', 'Top 25%', 'Top 50%']),
        related_credits: faker.number.int({ min: 12, max: 24 }),
        total_credits: faker.number.int({ min: 12, max: 30 }),
        admission_score: faker.number.float({ min: 60, max: 100, precision: 0.1 })
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
    }));
    
    await db.collection('students').insertMany(students);
    console.log('✓ 50 dummy students inserted into applicationsDB');
  } finally {
    await client.close();
  }
}

seedStudents();
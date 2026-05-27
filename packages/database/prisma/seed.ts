import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@signalassistant.com' },
    update: {},
    create: {
      email: 'admin@signalassistant.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Create sample account manager
  const accountManager = await prisma.user.upsert({
    where: { email: 'john.smith@signalassistant.com' },
    update: {},
    create: {
      email: 'john.smith@signalassistant.com',
      firstName: 'John',
      lastName: 'Smith',
      role: 'ACCOUNT_MANAGER',
      isActive: true,
    },
  });

  console.log(`✅ Created account manager: ${accountManager.email}`);

  // Create sample account
  const account = await prisma.account.upsert({
    where: { id: 'sample-account-1' },
    update: {},
    create: {
      id: 'sample-account-1',
      name: 'Acme Corporation',
      industry: 'Technology',
      website: 'https://acme.example.com',
      description: 'Enterprise software company looking to modernize their sales operations',
      ownerId: accountManager.id,
    },
  });

  console.log(`✅ Created sample account: ${account.name}`);

  // Create stakeholders
  const stakeholder1 = await prisma.stakeholder.create({
    data: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@acme.example.com',
      title: 'VP of Sales',
      department: 'Sales',
      role: 'ECONOMIC_BUYER',
      influenceLevel: 'HIGH',
      accountId: account.id,
      createdById: accountManager.id,
    },
  });

  const stakeholder2 = await prisma.stakeholder.create({
    data: {
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@acme.example.com',
      title: 'Sales Operations Manager',
      department: 'Sales Operations',
      role: 'CHAMPION',
      influenceLevel: 'MEDIUM',
      accountId: account.id,
      createdById: accountManager.id,
    },
  });

  console.log(`✅ Created ${2} stakeholders`);

  // Create opportunity
  const opportunity = await prisma.opportunity.create({
    data: {
      name: 'Acme Sales Intelligence Platform',
      value: 150000,
      currency: 'GBP',
      stage: 'DISCOVERY',
      probability: 40,
      closeDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      accountId: account.id,
      ownerId: accountManager.id,
    },
  });

  console.log(`✅ Created opportunity: ${opportunity.name}`);

  // Create MEDDPICC data
  await prisma.mEDDPICCData.create({
    data: {
      opportunityId: opportunity.id,
      elements: {
        create: [
          { category: 'metrics', status: 'WEAK', confidence: 30 },
          { category: 'economicBuyer', status: 'CONFIRMED', confidence: 80 },
          { category: 'decisionCriteria', status: 'IN_PROGRESS', confidence: 50 },
          { category: 'decisionProcess', status: 'NOT_STARTED', confidence: 0 },
          { category: 'paperProcess', status: 'NOT_STARTED', confidence: 0 },
          { category: 'identifiedPain', status: 'CONFIRMED', confidence: 85 },
          { category: 'champion', status: 'INFERRED', confidence: 60 },
          { category: 'competition', status: 'WEAK', confidence: 25 },
        ],
      },
    },
  });

  console.log('✅ Created MEDDPICC data');

  // Create sample meeting
  const meeting = await prisma.meeting.create({
    data: {
      title: 'Discovery Call - Sales Operations Review',
      description: 'Initial discovery meeting to understand sales operations challenges',
      scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 1 hour
      status: 'COMPLETED',
      accountId: account.id,
      opportunityId: opportunity.id,
      hostId: accountManager.id,
      attendees: {
        create: [
          {
            name: 'John Smith',
            email: 'john.smith@signalassistant.com',
            role: 'HOST',
            isInternal: true,
          },
          {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@acme.example.com',
            role: 'PARTICIPANT',
            isInternal: false,
            stakeholderId: stakeholder1.id,
          },
          {
            name: 'Mike Chen',
            email: 'mike.chen@acme.example.com',
            role: 'PARTICIPANT',
            isInternal: false,
            stakeholderId: stakeholder2.id,
          },
        ],
      },
    },
  });

  console.log(`✅ Created sample meeting: ${meeting.title}`);

  // Create sample risks
  await prisma.riskIndicator.create({
    data: {
      type: 'NO_QUANTIFIED_METRICS',
      severity: 'HIGH',
      description: 'No quantified business metrics have been established',
      recommendation: 'Ask about specific KPIs and cost/time savings expected',
      opportunityId: opportunity.id,
    },
  });

  await prisma.discoveryGap.create({
    data: {
      category: 'MISSING',
      framework: 'meddpicc',
      element: 'decisionProcess',
      severity: 'MEDIUM',
      description: 'Decision process and timeline not yet discussed',
      suggestedAction: 'Schedule follow-up to map out buying process',
      opportunityId: opportunity.id,
    },
  });

  console.log('✅ Created sample risks and gaps');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

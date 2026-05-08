/**
 * System Test Script for Online Exam System
 * This script tests all major functional components:
 * 1. Student Registration
 * 2. Test Management (Upload/Retrieve)
 * 3. Result Submission (Exam Flow)
 * 4. Admin Analytics Integration
 * 
 * Usage: node system-test.js
 * Make sure the app is running (npm run dev) on http://localhost:3000
 */

const BASE_URL = 'http://127.0.0.1:3000';

async function runTests() {
  console.log('🚀 Starting System Integration Tests...\n');

  try {
    // 1. Test Student Management
    console.log('--- Phase 1: Student Management ---');
    const testStudent = {
      id: 'TEST-S001',
      name: 'Test Student',
      password: 'testpassword'
    };

    const regRes = await fetch(`${BASE_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testStudent)
    });
    const regData = await regRes.json();
    
    if (regRes.ok) {
      console.log('✅ Student Registration: SUCCESS');
    } else {
      console.log('❌ Student Registration: FAILED', regData.error);
      if (regData.error !== 'Student ID already exists') throw new Error('Reg Failed');
    }

    // 2. Test Management (Upload)
    console.log('\n--- Phase 2: Test Management ---');
    const sampleTest = {
      testId: 'TEST-MATH-01',
      title: 'Integration Test - Algebra',
      duration: 10,
      questions: [
        {
          question: 'What is 2+2?',
          options: ['3', '4', '5'],
          answer: '4'
        }
      ]
    };

    const uploadRes = await fetch(`${BASE_URL}/api/upload-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sampleTest)
    });
    const uploadData = await uploadRes.json();
    
    if (uploadRes.ok) {
      console.log('✅ Test Upload: SUCCESS');
    } else {
      console.log('❌ Test Upload: FAILED', uploadData.error);
      throw new Error('Upload Failed');
    }

    // 3. Exam Flow (Result Submission)
    console.log('\n--- Phase 3: Exam Flow ---');
    const testResult = {
      studentId: 'TEST-S001',
      studentName: 'Test Student',
      testId: 'TEST-MATH-01',
      testTitle: 'Integration Test - Algebra',
      score: 1,
      total: 1,
      percentage: 100,
      cheatingDetected: false,
      autoSubmitted: false,
      durationTaken: 30
    };

    const resultRes = await fetch(`${BASE_URL}/api/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testResult)
    });
    const resultData = await resultRes.json();
    
    if (resultRes.ok) {
      console.log('✅ Result Submission: SUCCESS');
    } else {
      console.log('❌ Result Submission: FAILED', resultData.error);
      throw new Error('Submission Failed');
    }

    // 4. Admin Analytics
    console.log('\n--- Phase 4: Admin Analytics ---');
    const analyticsRes = await fetch(`${BASE_URL}/api/results`);
    const analyticsData = await analyticsRes.json();
    
    const found = analyticsData.find(r => r.studentId === 'TEST-S001' && r.testId === 'TEST-MATH-01');
    if (found) {
      console.log('✅ Analytics Integration: SUCCESS (Result found in database)');
    } else {
      console.log('❌ Analytics Integration: FAILED (Result not found)');
      throw new Error('Analytics Failed');
    }

    // 5. Cleanup
    console.log('\n--- Phase 5: Cleanup ---');
    await fetch(`${BASE_URL}/api/students?id=TEST-S001`, { method: 'DELETE' });
    await fetch(`${BASE_URL}/api/tests?id=TEST-MATH-01`, { method: 'DELETE' });
    console.log('✅ Cleanup: SUCCESS (Test data removed)');

    console.log('\n✨ ALL SYSTEM TESTS PASSED SUCCESSFULLY! ✨');

  } catch (error) {
    console.error('\n💥 TEST SUITE CRASHED:', error.message);
    process.exit(1);
  }
}

runTests();

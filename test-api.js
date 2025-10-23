/**
 * Simple API Test Script
 * Tests the usability testing API endpoints
 * Run with: node test-api.js
 */

const API_BASE = 'http://localhost:3000/api/usability-testing';

async function testAPI() {
    console.log('🧪 Testing Usability Testing API...\n');

    try {
        // Test 1: Health Check
        console.log('1. Testing Health Check...');
        const healthResponse = await fetch(`${API_BASE}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health Check:', healthData.success ? 'PASS' : 'FAIL');
        console.log('   Status:', healthData.data?.status || 'Unknown');
        console.log('');

        // Test 2: Create Session
        console.log('2. Testing Session Creation...');
        const createResponse = await fetch(`${API_BASE}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                participant_id: 'TEST_P001',
                metadata: { test: true }
            })
        });
        const createData = await createResponse.json();
        console.log('✅ Session Creation:', createData.success ? 'PASS' : 'FAIL');
        
        if (createData.success) {
            const sessionId = createData.data.session.id;
            console.log('   Session ID:', sessionId);
            console.log('');

            // Test 3: Get Session
            console.log('3. Testing Session Retrieval...');
            const getResponse = await fetch(`${API_BASE}/sessions/${sessionId}`);
            const getData = await getResponse.json();
            console.log('✅ Session Retrieval:', getData.success ? 'PASS' : 'FAIL');
            console.log('   Participant:', getData.data?.session?.participant_id || 'Unknown');
            console.log('');

            // Test 4: Submit Form
            console.log('4. Testing Form Submission...');
            const submitResponse = await fetch(`${API_BASE}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: sessionId,
                    form_type: 'pretest',
                    form_data: {
                        age: '25-34',
                        gender: 'other',
                        experience: 'intermediate'
                    }
                })
            });
            const submitData = await submitResponse.json();
            console.log('✅ Form Submission:', submitData.success ? 'PASS' : 'FAIL');
            console.log('   Form Type:', submitData.data?.submission?.form_type || 'Unknown');
            console.log('');

            // Test 5: List Sessions
            console.log('5. Testing Session List...');
            const listResponse = await fetch(`${API_BASE}/sessions?limit=5`);
            const listData = await listResponse.json();
            console.log('✅ Session List:', listData.success ? 'PASS' : 'FAIL');
            console.log('   Total Sessions:', listData.data?.pagination?.total || 0);
            console.log('');

            // Test 6: Export Data
            console.log('6. Testing Data Export...');
            const exportResponse = await fetch(`${API_BASE}/export?format=json&limit=1`);
            const exportData = await exportResponse.json();
            console.log('✅ Data Export:', exportData.success ? 'PASS' : 'FAIL');
            console.log('   Export Info:', exportData.data?.export_info?.total_sessions || 0, 'sessions');
            console.log('');

            // Test 7: Webhook Info
            console.log('7. Testing Webhook Info...');
            const webhookResponse = await fetch(`${API_BASE}/webhook`);
            const webhookData = await webhookResponse.json();
            console.log('✅ Webhook Info:', webhookData.success ? 'PASS' : 'FAIL');
            console.log('   Supported Types:', webhookData.data?.supported_notification_types?.length || 0);
            console.log('');

        } else {
            console.log('❌ Session creation failed, skipping dependent tests');
        }

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
        console.log('\n💡 Make sure:');
        console.log('   - Next.js dev server is running (npm run dev)');
        console.log('   - Database is set up and accessible');
        console.log('   - Environment variables are configured');
    }

    console.log('\n🏁 API Testing Complete!');
}

// Run tests
testAPI();

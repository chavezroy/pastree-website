# Usability Testing Data Management Setup

This document provides setup instructions for the enhanced usability testing system with database integration.

## Overview

The system now includes:
- PostgreSQL database for persistent storage
- Next.js API routes for backend functionality
- Enhanced session management with API integration
- Real-time notifications and dashboard updates
- Export functionality (CSV/JSON)
- Webhook support for external integrations

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+ database
- Next.js application (already set up)

## Database Setup

### 1. Create PostgreSQL Database

```sql
-- Connect to PostgreSQL as superuser
CREATE DATABASE usability_testing;
CREATE USER usability_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE usability_testing TO usability_user;
```

### 2. Run Database Schema

```bash
# Connect to your database and run the schema
psql -U usability_user -d usability_testing -f lib/db/schema.sql
```

### 3. Environment Configuration

Create a `.env.local` file in your project root:

```env
# Database Configuration
DATABASE_URL=postgresql://usability_user:your_password@localhost:5432/usability_testing

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/usability-testing

# Optional: Webhook Configuration
WEBHOOK_SECRET=your-webhook-secret-here
NOTIFICATION_EMAIL=admin@example.com
```

## API Endpoints

The system provides the following API endpoints:

### Sessions
- `POST /api/usability-testing/sessions` - Create new session
- `GET /api/usability-testing/sessions` - List sessions (with pagination/filters)
- `GET /api/usability-testing/sessions/[id]` - Get session details
- `PATCH /api/usability-testing/sessions/[id]` - Update session status

### Form Submissions
- `POST /api/usability-testing/submit` - Submit form data

### Data Export
- `GET /api/usability-testing/export` - Export data (CSV/JSON)

### Webhooks
- `POST /api/usability-testing/webhook` - Webhook endpoint
- `GET /api/usability-testing/webhook` - Webhook configuration

### Health Check
- `GET /api/usability-testing/health` - System health status

## Client-Side Integration

### Enhanced Session Manager

The system includes an enhanced session manager (`session-manager-enhanced.js`) that:
- Maintains backward compatibility with localStorage
- Automatically syncs data with the API
- Provides fallback to localStorage when API is unavailable
- Handles retry logic and error recovery

### API Client

The API client (`api-client.js`) provides:
- Easy-to-use methods for all API operations
- Automatic retry logic
- Error handling and fallback mechanisms
- File download utilities

## Usage

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Access the Admin Dashboard

Navigate to: `http://localhost:3000/usability-testing/admin-start.html`

The enhanced dashboard includes:
- Real-time API status monitoring
- Session filtering and pagination
- Export functionality
- Notification center
- Toggle between API and local storage modes

### 3. Create a Test Session

1. Enter a participant ID
2. Click "Create Session"
3. The system will create both local and API sessions
4. Share the generated URL with test participants

### 4. Monitor Sessions

The dashboard automatically refreshes and shows:
- Session status (in_progress, completed, abandoned)
- Form completion progress
- Real-time notifications
- Export options

## Migration from Local Storage

The system is designed for gradual migration:

1. **Phase 1**: Both localStorage and API run in parallel
2. **Phase 2**: API becomes primary, localStorage as backup
3. **Phase 3**: Full API migration (optional localStorage cleanup)

### Data Migration

To migrate existing localStorage data:

```javascript
// In browser console on admin dashboard
const sessions = sessionManager.getAllSessions();
sessions.forEach(async (session) => {
    try {
        // Create API session
        const apiResponse = await window.usabilityAPI.createSession(
            session.participantId,
            { migrated_from_local: true }
        );
        
        if (apiResponse.success) {
            // Sync form data
            await window.usabilityAPI.syncLocalData(
                session.sessionId,
                apiResponse.data.session.id
            );
            console.log(`Migrated session: ${session.sessionId}`);
        }
    } catch (error) {
        console.error(`Failed to migrate session ${session.sessionId}:`, error);
    }
});
```

## Deployment

### 1. Database Setup (Production)

```bash
# Set up production database
DATABASE_URL=postgresql://user:pass@your-db-host:5432/usability_testing
```

### 2. Environment Variables

```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com/api/usability-testing
```

### 3. Deploy to AWS

The system is designed to work with your existing AWS infrastructure:
- Use AWS RDS for PostgreSQL
- Deploy Next.js app to AWS (Vercel, AWS Amplify, or EC2)
- Configure environment variables in your deployment platform

## Monitoring and Maintenance

### Health Checks

The system includes built-in health monitoring:
- Database connectivity checks
- API response time monitoring
- Session statistics
- Error logging

### Cleanup Tasks

The database includes automated cleanup functions:
- Expired session removal (after 7 days)
- Notification cleanup
- Performance optimization

### Backup Strategy

Recommended backup approach:
1. Regular PostgreSQL database backups
2. Export critical data via API endpoints
3. Monitor storage usage and performance

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify database credentials
   - Ensure database is running

2. **API Not Responding**
   - Check Next.js server logs
   - Verify API routes are accessible
   - Test with health check endpoint

3. **Session Sync Issues**
   - Check browser console for errors
   - Verify API client is loaded
   - Test with network tab open

### Debug Mode

Enable debug logging:

```javascript
// In browser console
localStorage.setItem('debug', 'true');
// Reload page to see detailed logs
```

## Security Considerations

- Database credentials should be stored securely
- API endpoints should be protected in production
- Webhook endpoints should validate signatures
- Consider rate limiting for API endpoints
- Regular security updates for dependencies

## Future Enhancements

Planned features:
- Email notifications via AWS SES
- Advanced analytics and reporting
- User authentication and authorization
- Multi-tenant support
- Real-time collaboration features

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console logs
3. Test API endpoints directly
4. Check database connectivity
5. Verify environment configuration

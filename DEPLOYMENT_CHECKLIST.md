# Deployment Checklist

## Pre-Deployment Setup

### 1. Database Setup
- [ ] Create PostgreSQL database on AWS RDS
- [ ] Run database schema (`lib/db/schema.sql`)
- [ ] Test database connectivity
- [ ] Set up database backups
- [ ] Configure connection pooling

### 2. Environment Configuration
- [ ] Set `DATABASE_URL` environment variable
- [ ] Set `NODE_ENV=production`
- [ ] Configure `NEXT_PUBLIC_API_BASE_URL`
- [ ] Set up webhook secrets (if using)
- [ ] Configure notification email (if using)

### 3. Code Verification
- [ ] All TypeScript files compile without errors
- [ ] API routes are properly configured
- [ ] Client-side scripts are included
- [ ] CSS styles are applied correctly
- [ ] No linting errors

## Testing

### 1. Local Testing
- [ ] Run `node test-api.js` to test API endpoints
- [ ] Test session creation and management
- [ ] Test form submission flow
- [ ] Test export functionality
- [ ] Test admin dashboard features

### 2. Integration Testing
- [ ] Test localStorage fallback when API is unavailable
- [ ] Test session migration from localStorage to API
- [ ] Test error handling and recovery
- [ ] Test real-time updates
- [ ] Test notification system

### 3. Performance Testing
- [ ] Test with multiple concurrent sessions
- [ ] Test database performance under load
- [ ] Test API response times
- [ ] Test export performance with large datasets

## Deployment Steps

### 1. AWS RDS Setup
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier usability-testing-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password your-secure-password \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxxxxxx
```

### 2. Database Migration
```bash
# Connect to RDS and run schema
psql -h your-rds-endpoint.amazonaws.com -U admin -d postgres -f lib/db/schema.sql
```

### 3. Environment Variables
Set in your deployment platform (Vercel, AWS Amplify, etc.):
```
DATABASE_URL=postgresql://admin:password@your-rds-endpoint.amazonaws.com:5432/postgres
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com/api/usability-testing
```

### 4. Deploy Application
- [ ] Deploy to your chosen platform
- [ ] Verify all environment variables are set
- [ ] Test API endpoints are accessible
- [ ] Test admin dashboard loads correctly

## Post-Deployment Verification

### 1. API Health Check
```bash
curl https://your-domain.com/api/usability-testing/health
```

### 2. Create Test Session
- [ ] Access admin dashboard
- [ ] Create a test session
- [ ] Verify session appears in database
- [ ] Test form submission

### 3. Monitor System
- [ ] Check application logs
- [ ] Monitor database performance
- [ ] Verify error handling
- [ ] Test backup procedures

## Security Checklist

### 1. Database Security
- [ ] Database is not publicly accessible
- [ ] Strong passwords are used
- [ ] SSL connections are enforced
- [ ] Regular security updates

### 2. API Security
- [ ] API endpoints are properly secured
- [ ] Input validation is in place
- [ ] Rate limiting is configured
- [ ] Error messages don't leak sensitive info

### 3. Application Security
- [ ] HTTPS is enforced
- [ ] CORS is properly configured
- [ ] Environment variables are secure
- [ ] Dependencies are up to date

## Monitoring and Maintenance

### 1. Monitoring Setup
- [ ] Set up application monitoring (e.g., Sentry)
- [ ] Set up database monitoring
- [ ] Set up uptime monitoring
- [ ] Configure alerting

### 2. Backup Strategy
- [ ] Automated database backups
- [ ] Test backup restoration
- [ ] Document recovery procedures
- [ ] Set up backup monitoring

### 3. Maintenance Tasks
- [ ] Schedule regular database cleanup
- [ ] Monitor storage usage
- [ ] Update dependencies regularly
- [ ] Review and rotate secrets

## Rollback Plan

### 1. Database Rollback
- [ ] Document current database state
- [ ] Test rollback procedures
- [ ] Have backup restoration plan

### 2. Application Rollback
- [ ] Keep previous deployment version
- [ ] Test rollback deployment
- [ ] Document rollback steps

### 3. Data Migration Rollback
- [ ] Keep localStorage as fallback
- [ ] Test fallback functionality
- [ ] Document migration rollback

## Success Criteria

- [ ] All API endpoints respond correctly
- [ ] Admin dashboard loads and functions properly
- [ ] Session creation and management works
- [ ] Form submission and data storage works
- [ ] Export functionality works
- [ ] Real-time updates work
- [ ] Error handling works correctly
- [ ] Performance meets requirements
- [ ] Security requirements are met
- [ ] Monitoring is in place

## Troubleshooting

### Common Issues
1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify RDS security groups
   - Test connectivity from deployment environment

2. **API Not Responding**
   - Check Next.js server logs
   - Verify environment variables
   - Test API endpoints directly

3. **Client-Side Errors**
   - Check browser console
   - Verify script loading
   - Test localStorage fallback

### Support Contacts
- Database issues: AWS RDS support
- Application issues: Development team
- Deployment issues: Platform support

## Documentation Updates

- [ ] Update README with new setup instructions
- [ ] Document API endpoints
- [ ] Update user guides
- [ ] Create troubleshooting guide
- [ ] Update deployment documentation

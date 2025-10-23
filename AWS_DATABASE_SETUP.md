# AWS RDS PostgreSQL Setup Guide

Complete step-by-step guide to set up PostgreSQL database on AWS RDS for the Usability Testing project.

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured (optional but recommended)
- Basic understanding of AWS services

## Step 1: Access AWS RDS Console

1. **Log into AWS Console**
   - Go to [AWS Console](https://console.aws.amazon.com)
   - Sign in with your AWS account

2. **Navigate to RDS**
   - In the AWS services search bar, type "RDS"
   - Click on "RDS" under Database services
   - You should see the RDS Dashboard

## Step 2: Create Database Instance

### 2.1 Start Database Creation

1. **Click "Create database"**
   - On the RDS Dashboard, click the orange "Create database" button

2. **Choose Database Creation Method**
   - Select "Standard create" (recommended for full control)
   - Click "Next"

### 2.2 Engine Configuration

1. **Select Engine Type**
   - Choose "PostgreSQL"
   - Version: Select the latest stable version (e.g., PostgreSQL 15.x)

2. **Templates**
   - For development/testing: Choose "Free tier" (if eligible)
   - For production: Choose "Production" or "Dev/Test"

### 2.3 Settings

1. **DB Instance Identifier**
   ```
   usability-testing-db
   ```

2. **Master Username**
   ```
   admin
   ```

3. **Master Password**
   - Create a strong password (minimum 8 characters)
   - **Important**: Save this password securely!
   - Example: `UsabilityTest2024!Secure`

### 2.4 Instance Configuration

1. **DB Instance Class**
   - **Free Tier**: `db.t3.micro` (1 vCPU, 1 GB RAM)
   - **Production**: `db.t3.small` or larger
   - **Cost**: ~$15-25/month for t3.small

2. **Storage**
   - **Storage Type**: General Purpose SSD (gp2)
   - **Allocated Storage**: 20 GB (minimum)
   - **Storage Autoscaling**: Enable (recommended)
   - **Maximum Storage**: 100 GB

### 2.5 Connectivity

1. **VPC and Subnet Group**
   - **VPC**: Default VPC (or create custom)
   - **Subnet Group**: Default (or create custom)

2. **Public Access**
   - **Publicly Accessible**: Yes (for easier setup)
   - **Note**: We'll secure this with security groups

3. **VPC Security Groups**
   - **Create New**: Yes
   - **Security Group Name**: `usability-testing-sg`

4. **Database Port**
   - **Port**: 5432 (default PostgreSQL port)

### 2.6 Database Authentication

1. **Database Authentication**
   - Choose "Password authentication"

### 2.7 Additional Configuration

1. **Initial Database Name**
   ```
   usability_testing
   ```

2. **Backup**
   - **Backup Retention Period**: 7 days (free tier) or 30 days (production)
   - **Backup Window**: Choose a time when usage is low
   - **Copy Tags to Snapshots**: Yes

3. **Monitoring**
   - **Enable Enhanced Monitoring**: No (to save costs)
   - **Enable Performance Insights**: No (to save costs)

4. **Maintenance**
   - **Auto Minor Version Upgrade**: Yes
   - **Maintenance Window**: Choose a time when usage is low

5. **Deletion Protection**
   - **Enable Deletion Protection**: Yes (recommended for production)

## Step 3: Create and Configure Security Group

### 3.1 Create Security Group

1. **Navigate to EC2 Console**
   - Go to EC2 service in AWS Console
   - Click "Security Groups" in the left sidebar

2. **Create Security Group**
   - Click "Create security group"
   - **Name**: `usability-testing-sg`
   - **Description**: `Security group for usability testing database`

3. **Inbound Rules**
   - **Type**: PostgreSQL
   - **Protocol**: TCP
   - **Port**: 5432
   - **Source**: Your IP address (for development)
   - **Source**: 0.0.0.0/0 (for production - less secure but easier)

4. **Outbound Rules**
   - Keep default (All traffic, All ports, 0.0.0.0/0)

5. **Click "Create security group"**

### 3.2 Update RDS Security Group

1. **Go back to RDS Console**
2. **Find your database instance**
3. **Click on the instance name**
4. **Go to "Connectivity & security" tab**
5. **Click on the security group link**
6. **Edit inbound rules** if needed

## Step 4: Wait for Database Creation

1. **Database Status**
   - Initial status: "Creating"
   - Wait time: 5-15 minutes
   - Status will change to "Available"

2. **Get Connection Details**
   - Note the **Endpoint** (e.g., `usability-testing-db.xxxxx.us-east-1.rds.amazonaws.com`)
   - Note the **Port** (5432)
   - Note the **Database name** (usability_testing)

## Step 5: Test Database Connection

### 5.1 Install PostgreSQL Client (if not already installed)

**On macOS:**
```bash
brew install postgresql
```

**On Windows:**
- Download from [PostgreSQL website](https://www.postgresql.org/download/windows/)

**On Linux:**
```bash
sudo apt-get install postgresql-client
```

### 5.2 Test Connection

```bash
psql -h your-endpoint.amazonaws.com -U admin -d usability_testing -p 5432
```

- Enter your master password when prompted
- You should see: `usability_testing=>`

### 5.3 Exit psql
```sql
\q
```

## Step 6: Run Database Schema

### 6.1 Download Schema File

The schema file is already created at: `lib/db/schema.sql`

### 6.2 Run Schema

```bash
psql -h your-endpoint.amazonaws.com -U admin -d usability_testing -f lib/db/schema.sql
```

### 6.3 Verify Tables Created

```bash
psql -h your-endpoint.amazonaws.com -U admin -d usability_testing
```

```sql
\dt
```

You should see:
- sessions
- form_submissions
- notifications

```sql
\q
```

## Step 7: Configure Environment Variables

### 7.1 Create .env.local File

Create `.env.local` in your project root:

```env
# Database Configuration
DATABASE_URL=postgresql://admin:your-password@your-endpoint.amazonaws.com:5432/usability_testing

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/usability-testing

# Optional: Webhook Configuration
WEBHOOK_SECRET=your-webhook-secret-here
NOTIFICATION_EMAIL=admin@example.com
```

### 7.2 Replace Placeholders

- Replace `your-password` with your actual master password
- Replace `your-endpoint.amazonaws.com` with your actual RDS endpoint
- Replace `your-webhook-secret-here` with a secure random string

## Step 8: Test API Connection

### 8.1 Start Development Server

```bash
npm run dev
```

### 8.2 Test API Endpoints

```bash
node test-api.js
```

You should see:
```
🧪 Testing Usability Testing API...

1. Testing Health Check...
✅ Health Check: PASS
   Status: healthy

2. Testing Session Creation...
✅ Session Creation: PASS
   Session ID: uuid-string

3. Testing Session Retrieval...
✅ Session Retrieval: PASS
   Participant: TEST_P001
```

## Step 9: Production Considerations

### 9.1 Security Best Practices

1. **Use Private Subnets**
   - Move database to private subnet
   - Use NAT Gateway for outbound access

2. **Restrict Security Group**
   - Only allow access from your application servers
   - Remove 0.0.0.0/0 access

3. **Enable SSL**
   - Force SSL connections
   - Update connection string with `?sslmode=require`

4. **Use IAM Database Authentication**
   - Create IAM users for database access
   - More secure than password authentication

### 9.2 Monitoring and Backup

1. **Enable CloudWatch Logs**
   - Monitor database performance
   - Set up alerts for issues

2. **Automated Backups**
   - Enable point-in-time recovery
   - Test backup restoration

3. **Performance Insights**
   - Enable for production databases
   - Monitor query performance

## Step 10: Cost Optimization

### 10.1 Development Environment

- Use `db.t3.micro` (free tier eligible)
- Disable unnecessary features
- Use single AZ deployment

### 10.2 Production Environment

- Use `db.t3.small` or larger
- Enable Multi-AZ for high availability
- Use Reserved Instances for cost savings

### 10.3 Estimated Costs

**Development (t3.micro):**
- Free tier: $0/month (first 12 months)
- After free tier: ~$15/month

**Production (t3.small):**
- ~$25-35/month
- + Storage costs: ~$2-5/month
- + Backup costs: ~$1-3/month

## Troubleshooting

### Common Issues

1. **Connection Timeout**
   - Check security group rules
   - Verify VPC configuration
   - Check if database is publicly accessible

2. **Authentication Failed**
   - Verify username and password
   - Check if user exists in database
   - Verify database name

3. **Permission Denied**
   - Check security group inbound rules
   - Verify source IP address
   - Check if port 5432 is open

4. **Database Not Found**
   - Verify database name in connection string
   - Check if database was created successfully
   - Verify you're connecting to the right instance

### Useful Commands

```bash
# Test connection
psql -h endpoint -U username -d database -p 5432

# List databases
psql -h endpoint -U username -d postgres -c "\l"

# List tables
psql -h endpoint -U username -d database -c "\dt"

# Check connection info
psql -h endpoint -U username -d database -c "SELECT version();"
```

## Security Checklist

- [ ] Strong master password set
- [ ] Security group restricts access
- [ ] Database in private subnet (production)
- [ ] SSL connections enabled
- [ ] Regular security updates
- [ ] Backup and recovery tested
- [ ] Monitoring and alerting configured
- [ ] Access logs reviewed regularly

## Next Steps

1. **Test the setup** with the provided test script
2. **Configure your application** with the DATABASE_URL
3. **Deploy to production** following the deployment checklist
4. **Set up monitoring** and alerting
5. **Plan for scaling** as your usage grows

## Support Resources

- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [AWS RDS Pricing](https://aws.amazon.com/rds/pricing/)
- [AWS Support](https://aws.amazon.com/support/)

---

**Important Notes:**
- Keep your database credentials secure
- Regularly update your database
- Monitor costs and usage
- Test backups regularly
- Follow AWS security best practices

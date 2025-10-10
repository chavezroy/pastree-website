import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import { categories } from '@/content/support/categories';

// Sample article content (in real app, this would be loaded from MDX files or CMS)
const articleContent: Record<string, Record<string, { title: string; content: string; updatedAt: string; imageUrl?: string }>> = {
  installation: {
    'install-extension': {
      title: 'How to install Pastree browser extension',
      updatedAt: '2024-12-15',
      imageUrl: '/support/images/context-menu-group.svg',
      content: `
# Installing Pastree Browser Extension

Follow these simple steps to install Pastree on your browser.

## For Chrome Users

1. **Visit the Chrome Web Store**
   - Go to [Chrome Web Store](https://chrome.google.com/webstore)
   - Search for "Pastree"

2. **Add to Chrome**
   - Click "Add to Chrome"
   - Confirm the installation

3. **Pin the Extension**
   - Click the puzzle piece icon in your toolbar
   - Pin Pastree for easy access

## For Firefox Users

1. **Visit Firefox Add-ons**
   - Go to [Firefox Add-ons](https://addons.mozilla.org)
   - Search for "Pastree"

2. **Add to Firefox**
   - Click "Add to Firefox"
   - Confirm the installation

## First Launch

After installation, click the Pastree icon in your browser toolbar to get started. You'll be guided through a quick setup process.

## Need Help?

If you encounter any issues during installation, check our [troubleshooting guide](/support/troubleshooting/common-issues) or contact support.
      `
    },
    'first-time-setup': {
      title: 'First time setup and configuration',
      updatedAt: '2024-12-10',
      content: `
# First Time Setup

Welcome to Pastree! Let's get you set up in just a few minutes.

## Step 1: Create Your First List

1. Click the Pastree icon in your browser
2. Click "Create New List"
3. Give your list a name (e.g., "Email Templates")
4. Add your first clipboard item

## Step 2: Organize Your Content

- **Create Categories**: Group related items together
- **Use Tags**: Add tags for easy searching
- **Set Favorites**: Mark frequently used items

## Step 3: Customize Settings

- **Auto-sync**: Enable to sync across devices
- **Keyboard Shortcuts**: Set up hotkeys for quick access
- **Privacy**: Configure what data to store

## Pro Tips

- Use descriptive names for your lists
- Regularly clean up old items
- Take advantage of keyboard shortcuts

Ready to start organizing your clipboard? Check out our [usage guide](/support/usage/manage-lists)!
      `
    },
    'complete-setup-guide': {
      title: 'Complete installation and setup guide',
      updatedAt: '2024-12-16',
      imageUrl: '/support/images/install-extension.png',
      content: `
# Complete Installation and Setup Guide

Get Pastree up and running on your system with this comprehensive guide covering everything from installation to advanced configuration.

## System Requirements

### Supported Browsers
- **Chrome**: Version 88 or higher
- **Firefox**: Version 78 or higher
- **Edge**: Version 88 or higher
- **Safari**: Version 14 or higher (macOS 11+)

### Operating Systems
- **Windows**: 10 or higher
- **macOS**: 10.15 or higher
- **Linux**: Ubuntu 18.04+ or equivalent

## Installation Methods

### Method 1: Browser Extension Stores (Recommended)

#### Chrome Installation
1. **Open Chrome Web Store**
   - Go to [Chrome Web Store](https://chrome.google.com/webstore)
   - Search for "Pastree" or visit our direct link

2. **Install Extension**
   - Click "Add to Chrome"
   - Review permissions carefully
   - Click "Add extension" to confirm

3. **Pin Extension**
   - Click the puzzle piece icon in Chrome toolbar
   - Find Pastree and click the pin icon
   - Pastree icon will now appear in your toolbar

#### Firefox Installation
1. **Open Firefox Add-ons**
   - Go to [Firefox Add-ons](https://addons.mozilla.org)
   - Search for "Pastree"

2. **Install Add-on**
   - Click "Add to Firefox"
   - Review permissions
   - Click "Add" to confirm

3. **Pin Add-on**
   - Click the puzzle piece icon in Firefox toolbar
   - Pin Pastree for easy access

#### Edge Installation
1. **Open Microsoft Edge Add-ons**
   - Go to [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons)
   - Search for "Pastree"

2. **Install Extension**
   - Click "Get" button
   - Review permissions
   - Click "Add extension"

### Method 2: Manual Installation (Advanced Users)

#### Chrome/Edge Manual Install
1. **Download Extension File**
   - Download the .crx file from our website
   - Save to your Downloads folder

2. **Enable Developer Mode**
   - Go to chrome://extensions/
   - Toggle "Developer mode" ON

3. **Load Extension**
   - Click "Load unpacked"
   - Select the Pastree folder
   - Extension will be installed

#### Firefox Manual Install
1. **Download XPI File**
   - Download the .xpi file from our website

2. **Install Temporarily**
   - Go to about:addons
   - Click gear icon → "Install Add-on From File"
   - Select the .xpi file

## Initial Setup

### First Launch
1. **Click Pastree Icon**
   - Click the Pastree icon in your browser toolbar
   - Welcome screen will appear

2. **Accept Terms**
   - Read and accept the Terms of Service
   - Review Privacy Policy
   - Click "Get Started"

3. **Choose Setup Type**
   - **Quick Setup**: Use default settings
   - **Custom Setup**: Configure advanced options

### Quick Setup (Recommended for Beginners)

1. **Create Account (Optional)**
   - Sign up with email for cloud sync
   - Or skip to use local storage only

2. **Set Basic Preferences**
   - Choose your theme (Light/Dark)
   - Set notification preferences
   - Enable auto-save

3. **Create First List**
   - Name your first list (e.g., "Work Templates")
   - Add a few sample items
   - Test the copy/paste functionality

### Custom Setup (Advanced Users)

1. **Privacy Settings**
   - **Local Only**: All data stays on your device
   - **Cloud Sync**: Sync across devices (requires account)
   - **Selective Sync**: Choose what to sync

2. **Security Configuration**
   - Enable data encryption
   - Set auto-clear intervals
   - Configure password protection

3. **Performance Tuning**
   - Set cache size limits
   - Configure background sync
   - Choose compression settings

4. **Integration Settings**
   - Enable browser integration features
   - Set up API access
   - Configure export formats

## Essential Configuration

### Keyboard Shortcuts
Set up these essential shortcuts for maximum productivity:

| Shortcut | Action | Description |
|----------|--------|-------------|
| \`Ctrl+Shift+P\` | Open Pastree | Quick access to main interface |
| \`Ctrl+Shift+V\` | Paste from Pastree | Paste selected item |
| \`Ctrl+Shift+A\` | Add to Pastree | Add current selection |
| \`Ctrl+Shift+S\` | Search Pastree | Quick search |

### Notification Settings
Configure when and how you receive notifications:

- **Desktop Notifications**: Enable/disable popup notifications
- **Sound Alerts**: Audio feedback for actions
- **Visual Indicators**: Status indicators in browser
- **Email Alerts**: Important updates via email

### Sync Configuration
If using cloud sync, configure these settings:

- **Sync Frequency**: Real-time, hourly, or manual
- **Data Selection**: Choose what to sync
- **Conflict Resolution**: How to handle data conflicts
- **Offline Mode**: Behavior when offline

## Creating Your First Lists

### Basic List Creation
1. **Open Pastree**
   - Click the Pastree icon
   - Click "New List" button

2. **Configure List**
   - Enter descriptive name
   - Choose category (optional)
   - Set privacy level

3. **Add Items**
   - Click "Add Item"
   - Paste or type content
   - Add tags for organization

### Advanced List Organization
- **Categories**: Group related lists
- **Tags**: Cross-list organization
- **Favorites**: Quick access items
- **Templates**: Reusable content

## Testing Your Installation

### Basic Functionality Test
1. **Copy Test**
   - Copy some text from any website
   - Check if it appears in Pastree

2. **Paste Test**
   - Open Pastree
   - Click on an item
   - Verify it pastes correctly

3. **Search Test**
   - Use the search function
   - Verify results are accurate

### Advanced Features Test
1. **Keyboard Shortcuts**
   - Test all configured shortcuts
   - Verify they work in different contexts

2. **Sync Test** (if enabled)
   - Add item on one device
   - Check if it appears on another

3. **Performance Test**
   - Add many items
   - Check loading speed
   - Monitor memory usage

## Troubleshooting Common Issues

### Installation Problems
- **Permission Denied**: Check browser security settings
- **Installation Fails**: Try incognito mode
- **Extension Disabled**: Re-enable in browser settings

### Functionality Issues
- **Clipboard Not Working**: Check permissions
- **Shortcuts Not Working**: Check for conflicts
- **Sync Not Working**: Verify internet connection

### Performance Issues
- **Slow Loading**: Clear cache and restart
- **High Memory Usage**: Reduce stored items
- **Crashes**: Update browser and extension

## Next Steps

### Learn More
- [Creating and managing lists](/support/usage/manage-lists)
- [Keyboard shortcuts guide](/support/usage/keyboard-shortcuts)
- [Settings and preferences](/support/settings/preferences)

### Get Help
- [Common issues and solutions](/support/troubleshooting/common-issues)
- [Contact support](/support)
- [Community forum](https://community.pastree.com)

### Advanced Features
- [API integration](/support/settings/api-access)
- [Custom themes](/support/settings/themes)
- [Automation rules](/support/usage/automation)

## Security Best Practices

### Data Protection
- **Regular Backups**: Export your data regularly
- **Strong Passwords**: Use unique, strong passwords
- **Two-Factor Authentication**: Enable if available
- **Regular Updates**: Keep Pastree and browser updated

### Privacy Considerations
- **Review Permissions**: Only grant necessary permissions
- **Local Storage**: Consider using local-only mode
- **Data Retention**: Set appropriate retention periods
- **Clear Sensitive Data**: Regularly clear sensitive items

## Support and Resources

### Getting Help
- **Documentation**: Comprehensive guides and tutorials
- **Video Tutorials**: Step-by-step video guides
- **Community Forum**: User discussions and tips
- **Direct Support**: Email support for complex issues

### Staying Updated
- **Release Notes**: New features and improvements
- **Security Updates**: Important security patches
- **Feature Requests**: Suggest new functionality
- **Beta Testing**: Try new features early

Congratulations! You now have Pastree fully installed and configured. Start organizing your clipboard content and enjoy a more productive workflow!
      `
    }
  },
  usage: {
    'manage-lists': {
      title: 'Creating and managing clipboard lists',
      updatedAt: '2024-12-12',
      content: `
# Managing Clipboard Lists

Learn how to organize your clipboard items effectively with Pastree.

## Creating Lists

1. **From the Extension**
   - Click the Pastree icon
   - Select "New List"
   - Enter a descriptive name

2. **From Context Menu**
   - Right-click on any text
   - Select "Add to Pastree"
   - Choose or create a list

## Organizing Content

### Categories
- Group related lists together
- Use clear, descriptive names
- Keep categories broad but meaningful

### Tags
- Add multiple tags to items
- Use consistent naming conventions
- Search by tags for quick access

### Favorites
- Mark frequently used items
- Access favorites from the quick menu
- Sync favorites across devices

## Best Practices

- **Regular Cleanup**: Remove outdated items monthly
- **Descriptive Names**: Use clear, searchable titles
- **Consistent Organization**: Stick to your naming conventions
- **Backup Important Items**: Export critical lists regularly

## Keyboard Shortcuts

- \`Ctrl+Shift+P\`: Open Pastree
- \`Ctrl+Shift+V\`: Paste from Pastree
- \`Ctrl+Shift+A\`: Add current selection

Need more help? Check our [keyboard shortcuts guide](/support/usage/keyboard-shortcuts).
      `
    },
    'keyboard-shortcuts': {
      title: 'Keyboard shortcuts and hotkeys',
      updatedAt: '2024-12-08',
      content: `
# Keyboard Shortcuts

Speed up your workflow with these essential keyboard shortcuts.

## Global Shortcuts

| Shortcut | Action |
|----------|--------|
| \`Ctrl+Shift+P\` | Open Pastree |
| \`Ctrl+Shift+V\` | Paste from Pastree |
| \`Ctrl+Shift+A\` | Add selection to Pastree |
| \`Ctrl+Shift+S\` | Search Pastree |

## Within Pastree

| Shortcut | Action |
|----------|--------|
| \`Escape\` | Close Pastree |
| \`Enter\` | Paste selected item |
| \`Delete\` | Remove selected item |
| \`Ctrl+N\` | Create new list |
| \`Ctrl+F\` | Focus search |

## Customizing Shortcuts

1. Click the Pastree icon
2. Go to Settings
3. Select "Keyboard Shortcuts"
4. Click on any shortcut to change it
5. Press your desired key combination

## Pro Tips

- Use consistent shortcuts across applications
- Avoid conflicts with browser shortcuts
- Test shortcuts after changing them
- Keep a reference card handy

## Troubleshooting

If shortcuts aren't working:
- Check for conflicts with other extensions
- Ensure Pastree has necessary permissions
- Try restarting your browser

Need help with setup? See our [installation guide](/support/installation/first-time-setup).
      `
    }
  },
  settings: {
    'preferences': {
      title: 'Customizing preferences and settings',
      updatedAt: '2024-12-14',
      content: `
# Customizing Preferences and Settings

Personalize Pastree to match your workflow and preferences.

## General Settings

### Appearance
- **Theme**: Choose between light and dark themes
- **Font Size**: Adjust text size for better readability
- **Compact Mode**: Enable for smaller interface

### Behavior
- **Auto-save**: Automatically save clipboard items
- **Notifications**: Enable/disable desktop notifications
- **Startup**: Launch Pastree with your browser

## Privacy Settings

### Data Storage
- **Local Storage**: Keep data on your device only
- **Cloud Sync**: Sync across devices (requires account)
- **Data Retention**: Set how long to keep old items

### Security
- **Encryption**: Encrypt sensitive clipboard data
- **Auto-clear**: Automatically clear clipboard after use
- **Password Protection**: Require password for access

## Sync Settings

### Account Management
- **Sign In**: Connect your Pastree account
- **Sign Out**: Disconnect and use local storage only
- **Account Settings**: Manage your profile and preferences

### Sync Options
- **Real-time Sync**: Instant synchronization across devices
- **Manual Sync**: Sync only when requested
- **Selective Sync**: Choose which lists to sync

## Advanced Settings

### Performance
- **Cache Size**: Limit local storage usage
- **Background Sync**: Sync when browser is idle
- **Compression**: Compress data to save space

### Integration
- **Browser Integration**: Deep browser integration features
- **API Access**: Enable API for third-party tools
- **Export Options**: Choose export formats

## Troubleshooting Settings

If you're having issues:
- **Reset Settings**: Restore default configuration
- **Clear Cache**: Remove temporary data
- **Debug Mode**: Enable detailed logging

Need help with specific settings? Check our [troubleshooting guide](/support/troubleshooting/common-issues).
      `
    },
    'sync-settings': {
      title: 'Sync and backup settings',
      updatedAt: '2024-12-11',
      content: `
# Sync and Backup Settings

Keep your data safe and synced across all your devices.

## Setting Up Sync

### Create Account
1. Click the Pastree icon in your browser
2. Select "Sign In" or "Create Account"
3. Enter your email and create a password
4. Verify your email address

### Enable Sync
1. Go to Settings → Sync
2. Toggle "Enable Cloud Sync"
3. Choose sync frequency
4. Select which data to sync

## Sync Options

### Real-time Sync
- **Instant Updates**: Changes appear immediately on all devices
- **Best For**: Active users with multiple devices
- **Requirements**: Stable internet connection

### Scheduled Sync
- **Periodic Updates**: Sync at set intervals
- **Best For**: Users with limited bandwidth
- **Options**: Every 15 minutes, hourly, or daily

### Manual Sync
- **On-demand**: Sync only when you request it
- **Best For**: Users with privacy concerns
- **Control**: Full control over when data syncs

## Backup Options

### Automatic Backups
- **Daily Backups**: Automatic daily backups
- **Weekly Backups**: Weekly full backups
- **Monthly Archives**: Long-term storage

### Manual Backups
- **Export Data**: Download your data as JSON
- **Import Data**: Restore from backup file
- **Selective Backup**: Choose specific lists to backup

## Data Management

### What Gets Synced
- **Clipboard Lists**: All your organized lists
- **Settings**: Your preferences and configuration
- **Tags and Categories**: Your organizational structure
- **Favorites**: Your starred items

### What Stays Local
- **Temporary Items**: Items marked as temporary
- **Private Lists**: Lists marked as private
- **Cache Data**: Temporary browser data

## Troubleshooting Sync Issues

### Common Problems
- **Sync Not Working**: Check internet connection
- **Missing Data**: Verify account login
- **Slow Sync**: Check network speed
- **Conflicts**: Resolve data conflicts

### Solutions
1. **Restart Sync**: Disable and re-enable sync
2. **Clear Cache**: Remove temporary sync data
3. **Re-authenticate**: Sign out and sign back in
4. **Contact Support**: Get help with persistent issues

## Security and Privacy

### Data Protection
- **Encryption**: All data encrypted in transit and at rest
- **Access Control**: Only you can access your data
- **Audit Logs**: Track all sync activities

### Privacy Options
- **Local Only**: Keep all data on your device
- **Selective Sync**: Choose what to sync
- **Auto-delete**: Remove old data automatically

Need help with sync setup? See our [installation guide](/support/installation/first-time-setup).
      `
    }
  },
  troubleshooting: {
    'common-issues': {
      title: 'Common issues and solutions',
      updatedAt: '2024-12-09',
      content: `
# Common Issues and Solutions

Quick fixes for the most frequently encountered problems.

## Installation Issues

### Extension Won't Install
**Problem**: Browser blocks the extension installation
**Solution**:
1. Check if your browser is up to date
2. Disable other clipboard extensions temporarily
3. Try installing in incognito/private mode
4. Clear browser cache and cookies

### Permission Denied
**Problem**: Extension requests too many permissions
**Solution**:
1. Review the permission request carefully
2. Grant only necessary permissions
3. Update to the latest version
4. Check browser security settings

## Functionality Issues

### Clipboard Not Working
**Problem**: Pastree doesn't capture clipboard items
**Solution**:
1. Check if Pastree is enabled in extensions
2. Verify clipboard permissions
3. Restart your browser
4. Try copying text manually first

### Lists Not Saving
**Problem**: Created lists disappear after browser restart
**Solution**:
1. Check if you're signed in to your account
2. Verify sync is enabled
3. Check browser storage permissions
4. Try creating a test list

### Search Not Working
**Problem**: Can't find items in search
**Solution**:
1. Check spelling and try different keywords
2. Clear search filters
3. Verify items are properly tagged
4. Try searching in specific lists

## Performance Issues

### Slow Loading
**Problem**: Pastree takes too long to open
**Solution**:
1. Clear browser cache
2. Disable other extensions temporarily
3. Check available memory
4. Update to latest version

### High Memory Usage
**Problem**: Pastree uses too much RAM
**Solution**:
1. Reduce number of stored items
2. Clear old clipboard history
3. Disable auto-sync if not needed
4. Restart browser regularly

## Sync Issues

### Data Not Syncing
**Problem**: Changes don't appear on other devices
**Solution**:
1. Check internet connection
2. Verify account login status
3. Force manual sync
4. Check sync settings

### Duplicate Items
**Problem**: Same items appear multiple times
**Solution**:
1. Check for multiple Pastree installations
2. Clear cache and re-sync
3. Remove duplicates manually
4. Contact support if persistent

## Browser-Specific Issues

### Chrome Issues
- Update Chrome to latest version
- Check extension permissions
- Disable conflicting extensions
- Clear Chrome cache

### Firefox Issues
- Update Firefox to latest version
- Check add-on permissions
- Disable other clipboard add-ons
- Clear Firefox cache

## Getting Additional Help

### Before Contacting Support
1. Try the solutions above
2. Note your browser version
3. Record error messages
4. Test in incognito mode

### Contact Information
- **Email**: support@pastree.com
- **Documentation**: Check our full guides
- **Community**: Join our user forum

### Provide When Contacting Support
- Browser name and version
- Pastree version
- Operating system
- Steps to reproduce the issue
- Screenshots if applicable

Still having issues? Check our [detailed troubleshooting guide](/support/troubleshooting/troubleshoot-sync).
      `
    },
    'troubleshoot-sync': {
      title: 'Troubleshooting clipboard sync issues',
      updatedAt: '2024-12-13',
      content: `
# Troubleshooting Clipboard Sync

Having trouble with clipboard synchronization? Here are common solutions.

## Common Issues

### Clipboard Not Working
1. **Check Permissions**
   - Ensure Pastree has clipboard access
   - Grant necessary browser permissions

2. **Restart the Extension**
   - Disable and re-enable Pastree
   - Refresh your browser

3. **Clear Cache**
   - Go to Pastree Settings
   - Click "Clear Cache"
   - Restart the extension

### Sync Problems
1. **Check Internet Connection**
   - Ensure stable internet access
   - Try disabling VPN temporarily

2. **Account Issues**
   - Verify you're logged in
   - Check account status

3. **Data Conflicts**
   - Clear local data
   - Re-sync from server

## Advanced Troubleshooting

### Browser-Specific Issues

**Chrome:**
- Check extension permissions
- Disable conflicting extensions
- Update Chrome to latest version

**Firefox:**
- Verify add-on permissions
- Check about:config settings
- Update Firefox

### System-Level Issues

**Windows:**
- Run as administrator
- Check Windows clipboard service
- Update system drivers

**macOS:**
- Check accessibility permissions
- Verify clipboard access
- Update system software

## Getting Help

If issues persist:
1. Check our [common issues guide](/support/troubleshooting/common-issues)
2. Contact support with:
   - Browser version
   - Pastree version
   - Error messages
   - Steps to reproduce

## Prevention

- Keep Pastree updated
- Regular data backups
- Monitor system resources
- Avoid conflicting software
      `
    }
  }
};

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categoryId, slug } = await params;
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    notFound();
  }

  const article = articleContent[categoryId]?.[slug];
  
  if (!article) {
    notFound();
  }

  // Check if the referenced image actually exists in /public before rendering it
  let hasImage = false;
  if (article.imageUrl) {
    const publicDir = path.join(process.cwd(), 'public');
    const imagePath = path.join(publicDir, article.imageUrl.replace(/^\//, ''));
    try {
      await fs.access(imagePath);
      hasImage = true;
    } catch {
      hasImage = false;
    }
  }

  return (
    <div className="min-h-screen bg-pastree-light">
      {/* Header */}
      <section className="bg-hero-support-gradient text-pastree-dark py-16">
        <div className="container mx-auto px-4">
          <nav className="mb-8">
            <Link href="/support" className="text-pastree-orange hover:text-pastree-orange-hover">
              ← Support
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/support/${categoryId}`} className="text-pastree-orange hover:text-pastree-orange-hover">
              {category.title}
            </Link>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-600">Last updated: {new Date(article.updatedAt).toLocaleDateString()}</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {hasImage ? (
              <div className="mb-8 relative w-full h-64 md:h-80 lg:h-96">
                <Image
                  src={article.imageUrl as string}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  className="object-cover rounded-lg shadow-lg"
                  priority={false}
                />
              </div>
            ) : (
              <div className="mb-8 w-full h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">No image available</p>
                </div>
              </div>
            )}
            
            <div className="prose prose-lg max-w-none">
              <div 
                className="bg-white rounded-xl p-8 shadow-sm"
                dangerouslySetInnerHTML={{ 
                  __html: article.content
                    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 text-gray-900">$1</h1>')
                    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-4 mt-8 text-gray-900">$1</h2>')
                    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-3 mt-6 text-gray-900">$1</h3>')
                    .replace(/^\d+\. \*\*(.*?)\*\*/gim, '<li class="mb-2"><strong>$1</strong>')
                    .replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>')
                    .replace(/^\| (.*?) \|/gim, '<tr><td class="border px-4 py-2">$1</td>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-pastree-orange hover:text-pastree-orange-hover underline">$1</a>')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^(?!<[h|l|t|d])/gm, '<p class="mb-4">')
                    .replace(/<p class="mb-4"><\/p>/g, '')
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static params for all articles
export async function generateStaticParams() {
  const params: Array<{ category: string; slug: string }> = [];
  
  Object.entries(articleContent).forEach(([category, articles]) => {
    Object.keys(articles).forEach(slug => {
      params.push({ category, slug });
    });
  });
  
  return params;
}

# Publications Auto-Update

This directory contains scripts to automatically fetch and update publication data from Google Scholar.

## Files

- `fetchPublications.js` - Script to scrape Google Scholar and update publications.json

## Usage

### Manual Update

Run the script manually:

```bash
yarn fetch-publications
# or
npm run fetch-publications
```

### Automatic Weekly Updates

The GitHub Actions workflow (`.github/workflows/update-publications.yml`) automatically:

1. Runs every Sunday at 2 AM UTC
2. Fetches latest publications from Google Scholar
3. Updates `data/publications.json`
4. Creates a Pull Request with changes (if any)

You can also trigger it manually from the GitHub Actions tab.

## Configuration

To change the Google Scholar profile:

1. Edit `scripts/fetchPublications.js`
2. Update the `SCHOLAR_URL` constant with your Google Scholar profile URL

```javascript
const SCHOLAR_URL = "https://scholar.google.com/citations?user=YOUR_USER_ID";
```

## Dependencies

- `axios` - HTTP client for fetching web pages
- `cheerio` - jQuery-like HTML parsing

## Data Structure

The script generates publications with the following fields:

```json
{
  "title": "Paper Title",
  "venue": "Conference/Journal Name",
  "authors": ["Author 1", "Author 2"],
  "year": 2025,
  "url": "https://scholar.google.com/...",
  "type": "conference|journal|preprint|other",
  "citations": 10
}
```

## Troubleshooting

If the script fails:

1. **Rate limiting**: Google Scholar may block automated requests. Wait a few hours before retrying.
2. **HTML structure changed**: Google Scholar's HTML may have changed. Update the cheerio selectors in `fetchPublications.js`.
3. **Network issues**: Check your internet connection and firewall settings.

## Notes

- Publications are sorted by year (most recent first)
- The script includes a `lastUpdated` timestamp in the JSON output
- Maximum 10 authors per publication to keep the data manageable

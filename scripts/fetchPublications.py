#!/usr/bin/env python3
"""
Fetch publications from Google Scholar and update publications.json
Fetches detailed author lists for recent publications (last 2 years)
"""

import json
import urllib.request
import urllib.error
import re
import time
import html
from datetime import datetime
from pathlib import Path

SCHOLAR_URL = 'https://scholar.google.com/citations?user=0MTk8e4AAAAJ&hl=en&cstart=0&pagesize=100&sortby=pubdate'
SCHOLAR_BASE = 'https://scholar.google.com'
OUTPUT_FILE = Path(__file__).parent.parent / 'data' / 'publications.json'
CURRENT_YEAR = datetime.now().year
FETCH_DETAILED_YEARS = 2  # Fetch detailed authors for last N years


def normalize_author_name(author):
    """Normalize author name variations"""
    author = author.strip()
    # Replace "GK Kurt" with "G Karabulut Kurt"
    if author == "GK Kurt":
        return "G Karabulut Kurt"
    # Replace "G Karabulut-Kurt" with "G Karabulut Kurt" (remove hyphen)
    if author == "G Karabulut-Kurt":
        return "G Karabulut Kurt"
    return author


def fetch_detailed_authors(citation_url):
    """Fetch complete author list from individual publication page"""
    try:
        time.sleep(0.5)  # Rate limiting - be nice to Google Scholar
        
        req = urllib.request.Request(
            citation_url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        )
        
        with urllib.request.urlopen(req, timeout=10) as response:
            page_html = response.read().decode('utf-8')  # Renamed to avoid shadowing html module
        
        # Look for the authors field in the citation details
        authors_match = re.search(r'<div class="gsc_oci_field">Authors?</div>.*?<div class="gsc_oci_value">(.*?)</div>', page_html, re.DOTALL)
        
        if authors_match:
            authors_str = re.sub(r'<[^>]+>', '', authors_match.group(1))
            authors = [normalize_author_name(a) for a in authors_str.split(',') if a.strip()]
            return authors
        
        return None
        
    except Exception as e:
        print(f'  Warning: Could not fetch detailed authors: {e}')
        return None


def parse_publications_regex(html_content):
    """Parse publications using regex - more robust for Google Scholar's dynamic content"""
    publications = []
    
    # Find all publication rows - they're in <tr class="gsc_a_tr">
    rows = re.findall(r'<tr class="gsc_a_tr.*?</tr>', html_content, re.DOTALL)
    
    for row in rows:
        try:
            # Extract title and URL - links use href attribute not data-href
            title_match = re.search(r'<a[^>]*href="([^"]*)"[^>]*class="gsc_a_at"[^>]*>(.*?)</a>', row, re.DOTALL)
            if not title_match:
                title_match = re.search(r'<a[^>]*class="gsc_a_at"[^>]*>(.*?)</a>', row, re.DOTALL)
                if not title_match:
                    continue
                citation_url = None
                title = title_match.group(1).strip()
            else:
                citation_path = html.unescape(title_match.group(1))  # Decode HTML entities like &amp;
                citation_url = f"{SCHOLAR_BASE}{citation_path}" if citation_path else None
                title = html.unescape(title_match.group(2).strip())  # Also decode title entities
            
            # Clean title
            title = re.sub(r'<[^>]+>', '', title)
            title = re.sub(r'\s+', ' ', title).strip()
            
            # Extract gray sections (authors and venue)
            gray_sections = re.findall(r'<div class="gs_gray">(.*?)</div>', row, re.DOTALL)
            
            authors_str = ''
            venue = 'Unknown Venue'
            
            if len(gray_sections) >= 1:
                authors_str = re.sub(r'<[^>]+>', '', gray_sections[0]).strip()
            if len(gray_sections) >= 2:
                venue = re.sub(r'<[^>]+>', '', gray_sections[1]).strip()
            
            # Parse authors from main page first
            authors_list = [a.strip() for a in authors_str.split(',') if a.strip()]
            has_more_authors = any('...' in a for a in authors_list)
            
            # Extract year
            year_match = re.search(r'<span class="gsc_a_h[^"]*"[^>]*>(\d{4})</span>', row)
            if not year_match:
                year_match = re.search(r'>(\d{4})<', row)
            
            if not year_match:
                continue
                
            year = int(year_match.group(1))
            
            # For recent publications (last 2 years), fetch detailed authors if truncated
            if has_more_authors and citation_url and year >= (CURRENT_YEAR - FETCH_DETAILED_YEARS):
                print(f'  Fetching detailed authors for: {title[:60]}...')
                detailed_authors = fetch_detailed_authors(citation_url)
                if detailed_authors:
                    authors = detailed_authors
                else:
                    # Keep original with et al.
                    authors = [normalize_author_name(a) if a != '...' else 'et al.' for a in authors_list]
            else:
                # Replace "..." with "et al." for older papers
                authors = [normalize_author_name(a) if a != '...' else 'et al.' for a in authors_list]
            
            # Infer type
            pub_type = infer_type(venue)
            
            publications.append({
                'title': title,
                'venue': venue,
                'authors': authors,
                'year': year,
                'url': citation_url,
                'type': pub_type
            })
            
        except Exception as e:
            print(f'  Warning: Could not parse publication row: {e}')
            continue
    
    return publications


def infer_type(venue):
    """Infer publication type from venue name"""
    if not venue:
        return 'other'
    
    venue_lower = venue.lower()
    
    if any(word in venue_lower for word in ['conference', 'proceedings', 'symposium', 'workshop']):
        return 'conference'
    elif any(word in venue_lower for word in ['journal', 'transactions', 'letters']):
        return 'journal'
    elif any(word in venue_lower for word in ['arxiv', 'preprint']):
        return 'preprint'
    
    return 'other'


def fetch_publications():
    """Fetch publications from Google Scholar"""
    try:
        print('Fetching publications from Google Scholar...')
        
        # Create request with headers
        req = urllib.request.Request(
            SCHOLAR_URL,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        )
        
        # Fetch the page
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
        
        # Parse using regex
        publications = parse_publications_regex(html)
        print(f'Found {len(publications)} publications')
        
        # Validate that we got a reasonable number of publications
        if len(publications) < 10:
            raise ValueError(f'Only found {len(publications)} publications - this seems too low, aborting update')
        
        # Sort by year (most recent first)
        publications.sort(key=lambda x: x['year'], reverse=True)
        
        # Create JSON structure
        data = {
            'publicationList': publications,
            'lastUpdated': datetime.now().isoformat()
        }
        
        # Write to temporary file first
        temp_file = OUTPUT_FILE.with_suffix('.json.tmp')
        OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(temp_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        # Validate the temporary file can be read as valid JSON
        with open(temp_file, 'r', encoding='utf-8') as f:
            json.load(f)  # This will raise if JSON is invalid
        
        # Only replace the original file if everything succeeded
        temp_file.replace(OUTPUT_FILE)
        
        print(f'✓ Successfully updated {OUTPUT_FILE}')
        print(f'  Total publications: {len(publications)}')
        
        return publications
        
    except urllib.error.URLError as e:
        print(f'✗ Network error: {e.reason}')
        raise
    except Exception as e:
        print(f'✗ Error: {e}')
        raise


if __name__ == '__main__':
    try:
        fetch_publications()
        print('✓ Publication update complete!')
    except Exception as e:
        print(f'✗ Publication update failed: {e}')
        exit(1)

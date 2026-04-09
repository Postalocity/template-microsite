from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # Desktop viewport
    page.set_viewport_size({"width": 1440, "height": 900})
    page.goto('http://localhost:8888')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='/tmp/postalocity-credit-repair-desktop.png', full_page=True)
    print("Desktop screenshot captured")
    
    # Mobile viewport
    page.set_viewport_size({"width": 375, "height": 812})
    page.goto('http://localhost:8888')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='/tmp/postalocity-credit-repair-mobile.png', full_page=True)
    print("Mobile screenshot captured")
    
    # Get page content for analysis
    title = page.title()
    print(f"Page title: {title}")
    
    browser.close()
    print("All screenshots captured successfully")
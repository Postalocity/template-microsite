from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:8888')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='/tmp/postalocity-credit-repair-desktop.png', full_page=True)
    page.set_viewport_size({"width": 375, "height": 812})
    page.goto('http://localhost:8888')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='/tmp/postalocity-credit-repair-mobile.png', full_page=True)
    browser.close()
    print("Screenshots captured successfully")
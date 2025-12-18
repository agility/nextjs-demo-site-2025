#!/usr/bin/env tsx
/**
 * Automated Screenshot Capture for Agility CMS Training Guides
 *
 * This script navigates to Agility CMS URLs and captures screenshots
 * for the training documentation.
 *
 * Usage:
 *   npm run capture-screenshots -- --priority 1
 *   npm run capture-screenshots -- --id content-item-edit
 *   npm run capture-screenshots -- --all
 */

import { chromium, type Browser, type Page } from 'playwright'
import { readFileSync } from 'fs'
import { join } from 'path'

interface ScreenshotConfig {
  id: string
  priority: number
  filename: string
  description: string
  url: string
  actions: Array<{
    type: 'wait' | 'click' | 'waitFor' | 'type'
    time?: number
    selector?: string
    text?: string
  }>
  notes?: string
}

interface Config {
  instance: {
    guid: string
    locale: string
    baseUrl: string
  }
  screenshots: ScreenshotConfig[]
}

const SCREENSHOT_DIR = join(process.cwd(), 'docs/training-guide/assets/screenshots/agility-cms')
const CONFIG_PATH = join(process.cwd(), 'scripts/screenshot-config.json')

// Parse command line arguments
const args = process.argv.slice(2)
const priorityArg = args.find(arg => arg.startsWith('--priority'))
const idArg = args.find(arg => arg.startsWith('--id'))
const allArg = args.includes('--all')

const priority = priorityArg ? parseInt(priorityArg.split('=')[1]) : null
const screenshotId = idArg ? idArg.split('=')[1] : null

async function main() {
  console.log('📸 Agility CMS Screenshot Capture Tool\n')

  // Load configuration
  const config: Config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
  const { instance, screenshots } = config

  // Filter screenshots based on arguments
  let screenshotsToCapture = screenshots

  if (screenshotId) {
    screenshotsToCapture = screenshots.filter(s => s.id === screenshotId)
    if (screenshotsToCapture.length === 0) {
      console.error(`❌ Screenshot with ID "${screenshotId}" not found`)
      process.exit(1)
    }
  } else if (priority !== null) {
    screenshotsToCapture = screenshots.filter(s => s.priority === priority)
    console.log(`📋 Capturing Priority ${priority} screenshots (${screenshotsToCapture.length} total)\n`)
  } else if (!allArg) {
    // Default to priority 1
    screenshotsToCapture = screenshots.filter(s => s.priority === 1)
    console.log(`📋 Capturing Priority 1 screenshots (${screenshotsToCapture.length} total)\n`)
  } else {
    console.log(`📋 Capturing ALL screenshots (${screenshotsToCapture.length} total)\n`)
  }

  // Launch browser
  console.log('🚀 Launching browser...')
  const browser = await chromium.launch({
    headless: false, // Set to true for automated runs
    slowMo: 500, // Slow down actions for visibility
  })

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  })

  const page = await context.newPage()

  // Navigate to base URL first (for authentication)
  console.log(`\n🔐 Navigating to Agility CMS for authentication...`)
  console.log(`   Base URL: ${instance.baseUrl}`)
  console.log(`   ⏳ You have 30 seconds to log in...\n`)

  await page.goto(instance.baseUrl)
  await page.waitForTimeout(30000) // 30 second window for manual login

  console.log('✅ Authentication window closed. Starting screenshot capture...\n')

  // Capture each screenshot
  for (const screenshot of screenshotsToCapture) {
    await captureScreenshot(page, screenshot, instance.baseUrl)
  }

  await browser.close()
  console.log('\n✅ All screenshots captured!')
  console.log(`📁 Saved to: ${SCREENSHOT_DIR}\n`)
}

async function captureScreenshot(
  page: Page,
  config: ScreenshotConfig,
  baseUrl: string
) {
  const fullUrl = `${baseUrl}${config.url}`
  const filepath = join(SCREENSHOT_DIR, config.filename)

  console.log(`📸 ${config.id}`)
  console.log(`   Description: ${config.description}`)
  console.log(`   URL: ${fullUrl}`)

  try {
    // Navigate to URL
    await page.goto(fullUrl, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000) // Initial load wait

    // Execute actions
    for (const action of config.actions) {
      switch (action.type) {
        case 'wait':
          await page.waitForTimeout((action.time || 1) * 1000)
          break

        case 'waitFor':
          if (action.selector) {
            try {
              await page.waitForSelector(action.selector, { timeout: 10000 })
            } catch (e) {
              console.log(`   ⚠️  Selector "${action.selector}" not found, continuing...`)
            }
          }
          break

        case 'click':
          if (action.selector) {
            try {
              await page.click(action.selector, { timeout: 5000 })
              await page.waitForTimeout(1000)
            } catch (e) {
              console.log(`   ⚠️  Could not click "${action.selector}", trying alternative...`)
              // Try to find button by text
              const buttons = await page.$$('button, a, [role="button"]')
              for (const btn of buttons) {
                const text = await btn.textContent()
                if (text && action.selector.includes(text)) {
                  await btn.click()
                  await page.waitForTimeout(1000)
                  break
                }
              }
            }
          }
          break

        case 'type':
          if (action.selector && action.text) {
            await page.fill(action.selector, action.text)
            await page.waitForTimeout(500)
          }
          break
      }
    }

    // Additional wait for any animations
    await page.waitForTimeout(1000)

    // Take screenshot
    await page.screenshot({
      path: filepath,
      fullPage: true,
      animations: 'disabled'
    })

    console.log(`   ✅ Saved: ${config.filename}\n`)

  } catch (error) {
    console.error(`   ❌ Error capturing ${config.id}:`, error)
    console.log(`   📝 Notes: ${config.notes || 'None'}\n`)
  }
}

// Run the script
main().catch(console.error)


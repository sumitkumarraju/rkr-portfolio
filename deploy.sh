#!/bin/bash
# ═══════════════════════════════════════════
# RKR Portfolio — GitHub + Vercel Deployment
# ═══════════════════════════════════════════
# Run this script from: /Users/skr/ANTIGRAVITY/portfolio/

set -e

echo "🚀 Step 1: Create GitHub Repository"
echo "────────────────────────────────────"
gh repo create rkr-portfolio --public --source=. --remote=origin --push

echo ""
echo "✅ GitHub repo created and pushed!"
echo ""

echo "🌐 Step 2: Deploy to Vercel"
echo "────────────────────────────────────"
vercel --prod --yes

echo ""
echo "═══════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETE!"
echo "═══════════════════════════════════"

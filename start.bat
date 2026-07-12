@echo off
cd /d "C:\Users\olezu\Downloads\the not fucked folder\Infinite\sovereign"
start "Story Watcher" python "public\story-reader\watch_stories.py"
start "" http://localhost:5173
npm run dev

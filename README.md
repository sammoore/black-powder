# Black Powder Works

## Splash Video Conversion

Video conversion from the splash asset provided to the supported `<video>` formats was performed via `ffmpeg`.

To convert to the `*.webm` format, use:

```ffmpeg -i splash.mpeg -an -acodec libvorbis -aq 5 -qmax 25 -threads 4 splash.webm```

To convert to the `*.mp4` format, use:

```ffmpeg -i splash.mpeg -an -vcodec libx264 -crf 28 -threads 4 splash.mp4```

